# # models/tenants.py

# import sqlalchemy
# from sqlalchemy.dialects.postgresql import ARRAY
# from db import metadata

# tenants = sqlalchemy.Table(
#     "tenants",
#     metadata,
#     sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
#     sqlalchemy.Column("site_name", sqlalchemy.String, unique=True, nullable=False),
# )


import sqlalchemy
from sqlalchemy.dialects.postgresql import ARRAY
from db import metadata

tenants = sqlalchemy.Table(
"tenants",
metadata,
sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
sqlalchemy.Column("site_name", sqlalchemy.String, unique=True, nullable=False),
sqlalchemy.Column("is_assigned", sqlalchemy.Boolean, nullable=False, server_default=sqlalchemy.sql.expression.false()),
)