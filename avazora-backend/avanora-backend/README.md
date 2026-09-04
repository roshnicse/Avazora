# Avanora Backend

FastAPI backend for the Avanora temple tourism platform. Serves temple,
festival, and trail data to the frontend.

## Project structure

```
avanora-backend/
  main.py              FastAPI app, CORS, router registration
  config.py             Settings (DB URL, CORS origins, JWT secret)
  seed.py                Loads sample data into the database
  requirements.txt
  .env.example           Copy to .env and fill in real values
  database/
    connection.py         SQLAlchemy engine/session
    models.py              Table definitions (State, Temple, Festival, Trail...)
  schemas/
    temple.py               Pydantic response/request shapes for temples
    festival.py              Pydantic response shapes for festivals & trails
  routes/
    temple_routes.py       GET /api/temples, GET /api/temples/{slug}
    festival_routes.py     GET /api/festivals
    trail_routes.py        GET /api/trails, GET /api/trails/{slug}
  services/ ai/ utils/    Empty for now — this is where the recommendation
                            engine, yatra planner, and RAG/AI guide land
                            in later phases.
```

## 1. Install dependencies

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Configure the database

**Quickest path (no setup):** do nothing. If you don't create a `.env`
file, the app uses a local SQLite file (`avanora.db`) automatically.
Good for a first run.

**To use your real MySQL database:**

1. Create the database and a user in MySQL:
   ```sql
   CREATE DATABASE avanora CHARACTER SET utf8mb4;
   CREATE USER 'avanora_user'@'localhost' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON avanora.* TO 'avanora_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and set `DATABASE_URL` to your MySQL connection string:
   ```
   DATABASE_URL=mysql+pymysql://avanora_user:yourpassword@localhost:3306/avanora
   ```

No code changes needed either way — `database/connection.py` reads
whichever URL is active.

## 3. Create tables and load sample data

```bash
python seed.py
```

This creates all tables (if they don't exist) and inserts 22 states,
6 real temples (Brihadeeswarar, Meenakshi Amman, Konark Sun Temple,
Kedarnath, Kandariya Mahadeva, Lingaraj), 3 festivals, and 2 trails.
Safe to re-run — it skips anything already inserted.

## 4. Run the server

```bash
uvicorn main:app --reload --port 8000
```

- API root: http://localhost:8000/
- Interactive docs (Swagger UI): http://localhost:8000/docs
- Health check: http://localhost:8000/api/health

## Endpoints so far

| Method | Path                       | Description                                   |
|--------|----------------------------|------------------------------------------------|
| GET    | /api/temples                | List temples. Query params: `q`, `state`, `region`, `deity`, `architecture_style`, `heritage_status`, `limit`, `offset` |
| GET    | /api/temples/{slug}          | Full detail for one temple                     |
| GET    | /api/festivals                | List festivals. Optional `temple_slug` filter |
| GET    | /api/trails                    | List trails with temple counts                |
| GET    | /api/trails/{slug}              | Trail detail including its temple sequence    |

## Connecting the frontend

The frontend (`avanora-frontend/js/main.js`) already points at
`http://localhost:8000/api` and will use this backend automatically
once both are running — no frontend changes needed. If the API is
unreachable, the frontend quietly falls back to static sample data
instead of breaking, so you can develop either side independently.

If your frontend runs somewhere other than `localhost:8080`, add its
origin to `CORS_ORIGINS` in `.env` (comma-separated).

## What's not built yet

- Auth (register/login/JWT) and user-specific data (favorites, saved
  temples, trip history)
- The yatra planner endpoint (day-by-day itinerary generation)
- The AI guide / RAG endpoint (`ai/` is currently empty)
- Write endpoints (create/update/delete) and the admin dashboard —
  right now everything is read-only, seeded from `seed.py`
