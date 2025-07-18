import paramiko
import time

from fastapi import APIRouter, HTTPException
from controllers import site_controller
from models.site_model import DropSiteRequest
from models.tenants import tenants

from db import database
from sqlalchemy import text

import threading
import os
import asyncio

router = APIRouter()

@router.get("/")
def list_sites():
    return site_controller.get_sites()

@router.post("/drop-site")
def drop_site_route(data: DropSiteRequest):
    return site_controller.drop_site(data.site)

@router.post("/site-apps")
def site_apps_route(data: DropSiteRequest):
    return site_controller.get_site_apps({"site": data.site})

# SSH config
hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"
username = "ubuntu"
key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
docker_container = "pwd-backend-1"

from databases import Database

def create_new_reserved_tenant(latest_index: int):
    import os
    import asyncio
    from databases import Database
    from sqlalchemy.sql import text

    print(f"Background: Creating tenant tenant{latest_index + 1}")

    new_site = f"tenant{latest_index + 1}.mdm-wassal.shop"

    try:
        print("Connecting via SSH...")
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        print("Running bench commands...")
        commands = [
            f"docker exec {docker_container} bench new-site {new_site} --mariadb-root-password admin --admin-password admin --install-app erpnext",
            f"docker exec {docker_container} bench --site {new_site} set-maintenance-mode on"
        ]

        for cmd in commands:
            print(f"Executing: {cmd}")
            stdin, stdout, stderr = ssh.exec_command(cmd)
            stdout.channel.recv_exit_status()
            out = stdout.read().decode()
            err = stderr.read().decode()
            print("Output:", out)
            print("Error:", err)

        ssh.close()

        print("Connecting to DB to insert new tenant...")
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        db_url = (
            f"postgresql://{os.getenv('SUPABASE_DB_USER')}:" +
            f"{os.getenv('SUPABASE_DB_PASSWORD')}@" +
            f"{os.getenv('SUPABASE_DB_HOST')}:" +
            f"{os.getenv('SUPABASE_DB_PORT')}/" +
            f"{os.getenv('SUPABASE_DB_NAME')}"
        )

        db = Database(db_url)

        async def insert_tenant():
            await db.connect()
            query = text("INSERT INTO tenants (site_name, is_assigned) VALUES (:site_name, FALSE)").bindparams(site_name=new_site)
            await db.execute(query)
            await db.disconnect()

        loop.run_until_complete(insert_tenant())
        loop.close()

        print(f"Tenant {new_site} created and registered in DB ✅")

    except Exception as e:
        print("❌ Background tenant creation failed:", str(e))


@router.post("/create-tenant")
async def create_tenant():
    try:
        # Get first unassigned tenant
        result = await database.fetch_one(text("SELECT id, site_name FROM tenants WHERE is_assigned = FALSE ORDER BY id LIMIT 1"))
        if not result:
            raise HTTPException(status_code=400, detail="No unassigned tenants available")

        tenant_id = result["id"]
        tenant_site = result["site_name"]

        # Turn off maintenance mode
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        ssh.exec_command(f"docker exec {docker_container} bench --site {tenant_site} set-maintenance-mode off")
        ssh.close()

        # Mark as assigned
        update_query = text("UPDATE tenants SET is_assigned = TRUE WHERE id = :id").bindparams(id=tenant_id)
        await database.execute(update_query)

        # Get latest site index for background tenant creation
        latest = await database.fetch_one(text("SELECT site_name FROM tenants ORDER BY id DESC LIMIT 1"))
        latest_index = int(latest["site_name"].replace("tenant", "").split(".")[0])

        threading.Thread(target=create_new_reserved_tenant, args=(latest_index,)).start()

        return {
            "message": f"{tenant_site} assigned and activated",
            "tenantURL": f"https://{tenant_site}",
            "tenantName": tenant_site.split(".")[0]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))