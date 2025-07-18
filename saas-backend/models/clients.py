# models/clients.py

import sqlalchemy
from db import metadata
from models.tenants import tenants

clients = sqlalchemy.Table(
    "clients",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("email", sqlalchemy.String, unique=True, nullable=False),
    sqlalchemy.Column("password_hash", sqlalchemy.String, nullable=False),
    sqlalchemy.Column("full_name", sqlalchemy.String, nullable=True),
    sqlalchemy.Column("tenant_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("tenants.id"), nullable=True),
    sqlalchemy.Column("role", sqlalchemy.String, nullable=False, server_default="client"),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime, server_default=sqlalchemy.func.now()),
)
