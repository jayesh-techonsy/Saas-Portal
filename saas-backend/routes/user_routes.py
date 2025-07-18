from fastapi import APIRouter
from sqlalchemy import insert
from db import database
from models import users

router = APIRouter()

@router.post("/create_user")
async def create_user(name: str, email: str):
    # Inserting into the 'users' table
    query = insert(users).values(name=name, email=email)
    await database.execute(query)
    return {"message": "User created successfully"}
