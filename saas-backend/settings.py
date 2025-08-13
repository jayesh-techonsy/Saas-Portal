# settings.py (Pydantic v2 compatible)
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SUPABASE_DB_HOST: str
    SUPABASE_DB_PORT: int
    SUPABASE_DB_NAME: str
    SUPABASE_DB_USER: str
    SUPABASE_DB_PASSWORD: str
    ERP_WALLET_API: str
    ERP_API_TOKEN: str
    ERP_BASE_URL: str

    SSH_HOSTNAME: str
    SSH_USERNAME: str
    SSH_KEY_PATH: str
    DOCKER_CONTAINER_NAME: str

    class Config:
        env_file = ".env"

settings = Settings()
