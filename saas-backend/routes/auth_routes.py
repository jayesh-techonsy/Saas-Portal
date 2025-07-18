from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
import paramiko
from sqlalchemy import select, text
from models.clients import clients
from models.tenants import tenants
from utils.auth import hash_password, verify_password
from utils.jwt import create_access_token
from schemas.client import ClientCreate, ClientLogin, TokenResponse
from db import database
from utils.deps import get_current_client, require_admin, require_client
import threading
import asyncio
import concurrent.futures

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


from routes.site_routes import create_new_reserved_tenant
                                                                                       
hostname = "ec2-13-232-42-110.ap-south-1.compute.amazonaws.com"
username = "ubuntu"
key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
docker_container = "pwd-backend-1"

@router.post("/signup")
async def signup(payload: ClientCreate):
    # 1. Check if user already exists
    query = select(clients).where(clients.c.email == payload.email)
    existing = await database.fetch_one(query)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Fetch one unassigned tenant
    tenant_query = select(tenants).where(tenants.c.is_assigned == False).order_by(tenants.c.id).limit(1)
    tenant = await database.fetch_one(tenant_query)
    if not tenant:
        raise HTTPException(status_code=400, detail="No unassigned tenant available")

    tenant_id = tenant["id"]
    tenant_site = tenant["site_name"]

    # 3. Hash password
    hashed_pw = hash_password(payload.password)

    # 4. Insert client with assigned tenant_id
    insert_query = clients.insert().values(
        full_name=payload.full_name,
        email=payload.email,
        password_hash=hashed_pw,
        role="client",
        tenant_id=tenant_id
    )
    await database.execute(insert_query)

    # 5. Mark tenant as assigned
    update_query = tenants.update().where(tenants.c.id == tenant_id).values(is_assigned=True)
    await database.execute(update_query)

    # 6. Turn off maintenance mode
    try:
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)
        ssh.exec_command(f"docker exec {docker_container} bench --site {tenant_site} set-maintenance-mode off")
        ssh.close()
    except Exception as e:
        print("Error removing maintenance mode:", e)

    # 7. Create new reserved tenant in background
    latest = await database.fetch_one(text("SELECT site_name FROM tenants ORDER BY id DESC LIMIT 1"))
    latest_index = int(latest["site_name"].replace("tenant", "").split(".")[0])
    loop = asyncio.get_running_loop()
    executor = concurrent.futures.ThreadPoolExecutor()
    loop.run_in_executor(executor, create_new_reserved_tenant, latest_index)
    return {"message": "Signup successful and tenant assigned"}


@router.post("/login", response_model=TokenResponse)
async def login(payload: ClientLogin):
    client = await database.fetch_one(clients.select().where(clients.c.email == payload.email))
    if not client or not verify_password(payload.password, client["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Get tenant site name
    tenant = None
    if client["tenant_id"]:
        tenant = await database.fetch_one(tenants.select().where(tenants.c.id == client["tenant_id"]))

    token = create_access_token({"sub": client["email"], "role": client["role"]})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": client["role"],
        "tenant_site_name": tenant["site_name"] if tenant else None,
        "userName": client["full_name"],
        "userEmail": client["email"]

    }


@router.post("/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    # Optional: Blacklist or log the token
    print("Token to logout:", token)
    return {"message": "Logged out successfully"}