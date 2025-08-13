# from fastapi import APIRouter, HTTPException, Body
# import requests
# import urllib3
# import json
# from pydantic import BaseModel
# from datetime import datetime
# from settings import settings

# router = APIRouter()

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ERP_BASE_URL = settings.ERP_BASE_URL
# ERP_API_TOKEN = settings.ERP_API_TOKEN



# @router.get("/get-issues")
# def get_all_issues():
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         # Define the fields we want to fetch
#         fields = ["name", "subject", "raised_by", "status", "priority", "opening_date", "custom_employee_name"]
        
#         # Properly format the fields parameter as a JSON string
#         fields_param = json.dumps(fields)
        
#         # Build the URL with properly encoded parameters
#         list_url = f"{ERP_BASE_URL}/api/resource/Issue?fields={fields_param}&limit_page_length=0"
        
#         response = requests.get(list_url, headers=headers, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issues: {response.text}"
#             )

#         issues_data = response.json().get("data", [])
        
#         return {
#             "data": issues_data,
#             "count": len(issues_data)
#         }

#     except Exception as e:
#         raise HTTPException(
#             status_code=500, 
#             detail=f"Error processing request: {str(e)}"
#         )
    

# @router.get("/get-issue/{issue_id}")
# def get_single_issue(issue_id: str):
#     """Get detailed information about a specific support issue"""
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         # Fetch the specific issue details
#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.get(url, headers=headers, verify=False)

#         if response.status_code == 404:
#             raise HTTPException(
#                 status_code=404,
#                 detail=f"Issue {issue_id} not found"
#             )
        
#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issue: {response.text}"
#             )

#         issue_data = response.json().get("data")
#         if not issue_data:
#             raise HTTPException(
#                 status_code=404,
#                 detail=f"No data found for issue {issue_id}"
#             )

#         return {
#             "data": {
#                 "name": issue_data.get("name"),
#                 "subject": issue_data.get("subject"),
#                 "raised_by": issue_data.get("raised_by"),
#                 "status": issue_data.get("status"),
#                 "priority": issue_data.get("priority"),
#                 "issue_type": issue_data.get("issue_type"),
#                 "description": issue_data.get("description"),
#                 "agreement_status": issue_data.get("agreement_status"),
#                 "opening_date": issue_data.get("opening_date"),
#                 "opening_time": issue_data.get("opening_time"),
#                 "creation": issue_data.get("creation"),
#                 "modified": issue_data.get("modified"),
#                 "company": issue_data.get("company"),
#                 "docstatus": issue_data.get("docstatus")
#             }
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(
#             status_code=502,
#             detail=f"Connection error: {str(e)}"
#         )
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error: {str(e)}"
#         )
    

# class UpdateIssuePayload(BaseModel):
#     status: str
#     resolution_details: str

# @router.post("/update-issue/{issue_id}")
# def update_issue(issue_id: str, payload: UpdateIssuePayload = Body(...)):
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}",
#             "Content-Type": "application/json"
#         }

#         # Format current datetime for 'first_responded_on'
#         now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#         update_payload = {
#             "status": payload.status,
#             "resolution_details": payload.resolution_details,
#             "first_responded_on": now_str
#         }

#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.put(url, headers=headers, json=update_payload, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to update issue: {response.text}"
#             )

