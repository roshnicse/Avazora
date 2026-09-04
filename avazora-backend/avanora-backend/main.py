from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database.connection import engine, Base
from routes import temple_routes, festival_routes, trail_routes, contact_routes

# Creates tables if they don't exist yet. Fine for dev; use Alembic
# migrations instead once the schema needs to evolve in production.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description="Backend API for Avanora — Indian Temple Tourism & Heritage Discovery",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(temple_routes.router)
app.include_router(festival_routes.router)
app.include_router(trail_routes.router)
app.include_router(contact_routes.router)


@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "status": "ok",
        "docs": "/docs",
    }


@app.get("/api/health")
def health():
    return {"status": "healthy"}
