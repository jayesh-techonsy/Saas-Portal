from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import site_routes
from routes import app_routes
from routes import user_routes
from routes import remote
from routes import wallet_routes
from routes import auth_routes
from routes import manage_subcription
from routes import fleet_routes
from routes import employee

from db import database, metadata
from models import users

from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

#  uvicorn main:app --reload --port 8000
# Update your CORS middleware in main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Your Vite frontend
        "http://localhost:8080",  # Your FastAPI backend (for Swagger)
        "https://admin.mdm-wassal.shop"  # Your production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # Important for debugging
)
# Routes
app.include_router(site_routes.router, prefix="/api/sites", tags=["Sites"])
app.include_router(app_routes.router, prefix="/api/apps", tags=["Apps"])
app.include_router(remote.router, prefix="/api/app", tags=["Remote"])
app.include_router(user_routes.router, prefix="/api/users", tags=["Users"])
app.include_router(wallet_routes.router, prefix="/api/wallets", tags=["Wallets"])
app.include_router(auth_routes.router, prefix="/auth", tags=["Auth"])
app.include_router(manage_subcription.router, prefix="/api/subscription", tags=["Subscription"])
app.include_router(fleet_routes.router, prefix="/api/fleet", tags=["Fleet"])
app.include_router(employee.router, prefix="/api/employee", tags=["Employee"])


@app.on_event("startup")
async def startup():
    # Connect to the async database
    await database.connect()

    # Sync SQLAlchemy engine to create tables
    engine = create_engine(
        f"postgresql://{os.getenv('SUPABASE_DB_USER')}:{os.getenv('SUPABASE_DB_PASSWORD')}@{os.getenv('SUPABASE_DB_HOST')}:{os.getenv('SUPABASE_DB_PORT')}/{os.getenv('SUPABASE_DB_NAME')}"
    )
    metadata.create_all(engine)

    # Check if users already exist to avoid duplicate entries
    existing_users = await database.fetch_all(users.select())
    if not existing_users:
        query = users.insert().values([
            {"name": "Jayesh", "email": "jayesh@example.com"},
            {"name": "Atharva", "email": "atharva@example.com"},
            {"name": "Lokesh", "email": "lokesh@example.com"},
        ])
        await database.execute(query)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
def read_root():
    return {"message": "Wassal SaaS Backend Running"}