#         return {
#             "message": f"Issue {issue_id} updated successfully.",
#             "updated_fields": update_payload
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(
#             status_code=502,
#             detail=f"Connection error: {str(e)}"
#         )
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Internal server error: {str(e)}"
#         )
    

# import base64
# from io import BytesIO
# from PIL import Image

# class Base64ImagePayload(BaseModel):
#     image_base64: str  # base64-encoded string of the image

# from fastapi.responses import StreamingResponse

# @router.post("/decode-base64-image")
# def decode_base64_image(payload: Base64ImagePayload):
#     try:
#         # Remove prefix like "data:image/png;base64,"
#         if "," in payload.image_base64:
#             _, encoded = payload.image_base64.split(",", 1)
#         else:
#             encoded = payload.image_base64

#         # Decode base64
#         image_data = base64.b64decode(encoded)

#         # Open image
#         image = Image.open(BytesIO(image_data))

#         # Convert image to stream (BytesIO)
#         img_byte_arr = BytesIO()
#         image.save(img_byte_arr, format=image.format or "PNG")
#         img_byte_arr.seek(0)

#         return StreamingResponse(
#             img_byte_arr,
#             media_type=f"image/{image.format.lower() if image.format else 'png'}"
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Failed to decode and return image: {str(e)}"
#         )


# from fastapi import APIRouter, HTTPException, Body
# import requests
# import urllib3
# import json
# from pydantic import BaseModel
# from datetime import datetime
# from settings import settings
# import base64
# from io import BytesIO
# from PIL import Image
# from fastapi.responses import StreamingResponse

# router = APIRouter()

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ERP_BASE_URL = settings.ERP_BASE_URL
# ERP_API_TOKEN = settings.ERP_API_TOKEN


# @router.get("/get-issues")
# def get_all_issues():
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         fields = ["name", "subject", "raised_by", "status", "priority", "opening_date", "custom_employee_name"]
#         fields_param = json.dumps(fields)
#         list_url = f"{ERP_BASE_URL}/api/resource/Issue?fields={fields_param}&limit_page_length=0"

#         response = requests.get(list_url, headers=headers, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issues: {response.text}"
#             )

#         issues_data = response.json().get("data", [])

#         return {
#             "data": issues_data,
#             "count": len(issues_data)
#         }

#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error processing request: {str(e)}"
#         )


# import base64
# from fastapi.responses import FileResponse
# import uuid
# import os

# class ImageDecodeRequest(BaseModel):
#     description: str

# @router.post("/decode-image")
# def decode_base64_image(payload: ImageDecodeRequest):
#     try:
#         description = payload.description

#         # Extract base64 string using string slicing
#         if "data:" not in description or "[IMAGE_1_END]" not in description:
#             raise HTTPException(status_code=400, detail="No valid base64 image found.")

#         base64_part = description.split("data:")[1].split("[IMAGE_1_END]")[0].strip()

#         # Clean up possible newlines or whitespaces
#         base64_part = base64_part.replace("\n", "").replace("\r", "").strip()

#         # Decode base64
#         image_data = base64.b64decode(base64_part)

#         # Save to temp file
#         filename = f"decoded_{uuid.uuid4().hex}.png"
#         filepath = os.path.join("/tmp", filename) if os.name != "nt" else os.path.join("C:\\Windows\\Temp", filename)

#         with open(filepath, "wb") as f:
#             f.write(image_data)

#         return FileResponse(filepath, media_type="image/png", filename=filename)

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to decode image: {str(e)}")


# @router.get("/get-issue/{issue_id}")
# def get_single_issue(issue_id: str):
#     """Get detailed information about a specific support issue, including image if embedded."""
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.get(url, headers=headers, verify=False)

#         if response.status_code == 404:
#             raise HTTPException(status_code=404, detail=f"Issue {issue_id} not found")

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issue: {response.text}"
#             )

#         issue_data = response.json().get("data")
#         if not issue_data:
#             raise HTTPException(status_code=404, detail=f"No data found for issue {issue_id}")

#         description = issue_data.get("description", "")
#         image_base64 = None

#         # Check and extract base64 from description
#         if "[IMAGE_1_START]" in description and "[IMAGE_1_END]" in description:
#             try:
#                 start = description.index("[IMAGE_1_START]") + len("[IMAGE_1_START]\n")
#                 end = description.index("\n[IMAGE_1_END]")
#                 image_block = description[start:end]

#                 lines = image_block.strip().split("\n")
#                 for line in lines:
#                     if line.startswith("filename:"):
#                         continue
#                     elif line.startswith("data:"):
#                         base64_line = line.split("data:")[1].strip()
#                         image_base64 = base64_line
#                         break
#                     else:
#                         image_base64 = line.strip()

#             except Exception as e:
#                 raise HTTPException(
#                     status_code=500,
#                     detail=f"Failed to decode image from description: {str(e)}"
#                 )

#         # Return issue data with base64 image if available
#         return {
#             "data": {
#                 "name": issue_data.get("name"),
#                 "subject": issue_data.get("subject"),
#                 "raised_by": issue_data.get("raised_by"),
#                 "status": issue_data.get("status"),
#                 "priority": issue_data.get("priority"),
#                 "issue_type": issue_data.get("issue_type"),
#                 "description": description,
#                 "agreement_status": issue_data.get("agreement_status"),
#                 "opening_date": issue_data.get("opening_date"),
#                 "opening_time": issue_data.get("opening_time"),
#                 "creation": issue_data.get("creation"),
#                 "modified": issue_data.get("modified"),
#                 "company": issue_data.get("company"),
#                 "docstatus": issue_data.get("docstatus"),
#                 "image_base64": image_base64  # Optional: None if not present
#             }
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# class UpdateIssuePayload(BaseModel):
#     status: str
#     resolution_details: str


# @router.post("/update-issue/{issue_id}")
# def update_issue(issue_id: str, payload: UpdateIssuePayload = Body(...)):
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}",
#             "Content-Type": "application/json"
#         }

