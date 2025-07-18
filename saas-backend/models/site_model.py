from pydantic import BaseModel

class DropSiteRequest(BaseModel):
    site: str
