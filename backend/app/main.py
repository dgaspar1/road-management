from fastapi import FastAPI
from app.routes import rodovias, pontes
from app.database.database import get_connection
from app.database.init_db import create_tables
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    conn = get_connection()
    yield
    conn.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite requisições de qualquer origem (pode restringir para ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os headers na requisição
)

conn = get_connection()
create_tables()

app.include_router(rodovias.router, prefix="/api", tags=["rodovias"])
app.include_router(pontes.router, prefix="/api", tags=["pontes"])

@app.get("/")
async def read_root():
    return {"Hello": "World"}