#         now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#         update_payload = {
#             "status": payload.status,
#             "resolution_details": payload.resolution_details,
#             "first_responded_on": now_str
#         }

#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.put(url, headers=headers, json=update_payload, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to update issue: {response.text}"
#             )

#         return {
#             "message": f"Issue {issue_id} updated successfully.",
#             "updated_fields": update_payload
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# class Base64ImagePayload(BaseModel):
#     image_base64: str


# @router.post("/decode-base64-image")
# def decode_base64_image(payload: Base64ImagePayload):
#     try:
#         if "," in payload.image_base64:
#             _, encoded = payload.image_base64.split(",", 1)
#         else:
#             encoded = payload.image_base64

#         image_data = base64.b64decode(encoded)
#         image = Image.open(BytesIO(image_data))

#         img_byte_arr = BytesIO()
#         image.save(img_byte_arr, format=image.format or "PNG")
#         img_byte_arr.seek(0)

#         return StreamingResponse(
#             img_byte_arr,
#             media_type=f"image/{image.format.lower() if image.format else 'png'}"
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Failed to decode and return image: {str(e)}"
#         )


# from fastapi import APIRouter, HTTPException, Body
# import requests
# import urllib3
# import json
# from pydantic import BaseModel
# from datetime import datetime
# from settings import settings
# import base64
# from io import BytesIO
# from PIL import Image
# from fastapi.responses import StreamingResponse, FileResponse
# import uuid
# import os

# router = APIRouter()

# urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ERP_BASE_URL = settings.ERP_BASE_URL
# ERP_API_TOKEN = settings.ERP_API_TOKEN


# @router.get("/get-issues")
# def get_all_issues():
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         fields = ["name", "subject", "raised_by", "status", "priority", "opening_date", "custom_employee_name"]
#         fields_param = json.dumps(fields)
#         list_url = f"{ERP_BASE_URL}/api/resource/Issue?fields={fields_param}&limit_page_length=0"

#         response = requests.get(list_url, headers=headers, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issues: {response.text}"
#             )

#         issues_data = response.json().get("data", [])

#         return {
#             "data": issues_data,
#             "count": len(issues_data)
#         }

#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error processing request: {str(e)}"
#         )


# class ImageDecodeRequest(BaseModel):
#     description: str

# @router.post("/decode-image")
# def decode_base64_image(payload: ImageDecodeRequest):
#     try:
#         description = payload.description

#         # Extract base64 string using string slicing
#         if "data:" not in description or "[IMAGE_1_END]" not in description:
#             raise HTTPException(status_code=400, detail="No valid base64 image found.")

#         base64_part = description.split("data:")[1].split("[IMAGE_1_END]")[0].strip()
#         base64_part = base64_part.replace("\n", "").replace("\r", "").strip()

#         image_data = base64.b64decode(base64_part)

#         filename = f"decoded_{uuid.uuid4().hex}.png"
#         filepath = os.path.join("/tmp", filename) if os.name != "nt" else os.path.join("C:\\Windows\\Temp", filename)

#         with open(filepath, "wb") as f:
#             f.write(image_data)

#         return FileResponse(filepath, media_type="image/png", filename=filename)

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Failed to decode image: {str(e)}")


# @router.get("/get-issue/{issue_id}")
# def get_single_issue(issue_id: str):
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}"
#         }

#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.get(url, headers=headers, verify=False)

#         if response.status_code == 404:
#             raise HTTPException(status_code=404, detail=f"Issue {issue_id} not found")

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to fetch issue: {response.text}"
#             )

#         issue_data = response.json().get("data")
#         if not issue_data:
#             raise HTTPException(status_code=404, detail=f"No data found for issue {issue_id}")

#         full_description = issue_data.get("description", "")
#         image_base64 = None
#         cleaned_description = full_description

#         # Parse embedded image
#         if "[IMAGE_1_START]" in full_description and "[IMAGE_1_END]" in full_description:
#             try:
#                 start_idx = full_description.index("[IMAGE_1_START]")
#                 end_idx = full_description.index("[IMAGE_1_END]") + len("[IMAGE_1_END]")

