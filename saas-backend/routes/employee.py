from fastapi import APIRouter, HTTPException
import requests
import urllib3

router = APIRouter()

ERP_BASE_URL = "https://admin.mdm-wassal.shop"
ERP_API_KEY = "2539d59d764379a"
ERP_API_SECRET = "ebe35921efebe5d"

# Disable insecure request warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

@router.get("/pool")
def get_all_employee_registrations():
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        list_url = f"{ERP_BASE_URL}/api/resource/Employee Registration?limit_page_length=1000"
        list_res = requests.get(list_url, headers=headers, verify=False)

        if list_res.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to fetch employee registrations list")

        ids = [doc["name"] for doc in list_res.json().get("data", [])]

        detailed_data = []
        for emp_id in ids:
            detail_url = f"{ERP_BASE_URL}/api/resource/Employee Registration/{emp_id}"
            detail_res = requests.get(detail_url, headers=headers, verify=False)

            if detail_res.status_code == 200:
                detailed_data.append(detail_res.json().get("data", {}))
            else:
                print(f"Failed to fetch details for: {emp_id}")

        return {"employees": detailed_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/pool/{iqama_number}")
async def get_employee_by_iqama(iqama_number: str):
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        # First, search for the employee
        search_url = f"{ERP_BASE_URL}/api/resource/Employee Registration"
        params = {"filters": f'[["iqama_number", "=", "{iqama_number}"]]'}
        
        search_res = requests.get(search_url, headers=headers, params=params, verify=False)
        
        if search_res.status_code != 200:
            raise HTTPException(status_code=search_res.status_code, detail="ERP search failed")

        data = search_res.json().get("data", [])
        if not data:
            raise HTTPException(status_code=404, detail="Employee not found")

        # Fetch full details
        detail_url = f"{ERP_BASE_URL}/api/resource/Employee Registration/{data[0]['name']}"
        detail_res = requests.get(detail_url, headers=headers, verify=False)
        
        if detail_res.status_code != 200:
            raise HTTPException(status_code=detail_res.status_code, detail="ERP detail fetch failed")

        return {
            "status": "success",
            "data": detail_res.json().get("data", {})
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/register/{docname}")
def register_employee(docname: str):
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        # Call Frappe method with docname
        res = requests.post(
            f"{ERP_BASE_URL}/api/method/hr_customization.api.register_employee.register_employee",
            headers=headers,
            json={"docname": docname},
            verify=False
        )

        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=res.text)

        return res.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
