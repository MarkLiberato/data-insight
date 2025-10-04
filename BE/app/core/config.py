from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Data Analyst API"
    
    # CORS Settings
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
    ]
    
    # File Upload Settings
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_TYPES: List[str] = ["text/csv", "application/csv"]
    UPLOAD_DIR: str = "uploads"
    
    # PandasAI Settings
    PANDASAI_API_KEY: str = ""  # Set your OpenAI API key here
    PANDASAI_MODEL: str = "gpt-3.5-turbo"
    
    # Database Settings (for future use)
    DATABASE_URL: str = "sqlite:///./data_insight.db"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
