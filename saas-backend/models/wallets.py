# models/wallets.py

import sqlalchemy
from db import metadata

wallets = sqlalchemy.Table(
    "wallets",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user", sqlalchemy.String, nullable=False, unique=True),
    sqlalchemy.Column("balance", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime, server_default=sqlalchemy.func.now(), onupdate=sqlalchemy.func.now())
)
