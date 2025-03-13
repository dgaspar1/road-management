from fastapi import FastAPI
from routes import rodovias, pontes
from backend.app.database import get_connection

app = FastAPI()

conn = get_connection()

app.include_router(rodovias.router, prefix="/api", tags=["rodovias"])
app.include_router(pontes.router, prefix="/api", tags=["pontes"])

@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao sistema de gestão de infraestrutura"}

@app.on_event("startup")
def startup_event():
    conn = get_connection()
    conn.close()

@app.on_event("shutdown")
def shutdown_event():
    conn.close()
