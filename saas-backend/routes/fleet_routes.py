# from fastapi import APIRouter, UploadFile, File, HTTPException
# import requests
# import urllib3

# router = APIRouter()

# ERP_BASE_URL = "https://admin.mdm-wassal.shop"
# ERP_API_KEY = "6de84885d8b9c82"
# ERP_API_SECRET = "87b5b42f077d6c4"

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# @router.post("/upload-and-import-vehicle")
# async def upload_and_import_vehicle(file: UploadFile = File(...)):
#     try:
#         # Step 1: Upload file to ERPNext
#         file_content = await file.read()
#         files = {
#             "file": (file.filename, file_content, file.content_type)
#         }

#         headers = {
#             "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
#         }

#         upload_response = requests.post(
#             f"{ERP_BASE_URL}/api/method/upload_file",
#             headers=headers,
#             files=files,
#             verify=False
#         )

#         if upload_response.status_code != 200:
#             raise HTTPException(status_code=upload_response.status_code, detail=f"Upload Failed: {upload_response.text}")

#         upload_data = upload_response.json().get("message", {})
#         file_url = upload_data.get("file_url")

#         if not file_url:
#             raise HTTPException(status_code=500, detail="file_url not found in upload response")

#         # Step 2: Import vehicle data using uploaded file
#         import_payload = {
#             "file_url": file_url
#         }

#         import_response = requests.post(
#             f"{ERP_BASE_URL}/api/method/fleet_management.api.vehicle_import.import_vehicle_data",
#             headers=headers,
#             json=import_payload,
#             verify=False
#         )

#         if import_response.status_code != 200:
#             raise HTTPException(status_code=import_response.status_code, detail=f"Import Failed: {import_response.text}")

#         return {
#             "message": "✅ Vehicle file uploaded and imported successfully",
#             "file_url": file_url,
#             "import_response": import_response.json()
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"❌ Error: {str(e)}")


from fastapi import APIRouter, UploadFile, File, HTTPException, Body
import requests
import urllib3

router = APIRouter()

ERP_BASE_URL = "https://admin.mdm-wassal.shop"
ERP_API_KEY = "2539d59d764379a"
ERP_API_SECRET = "4d7c86a115d4e1b" 
# "e81565ed52ccf1e"

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

@router.post("/upload-and-import-vehicle")
async def upload_and_import_vehicle(file: UploadFile = File(...)):
    try:
        # Step 1: Upload file to ERPNext
        file_content = await file.read()
        files = {
            "file": (file.filename, file_content, file.content_type)
        }

        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        upload_response = requests.post(
            f"{ERP_BASE_URL}/api/method/upload_file",
            headers=headers,
            files=files,
            verify=False
        )

        if upload_response.status_code != 200:
            raise HTTPException(status_code=upload_response.status_code, detail=f"Upload Failed: {upload_response.text}")

        upload_data = upload_response.json().get("message", {})
        file_url = upload_data.get("file_url")

        if not file_url:
            raise HTTPException(status_code=500, detail="file_url not found in upload response")

        # Step 2: Import vehicle data from uploaded file
        import_payload = {
            "file_url": file_url
        }

        import_response = requests.post(
            f"{ERP_BASE_URL}/api/method/fleet_management.api.vehicle_import.import_vehicle_data",
            headers=headers,
            json=import_payload,
            verify=False
        )

        if import_response.status_code != 200:
            raise HTTPException(status_code=import_response.status_code, detail=f"Import Failed: {import_response.text}")

        # Step 3: Transfer to core ERPNext Vehicle Doctype
        transfer_response = requests.post(
            f"{ERP_BASE_URL}/api/method/fleet_management.api.vehicle_import.transfer_to_vehicle",
            headers=headers,
            verify=False
        )

        if transfer_response.status_code != 200:
            raise HTTPException(status_code=transfer_response.status_code, detail=f"Transfer Failed: {transfer_response.text}")

        return {
            "message": "✅ Vehicle file uploaded, imported, and transferred successfully",
            "file_url": file_url,
            "import_response": import_response.json(),
            "transfer_response": transfer_response.json()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Error: {str(e)}")




arabic_to_english_map = {
    "ا": "A", "ب": "B", "ح": "J", "د": "D", "ر": "R",
    "س": "S", "ص": "X", "ط": "T", "ع": "E", "ق": "G",
    "ك": "K", "ل": "L", "م": "Z", "ن": "N", "هـ": "H",
    "و": "U", "ى": "V",
    "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4",
    "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
}

def normalize_arabic(text):
    return text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")


def transliterate_plate(arabic_text):
    normalized = normalize_arabic(arabic_text)
    translated = []
    for c in normalized:
        if c.strip() == "":
            translated.append(" ")
        else:
            translated.append(arabic_to_english_map.get(c, c))
    return ''.join(translated)


def get_employee_name(employee_id):
    try:
        emp_url = f"{ERP_BASE_URL}/api/resource/Employee/{employee_id}"
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }
        response = requests.get(emp_url, headers=headers, verify=False)
        if response.status_code == 200:
            return response.json().get("data", {}).get("employee_name", "")
    except:
        return ""
    return ""

@router.get("/vehicles")
def get_all_vehicles_with_translation():
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        limit = 20
        start = 0
        all_vehicles = []

        while True:
            url = (
                f'{ERP_BASE_URL}/api/resource/Vehicle'
                f'?fields=["license_plate","employee","license_expiry_date"]'
                f'&limit_start={start}&limit_page_length={limit}'
            )

            response = requests.get(url, headers=headers, verify=False)
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch vehicles")

            vehicles = response.json().get("data", [])
            if not vehicles:
                break

            all_vehicles.extend(vehicles)
            start += limit  # Move to next page

        result = []
        for v in all_vehicles:
            arabic_plate = v.get("license_plate", "")
            english_plate = transliterate_plate(arabic_plate)

            employee_id = v.get("employee")
            employee_name = get_employee_name(employee_id) if employee_id else None

            result.append({
                "license_plate_ar": arabic_plate,
                "license_plate_en": english_plate,
                "employee_id": employee_id,
                "employee_name": employee_name,
                "license_expiry_date": v.get("license_expiry_date")
            })

        return {"vehicles": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route 1 - Update employee on vehicle
@router.post("/update-vehicle-employee")
def update_vehicle_employee(license_plate: str, employee: str):
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }

        payload = {"employee": employee}
        update_url = f"{ERP_BASE_URL}/api/resource/Vehicle/{license_plate}"
        response = requests.put(update_url, json=payload, headers=headers, verify=False)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=f"Update failed: {response.text}")

        return {"message": "✅ Vehicle updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route 2 - Get employee list
@router.get("/employees")
def get_employees():
    try:
        headers = {
            "Authorization": f"token {ERP_API_KEY}:{ERP_API_SECRET}"
        }
        url = f"{ERP_BASE_URL}/api/resource/Employee?fields=[\"name\",\"employee_name\"]&limit_page_length=1000"
        response = requests.get(url, headers=headers, verify=False)

        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            raise HTTPException(status_code=500, detail="Failed to fetch employees")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
