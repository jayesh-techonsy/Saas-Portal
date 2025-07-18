# from fastapi import APIRouter
# from controllers.app_controller import get_app_list

# router = APIRouter()

# router.get("/apps")(get_app_list)

from fastapi import APIRouter, Depends
from utils.deps import get_current_client  # Adjust the import if your structure is different

router = APIRouter(
    prefix="/apps",
    tags=["Apps"],
    dependencies=[Depends(get_current_client)]  # 👈 This makes all routes protected
)

@router.get("/")
async def get_apps():
    return {"message": "Protected route - accessible only with valid token"}

# You can add more protected routes below

