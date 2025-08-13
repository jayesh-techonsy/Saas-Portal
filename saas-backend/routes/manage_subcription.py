# from fastapi import APIRouter, HTTPException, Body
# import subprocess
# import paramiko
# import requests
# import urllib3

# router = APIRouter()

# hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"
# username = "ubuntu"
# key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
# docker_container = "pwd-backend-1"

# ERP_BASE_URL = "https://admin.mdm-wassal.shop"
# ERP_API_KEY = "6de84885d8b9c82"
# ERP_API_SECRET = "87b5b42f077d6c4"

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


# @router.get("/apps")
# def get_all_apps():
#     list_all_apps_cmd = f"docker exec -i {docker_container} cat /home/frappe/frappe-bench/sites/apps.txt"

#     try:
#         key = paramiko.RSAKey.from_private_key_file(key_path)
#         ssh = paramiko.SSHClient()
#         ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#         ssh.connect(hostname, username=username, pkey=key)

#         stdin_all, stdout_all, stderr_all = ssh.exec_command(list_all_apps_cmd)
#         all_apps = stdout_all.read().decode().splitlines()
#         all_apps = [a.strip() for a in all_apps if a.strip()]
#         ssh.close()

#         return {"apps": all_apps}
#     except Exception as e:
#         return {"error": str(e)}


# @router.put("/plans/{plan_id}")
# def update_subscription_plan(plan_id: str, payload: dict = Body(...)):
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
#         }

#         update_url = f"{ERP_BASE_URL}/api/resource/All Subscription Plans/{plan_id}"
#         update_response = requests.put(update_url, json=payload, headers=headers, verify=False)

#         if update_response.status_code != 200:
#             raise HTTPException(status_code=update_response.status_code, detail="Failed to update plan")

#         return {
#             "message": "Plan updated successfully",
#             "data": update_response.json().get("data")
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

from fastapi import APIRouter, HTTPException, Body
import subprocess
import paramiko
import requests
import urllib3
from settings import settings

router = APIRouter()

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

@router.get("/apps")
def get_all_apps():
    list_all_apps_cmd = f"docker exec -i {settings.DOCKER_CONTAINER_NAME} cat /home/frappe/frappe-bench/sites/apps.txt"

    try:
        key = paramiko.RSAKey.from_private_key_file(settings.SSH_KEY_PATH)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(settings.SSH_HOSTNAME, username=settings.SSH_USERNAME, pkey=key)

        stdin_all, stdout_all, stderr_all = ssh.exec_command(list_all_apps_cmd)
        all_apps = stdout_all.read().decode().splitlines()
        all_apps = [a.strip() for a in all_apps if a.strip()]
        ssh.close()

        return {"apps": all_apps}
    except Exception as e:
        return {"error": str(e)}


@router.put("/plans/{plan_id}")
def update_subscription_plan(plan_id: str, payload: dict = Body(...)):
    try:
        token_parts = settings.ERP_API_TOKEN.split(":")
        if len(token_parts) != 2:
            raise HTTPException(status_code=500, detail="Invalid ERP_API_TOKEN format")
        api_key, api_secret = token_parts

        headers = {
            "Authorization": f"token {api_key}:{api_secret}"
        }

        update_url = f"{settings.ERP_BASE_URL}/api/resource/All Subscription Plans/{plan_id}"
        update_response = requests.put(update_url, json=payload, headers=headers, verify=False)

        if update_response.status_code != 200:
            raise HTTPException(status_code=update_response.status_code, detail="Failed to update plan")

        return {
            "message": "Plan updated successfully",
            "data": update_response.json().get("data")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
