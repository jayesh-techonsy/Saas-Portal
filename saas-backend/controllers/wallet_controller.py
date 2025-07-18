# # controllers/wallet_controller.py

# import os
# import requests
# from db import database
# from models.wallets import wallets
# from sqlalchemy import insert, update
# from sqlalchemy.dialects.postgresql import insert as pg_insert  # For upsert

# ERP_API_URL = os.getenv("ERP_WALLET_API")  # e.g., http://localhost:8080/api/resource/Wallet?fields=["user","balance"]
# ERP_API_TOKEN = os.getenv("ERP_API_TOKEN")

# headers = {
#     "Authorization": f"token {ERP_API_TOKEN}",
#     "Content-Type": "application/json"
# }

# async def fetch_wallets_from_erpnext_and_store():
#     response = requests.get(ERP_API_URL, headers=headers)
#     if response.status_code != 200:
#         raise Exception("Failed to fetch ERPNext wallet data")

#     wallet_data = response.json().get("data", [])

#     for entry in wallet_data:
#         query = pg_insert(wallets).values(
#             user=entry["user"],
#             balance=entry["balance"]
#         ).on_conflict_do_update(
#             index_elements=["user"],
#             set_={"balance": entry["balance"]}
#         )
#         await database.execute(query)
    
#     return {"status": "success", "message": f"{len(wallet_data)} wallet records synced"}
