# schemas/client.py

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ClientCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str  # This will be hashed before saving

class ClientLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    tenant_id: Optional[int] = None
    tenant_site_name: Optional[str]
    userName: str
    userEmail: str


class ClientOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    tenant_id: Optional[int]
    created_at: datetime

    class Config:
        orm_mode = True