#                 image_block = full_description[start_idx:end_idx]

#                 # Extract base64 from image block
#                 image_lines = image_block.splitlines()
#                 for line in image_lines:
#                     if line.strip().startswith("data:"):
#                         image_base64 = line.split("data:")[1].strip()
#                         break

#                 # Remove image block from description
#                 cleaned_description = (full_description[:start_idx] + full_description[end_idx:]).strip()

#             except Exception as e:
#                 raise HTTPException(
#                     status_code=500,
#                     detail=f"Failed to parse base64 image: {str(e)}"
#                 )

#         return {
#             "data": {
#                 "name": issue_data.get("name"),
#                 "subject": issue_data.get("subject"),
#                 "raised_by": issue_data.get("raised_by"),
#                 "status": issue_data.get("status"),
#                 "priority": issue_data.get("priority"),
#                 "issue_type": issue_data.get("issue_type"),
#                 "description": cleaned_description,
#                 "agreement_status": issue_data.get("agreement_status"),
#                 "opening_date": issue_data.get("opening_date"),
#                 "opening_time": issue_data.get("opening_time"),
#                 "creation": issue_data.get("creation"),
#                 "modified": issue_data.get("modified"),
#                 "company": issue_data.get("company"),
#                 "docstatus": issue_data.get("docstatus"),
#                 "image_base64": image_base64
#             }
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# class UpdateIssuePayload(BaseModel):
#     status: str
#     resolution_details: str


# @router.post("/update-issue/{issue_id}")
# def update_issue(issue_id: str, payload: UpdateIssuePayload = Body(...)):
#     try:
#         headers = {
#             "Authorization": f"token {ERP_API_TOKEN}",
#             "Content-Type": "application/json"
#         }

#         now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#         update_payload = {
#             "status": payload.status,
#             "resolution_details": payload.resolution_details,
#             "first_responded_on": now_str
#         }

#         url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
#         response = requests.put(url, headers=headers, json=update_payload, verify=False)

#         if response.status_code != 200:
#             raise HTTPException(
#                 status_code=response.status_code,
#                 detail=f"Failed to update issue: {response.text}"
#             )

#         return {
#             "message": f"Issue {issue_id} updated successfully.",
#             "updated_fields": update_payload
#         }

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


# class Base64ImagePayload(BaseModel):
#     image_base64: str


# @router.post("/decode-base64-image")
# def decode_base64_image_v2(payload: Base64ImagePayload):
#     try:
#         encoded = payload.image_base64.split(",")[-1]
#         image_data = base64.b64decode(encoded)
#         image = Image.open(BytesIO(image_data))

#         img_byte_arr = BytesIO()
#         image.save(img_byte_arr, format=image.format or "PNG")
#         img_byte_arr.seek(0)

#         return StreamingResponse(
#             img_byte_arr,
#             media_type=f"image/{image.format.lower() if image.format else 'png'}"
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Failed to decode and return image: {str(e)}"
#         )


from fastapi import APIRouter, HTTPException, Body
import requests
import urllib3
import json
from pydantic import BaseModel
from datetime import datetime
from settings import settings
import base64
from io import BytesIO
from PIL import Image
from fastapi.responses import StreamingResponse, FileResponse
import uuid
import os

router = APIRouter()

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ERP_BASE_URL = settings.ERP_BASE_URL
ERP_API_TOKEN = settings.ERP_API_TOKEN

UPLOAD_DIR = "/mnt/data"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/get-issues")
def get_all_issues():
    try:
        headers = {
            "Authorization": f"token {ERP_API_TOKEN}"
        }

        fields = ["name", "subject", "raised_by", "status", "priority", "opening_date", "custom_employee_name"]
        fields_param = json.dumps(fields)
        list_url = f"{ERP_BASE_URL}/api/resource/Issue?fields={fields_param}&limit_page_length=0"

        response = requests.get(list_url, headers=headers, verify=False)

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to fetch issues: {response.text}"
            )

        issues_data = response.json().get("data", [])

        return {
            "data": issues_data,
            "count": len(issues_data)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing request: {str(e)}"
        )


class ImageDecodeRequest(BaseModel):
    description: str


