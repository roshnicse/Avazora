"""
Central app configuration. Reads from environment variables / .env.

For local development against MySQL, set DATABASE_URL, e.g.:
    DATABASE_URL=mysql+pymysql://avanora_user:yourpassword@localhost:3306/avanora

If DATABASE_URL is not set, we fall back to a local SQLite file
(avanora.db) so the API runs out of the box with zero setup —
useful for a first run before MySQL is configured.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Avanora API"
    environment: str = "development"

    # MySQL example:
    # mysql+pymysql://avanora_user:yourpassword@localhost:3306/avanora
    database_url: str = "sqlite:///./avanora.db"

    # Comma-separated list of allowed frontend origins for CORS, or * to allow all
    cors_origins: str = "http://localhost:8080,http://127.0.0.1:8080,http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000,http://localhost:5173,*"

    jwt_secret: str = "change-this-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7  # 7 days

    class Config:
        env_file = ".env"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
