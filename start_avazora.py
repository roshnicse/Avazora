#!/usr/bin/env python3
"""
AVAZORA TOURISM — Unified Project Launcher
Runs the Frontend & Backend together as one unified application.
Automatically opens http://localhost:8080 in your web browser.

FIX: Uses a custom HTTP handler that supports byte-range requests (RFC 7233).
     Browsers REQUIRE HTTP 206 Partial Content to stream video files.
     Python's built-in http.server returns HTTP 200 for everything, which
     causes the <video> element to stall / show a black screen.
"""

import os
import sys
import time
import subprocess
import webbrowser
import mimetypes
import threading
from pathlib import Path
from http.server import BaseHTTPRequestHandler, HTTPServer


# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
BASE_DIR     = Path(__file__).resolve().parent
FRONTEND_DIR = BASE_DIR / "avazora-frontend" / "avazora-frontend"
BACKEND_DIR  = BASE_DIR / "avazora-backend"  / "avanora-backend"


# ---------------------------------------------------------------------------
# Range-request-capable HTTP handler  (RFC 7233 / HTTP 206 Partial Content)
# ---------------------------------------------------------------------------
class RangeRequestHandler(BaseHTTPRequestHandler):
    """
    Serves static files with full byte-range support so that browsers can
    stream MP4 video through the <video> element without stalling.
    """

    CHUNK = 65536   # 64 KB read chunks

    def do_GET(self):
        self._serve(send_body=True)

    def do_HEAD(self):
        self._serve(send_body=False)

    def _serve(self, send_body: bool):
        # Resolve URL path → filesystem path
        url_path = self.path.split("?", 1)[0]          # strip query string
        url_path = url_path.lstrip("/") or "index.html"
        fs_path  = FRONTEND_DIR / Path(url_path)

        # Directory → serve index.html
        if fs_path.is_dir():
            fs_path = fs_path / "index.html"

        if not fs_path.is_file():
            self.send_error(404, f"File not found: {url_path}")
            return

        file_size = fs_path.stat().st_size
        ctype, _  = mimetypes.guess_type(str(fs_path))
        if ctype is None:
            ctype = "application/octet-stream"

        # Parse Range header  →  bytes=start-end
        range_header = self.headers.get("Range", "").strip()
        start, end   = 0, file_size - 1

        if range_header.startswith("bytes="):
            try:
                rng        = range_header[6:]          # e.g. "0-1048575"
                s_str, e_str = rng.split("-", 1)
                start = int(s_str) if s_str else 0
                end   = int(e_str) if e_str else file_size - 1
                end   = min(end, file_size - 1)
                response_code = 206
            except ValueError:
                response_code = 200
        else:
            response_code = 200

        chunk_size = end - start + 1

        # --- Send headers ---
        self.send_response(response_code)
        self.send_header("Content-Type",   ctype)
        self.send_header("Content-Length", str(chunk_size))
        self.send_header("Accept-Ranges",  "bytes")
        self.send_header("Access-Control-Allow-Origin", "*")
        if response_code == 206:
            self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
        self.end_headers()

        if not send_body:
            return

        # --- Stream file bytes ---
        try:
            with open(fs_path, "rb") as fh:
                fh.seek(start)
                remaining = chunk_size
                while remaining > 0:
                    data = fh.read(min(self.CHUNK, remaining))
                    if not data:
                        break
                    self.wfile.write(data)
                    remaining -= len(data)
        except (ConnectionResetError, BrokenPipeError):
            pass   # Client disconnected mid-stream — normal for video seek/skip

    def log_message(self, fmt, *args):
        status = args[1] if len(args) > 1 else "?"
        print(f"  [Frontend {status}] {self.address_string()}  {fmt % args}")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def log(msg):
    print(f"\n[AVAZORA LAUNCHER] {msg}")


def check_dependencies():
    log("Checking backend dependencies...")
    try:
        import fastapi, uvicorn, sqlalchemy
        log("Backend dependencies verified.")
    except ImportError:
        log("Installing missing backend dependencies from requirements.txt...")
        log("Upgrading pip first...")
        subprocess.run(
            [sys.executable, "-m", "pip", "install", "--upgrade", "pip"],
            capture_output=True,
        )
        
        req_file = BACKEND_DIR / "requirements.txt"
        # Try installing with wheels only first to avoid compilation issues
        log("Installing dependencies (using pre-built wheels)...")
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "--prefer-binary", "-r", str(req_file)],
        )
        if result.returncode != 0:
            log("Retrying with standard pip install...")
            subprocess.run(
                [sys.executable, "-m", "pip", "install", "-r", str(req_file)],
                check=True,
            )


def ensure_database_seeded():
    db_file = BACKEND_DIR / "avanora.db"
    if not db_file.exists():
        log("Seeding SQLite database with temple, trail, and festival archives...")
        seed_script = BACKEND_DIR / "seed.py"
        subprocess.run(
            [sys.executable, str(seed_script)],
            cwd=str(BACKEND_DIR),
            check=True,
        )


def regenerate_video():
    """Regenerate the temple hero video with current settings."""
    video_script = BASE_DIR / "make_video.py"
    if video_script.exists():
        log("Regenerating temple hero video...")
        subprocess.run(
            [sys.executable, str(video_script)],
            cwd=str(BASE_DIR),
            check=True,
        )
        log("Video regeneration complete.")


def run_frontend_server(port: int = 8080):
    """Start the range-aware HTTP server in a daemon thread."""
    server = HTTPServer(("", port), RangeRequestHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    log(f"Frontend server running at http://localhost:{port}  [OK]  (video streaming enabled)")
    return server


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=" * 65)
    print("      AVAZORA TOURISM — SACRED HERITAGE & TEMPLE DISCOVERY")
    print("=" * 65)

    check_dependencies()
    ensure_database_seeded()
    regenerate_video()

    backend_proc = None

    try:
        # 1. Backend — FastAPI / uvicorn on port 8000
        log("Starting Backend API Server at http://localhost:8000 ...")
        backend_proc = subprocess.Popen(
            [sys.executable, "-m", "uvicorn", "main:app", "--port", "8000"],
            cwd=str(BACKEND_DIR),
        )
        time.sleep(1.5)

        # 2. Frontend — range-capable HTTP server on port 8080
        run_frontend_server(8080)
        time.sleep(0.5)

        # 3. Open browser
        target_url = "http://localhost:8080"
        log(f"Opening Avazora Tourism in your browser at {target_url} ...")
        webbrowser.open(target_url)

        print("\n" + "=" * 65)
        print("  [OK] AVAZORA TOURISM IS RUNNING LIVE.")
        print(f"  [WEB] Frontend Website : {target_url}")
        print("  [API] Backend API      : http://localhost:8000/api")
        print("  [DOC] API Docs (Swagger): http://localhost:8000/docs")
        print("=" * 65)
        print("  Press Ctrl+C to stop all servers.")
        print("=" * 65 + "\n")

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        log("Stopping all Avazora servers...")
    finally:
        if backend_proc:
            try:
                backend_proc.terminate()
                backend_proc.wait(timeout=4)
            except Exception:
                backend_proc.kill()
        log("All servers stopped cleanly. Goodbye!")


if __name__ == "__main__":
    main()