@router.post("/decode-image")
def decode_base64_image(payload: ImageDecodeRequest):
    try:
        description = payload.description

        if "data:" not in description or "[IMAGE_1_END]" not in description:
            raise HTTPException(status_code=400, detail="No valid base64 image found.")

        base64_part = description.split("data:")[1].split("[IMAGE_1_END]")[0].strip()
        base64_part = base64_part.replace("\n", "").replace("\r", "").strip()

        image_data = base64.b64decode(base64_part)

        filename = f"decoded_{uuid.uuid4().hex}.png"
        filepath = os.path.join("/tmp", filename) if os.name != "nt" else os.path.join("C:\\Windows\\Temp", filename)

        with open(filepath, "wb") as f:
            f.write(image_data)

        return FileResponse(filepath, media_type="image/png", filename=filename)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to decode image: {str(e)}")


@router.get("/get-issue/{issue_id}")
def get_single_issue(issue_id: str):
    try:
        headers = {
            "Authorization": f"token {ERP_API_TOKEN}"
        }

        url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
        response = requests.get(url, headers=headers, verify=False)

        if response.status_code == 404:
            raise HTTPException(status_code=404, detail=f"Issue {issue_id} not found")

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to fetch issue: {response.text}"
            )

        issue_data = response.json().get("data")
        if not issue_data:
            raise HTTPException(status_code=404, detail=f"No data found for issue {issue_id}")

        full_description = issue_data.get("description", "")
        image_base64 = None
        image_url = None
        cleaned_description = full_description

        if "[IMAGE_1_START]" in full_description and "[IMAGE_1_END]" in full_description:
            try:
                start_idx = full_description.index("[IMAGE_1_START]")
                end_idx = full_description.index("[IMAGE_1_END]") + len("[IMAGE_1_END]")

                image_block = full_description[start_idx:end_idx]

                image_lines = image_block.splitlines()
                for line in image_lines:
                    if line.strip().startswith("data:"):
                        image_base64 = line.split("data:")[1].strip()
                        break

                cleaned_description = (full_description[:start_idx] + full_description[end_idx:]).strip()

                if image_base64:
                    decoded_image = base64.b64decode(image_base64)
                    unique_filename = f"{uuid.uuid4().hex}.png"
                    image_path = os.path.join(UPLOAD_DIR, unique_filename)
                    with open(image_path, "wb") as f:
                        f.write(decoded_image)
                    image_url = f"/api/support/decoded-images/{unique_filename}"

            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to parse base64 image: {str(e)}"
                )

        return {
            "data": {
                "name": issue_data.get("name"),
                "subject": issue_data.get("subject"),
                "raised_by": issue_data.get("raised_by"),
                "status": issue_data.get("status"),
                "priority": issue_data.get("priority"),
                "issue_type": issue_data.get("issue_type"),
                "description": cleaned_description,
                "agreement_status": issue_data.get("agreement_status"),
                "opening_date": issue_data.get("opening_date"),
                "opening_time": issue_data.get("opening_time"),
                "creation": issue_data.get("creation"),
                "modified": issue_data.get("modified"),
                "company": issue_data.get("company"),
                "docstatus": issue_data.get("docstatus"),
                "image_url": image_url
            }
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/decoded-images/{filename}")
def serve_decoded_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(file_path, media_type="image/png", filename=filename)


class UpdateIssuePayload(BaseModel):
    status: str
    resolution_details: str


@router.post("/update-issue/{issue_id}")
def update_issue(issue_id: str, payload: UpdateIssuePayload = Body(...)):
    try:
        headers = {
            "Authorization": f"token {ERP_API_TOKEN}",
            "Content-Type": "application/json"
        }

        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        update_payload = {
            "status": payload.status,
            "resolution_details": payload.resolution_details,
            "first_responded_on": now_str
        }

        url = f"{ERP_BASE_URL}/api/resource/Issue/{issue_id}"
        response = requests.put(url, headers=headers, json=update_payload, verify=False)

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Failed to update issue: {response.text}"
            )

        return {
            "message": f"Issue {issue_id} updated successfully.",
            "updated_fields": update_payload
        }

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Connection error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


class Base64ImagePayload(BaseModel):
    image_base64: str


@router.post("/decode-base64-image")
def decode_base64_image_v2(payload: Base64ImagePayload):
    try:
        encoded = payload.image_base64.split(",")[-1]
        image_data = base64.b64decode(encoded)
        image = Image.open(BytesIO(image_data))

        img_byte_arr = BytesIO()
        image.save(img_byte_arr, format=image.format or "PNG")
        img_byte_arr.seek(0)

        return StreamingResponse(
            img_byte_arr,
            media_type=f"image/{image.format.lower() if image.format else 'png'}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to decode and return image: {str(e)}"
        )
