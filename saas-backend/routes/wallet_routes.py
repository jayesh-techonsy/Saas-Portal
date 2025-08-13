from fastapi import APIRouter, HTTPException, Body
import requests
import urllib3
from datetime import datetime, timedelta
import json

router = APIRouter()

ERP_BASE_URL = "https://admin.mdm-wassal.shop"
ERP_API_KEY = "6de84885d8b9c82"
ERP_API_SECRET = "87b5b42f077d6c4"

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ✅ Fixed path routes come first

@router.get("/plans")
def get_all_subscription_plans():
    try:
        url = f'{ERP_BASE_URL}/api/resource/All Subscription Plans?fields=["name","plan_name","duration_days","price","description", "apps"]'
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        response = requests.get(url, headers=headers, verify=False)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch plans list")

        plans = response.json().get("data", [])

        detailed_plans = []
        for plan in plans:
            detail_url = f"{ERP_BASE_URL}/api/resource/All Subscription Plans/{plan['name']}"
            detail_res = requests.get(detail_url, headers=headers, verify=False)

            if detail_res.status_code == 200:
                detailed_plans.append(detail_res.json().get("data", {}))

        return {"plans": detailed_plans}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# /api/wallet//{tenant_id}/subscription
@router.get("/{tenant_id}/subscription")
def get_subscription_by_tenant(tenant_id: str):
    try:
        url = f"{ERP_BASE_URL}/api/resource/My Subscription/{tenant_id}"
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        response = requests.get(url, headers=headers, verify=False)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch subscription data from ERP")

        data = response.json()
        if not data.get("data"):
            return {"message": "No subscription data found"}

        return {"data": data["data"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{tenant_id}/topup")
def top_up_wallet(tenant_id: str, payload: dict = Body(...)):
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        # Step 1: Fetch current wallet data
        get_url = f"{ERP_BASE_URL}/api/resource/Wallet/{tenant_id}"
        get_response = requests.get(get_url, headers=headers, verify=False)

        if get_response.status_code != 200:
            raise HTTPException(status_code=404, detail="Wallet not found")

        wallet_data = get_response.json().get("data")
        current_balance = float(wallet_data.get("balance") or 0)
        current_transactions = wallet_data.get("wallet_transactions", [])
        last_idx = max([t.get("idx", 0) for t in current_transactions], default=0)

        top_up_amount = float(payload.get("amount"))

        if top_up_amount <= 0:
            raise HTTPException(status_code=400, detail="Top-up amount must be greater than 0")

        new_balance = current_balance + top_up_amount

        # Step 2: Update wallet balance
        update_url = f"{ERP_BASE_URL}/api/resource/Wallet/{tenant_id}"
        update_payload = {
            "balance": new_balance
        }

        update_response = requests.put(update_url, json=update_payload, headers=headers, verify=False)

        if update_response.status_code != 200:
            raise HTTPException(status_code=update_response.status_code, detail="Failed to update wallet balance")

        # Step 3: Append Wallet Transaction with correct idx
        transaction_payload = {
            "doctype": "Wallet Transaction",
            "parent": tenant_id,
            "parenttype": "Wallet",
            "parentfield": "wallet_transactions",
            "idx": last_idx + 1,
            "amount": top_up_amount,
            "description": payload.get("description", "Top-Up"),
            "date": datetime.utcnow().isoformat()
        }

        transaction_url = f"{ERP_BASE_URL}/api/resource/Wallet Transaction"
        txn_response = requests.post(transaction_url, json=transaction_payload, headers=headers, verify=False)

        if txn_response.status_code != 200:
            raise HTTPException(status_code=txn_response.status_code, detail="Failed to record wallet transaction")

        return {
            "message": "Wallet top-up successful",
            "new_balance": new_balance,
            "transaction": transaction_payload
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ⚠️ Keep this last because it matches all other tenant_ids
@router.get("/{tenant_id}")
def get_wallet_by_tenant(tenant_id: str):
    try:
        url = f"{ERP_BASE_URL}/api/resource/Wallet/{tenant_id}"
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        response = requests.get(url, headers=headers, verify=False)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch wallet data from ERP")

        data = response.json()

        if not data.get("data"):
            return {"message": "No wallet data found"}

        return {"data": data["data"]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.post("/{tenant_id}/subscribe")
def subscribe_to_plan(tenant_id: str, payload: dict = Body(...)):
    try:
        plan_name = payload.get("plan_name")
        if not plan_name:
            raise HTTPException(status_code=400, detail="Plan name is required")

        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        # Step 1: Fetch new plan
        params = {
            "filters": json.dumps([["plan_name", "=", plan_name]]),
            "fields": json.dumps(["name", "plan_name", "duration_days", "price", "description", "apps"])
        }

        plan_response = requests.get(
            f"{ERP_BASE_URL}/api/resource/All Subscription Plans",
            headers=headers, params=params, verify=False
        )
        plan_data = plan_response.json().get("data", [])

        if not plan_data:
            # Try direct fetch by name
            plan_response = requests.get(
                f"{ERP_BASE_URL}/api/resource/All Subscription Plans/{plan_name}",
                headers=headers, verify=False
            )
            if plan_response.status_code != 200:
                raise HTTPException(status_code=404, detail="Subscription plan not found")
            plan_data = [plan_response.json().get("data")]

        plan = plan_data[0]
        price = float(plan["price"])
        duration = int(plan["duration_days"])

        # Step 2: Fetch wallet
        wallet_url = f"{ERP_BASE_URL}/api/resource/Wallet/{tenant_id}"
        wallet_response = requests.get(wallet_url, headers=headers, verify=False)
        if wallet_response.status_code != 200:
            raise HTTPException(status_code=404, detail="Wallet not found")

        wallet_data = wallet_response.json().get("data")
        current_balance = float(wallet_data.get("balance") or 0)

        # Step 3: Check current active subscription for upgrade logic
        payable_amount = price  # Default is full price
        existing_sub_url = f"{ERP_BASE_URL}/api/resource/My Subscription/{tenant_id}"
        existing_sub_response = requests.get(existing_sub_url, headers=headers, verify=False)

        if existing_sub_response.status_code == 200:
            sub_data = existing_sub_response.json().get("data", {})
            if sub_data.get("status") == "Active":
                current_plan_price = float(sub_data.get("price") or 0)
                end_date_str = sub_data.get("end_date")
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
                today = datetime.utcnow().date()
                days_remaining = max((end_date - today).days, 0)

                if sub_data.get("subscription_plan"):
                    old_plan_response = requests.get(
                        f"{ERP_BASE_URL}/api/resource/All Subscription Plans/{sub_data['subscription_plan']}",
                        headers=headers, verify=False
                    )
                    if old_plan_response.status_code == 200:
                        old_plan_data = old_plan_response.json().get("data", {})
                        old_duration = int(old_plan_data.get("duration_days", 1))
                        if old_duration > 0:
                            per_day_rate = current_plan_price / old_duration
                            
                            unused_value = per_day_rate * days_remaining
                            payable_amount = round(price - unused_value, 2)

        # Ensure not negative
        payable_amount = max(payable_amount, 0)

        if current_balance < payable_amount:
            raise HTTPException(status_code=400, detail="Insufficient wallet balance")

        # Step 4: Deduct wallet balance
        new_balance = current_balance - payable_amount
        update_balance = requests.put(wallet_url, json={"balance": new_balance}, headers=headers, verify=False)
        if update_balance.status_code != 200:
            raise HTTPException(status_code=update_balance.status_code, detail="Failed to deduct wallet balance")

        # Step 5: Add wallet transaction
        last_idx = max([t.get("idx", 0) for t in wallet_data.get("wallet_transactions", [])], default=0)
        txn_payload = {
            "doctype": "Wallet Transaction",
            "parent": tenant_id,
            "parenttype": "Wallet",
            "parentfield": "wallet_transactions",
            "idx": last_idx + 1,
            "amount": -payable_amount,
            "description": f"Subscribed to {plan['plan_name']} plan (adjusted)",
            "date": datetime.utcnow().isoformat()
        }
        txn_response = requests.post(f"{ERP_BASE_URL}/api/resource/Wallet Transaction", json=txn_payload, headers=headers, verify=False)
        if txn_response.status_code != 200:
            raise HTTPException(status_code=txn_response.status_code, detail="Failed to record wallet transaction")

        # Step 6: Create or Update My Subscription
        subscription_payload = {
            "doctype": "My Subscription",
            "name": tenant_id,
            "plan_name": plan["plan_name"],
            "subscription_plan": plan["name"],
            "description": plan.get("description", ""),
            "start_date": datetime.utcnow().date().isoformat(),
            "end_date": (datetime.utcnow().date() + timedelta(days=duration)).isoformat(),
            "price": price,
            "status": "Active",
            "user": tenant_id
        }

        if existing_sub_response.status_code == 200:
            update_sub = requests.put(
                f"{ERP_BASE_URL}/api/resource/My Subscription/{tenant_id}",
                json=subscription_payload, headers=headers, verify=False
            )
            if update_sub.status_code != 200:
                raise HTTPException(status_code=update_sub.status_code, detail="Failed to update subscription")
        else:
            create_sub = requests.post(
                f"{ERP_BASE_URL}/api/resource/My Subscription",
                json=subscription_payload, headers=headers, verify=False
            )
            if create_sub.status_code != 200:
                raise HTTPException(status_code=create_sub.status_code, detail="Failed to create subscription")

        # Step 7: Install Apps
        apps_field = plan.get("apps", "")
        app_list = [a.strip() for a in apps_field.split(",") if a.strip()]
        failed_apps = []

        for app_name in app_list:
            try:
                install_url = f"http://localhost:8000/api/app/{tenant_id}/install"
                install_response = requests.post(install_url, params={"app_name": app_name})
                if install_response.status_code != 200:
                    print(f"[WARN] Failed to install app '{app_name}' on {tenant_id}: {install_response.text}")
                    failed_apps.append(app_name)
            except Exception as install_error:
                print(f"[ERROR] Exception while installing app '{app_name}': {str(install_error)}")
                failed_apps.append(app_name)

        return {
            "message": f"Subscribed to {plan['plan_name']} successfully",
            "amount_deducted": payable_amount,
            "new_balance": new_balance,
            "subscription": subscription_payload,
            "apps_installed": [a for a in app_list if a not in failed_apps],
            "apps_failed": failed_apps
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
