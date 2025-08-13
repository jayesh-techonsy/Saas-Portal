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
from routes import support_routes


from db import database, metadata
from models import users

from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI(title="Wassal SaaS Backend", version="1.0.0")

# Get port from environment variable (Render requirement)
PORT = int(os.getenv("PORT", 8000))

#  uvicorn main:app --reload --port 8000
# CORS Configuration for development and production
allowed_origins = [
    "http://localhost:5173",  # Local Vite frontend
    "http://localhost:3000",  # Alternative local frontend port
    "https://admin.mdm-wassal.shop",  # Your production domain
]

# Add Render frontend URL if available
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

# Add production frontend URL from environment
prod_frontend_url = os.getenv("VITE_API_BASE_URL")
if prod_frontend_url:
    # Extract domain from API URL for CORS
    if prod_frontend_url.startswith("https://"):
        domain = prod_frontend_url.replace("https://", "").split("/")[0]
        allowed_origins.append(f"https://{domain}")
    elif prod_frontend_url.startswith("http://"):
        domain = prod_frontend_url.replace("http://", "").split("/")[0]
        allowed_origins.append(f"http://{domain}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
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
app.include_router(support_routes.router, prefix="/api/support", tags=["Support"])


@app.on_event("startup")
async def startup():
    try:
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
        
        print(f"✅ Backend started successfully on port {PORT}")
        print(f"✅ Database connected successfully")
        
    except Exception as e:
        print(f"❌ Error during startup: {e}")
        raise e

@app.on_event("shutdown")
async def shutdown():
    try:
        await database.disconnect()
        print("✅ Database disconnected successfully")
    except Exception as e:
        print(f"❌ Error during shutdown: {e}")

@app.get("/")
def read_root():
    return {"message": "Wassal SaaS Backend Running", "status": "healthy"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
