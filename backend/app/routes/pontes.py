from fastapi import APIRouter, HTTPException
from app.models.models import Pontes
from app.database.database import get_connection
from pydantic import BaseModel

router = APIRouter()

@router.get("/pontes")
async def listar_pontes():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute("SELECT * FROM Pontes")
    pontes = cursor.fetchall()
    conn.close()
    return pontes

@router.get("/pontes/{ponte_id}")
async def obter_ponte(ponte_id: str):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute("SELECT * FROM Pontes WHERE id = %s", (ponte_id,))
    ponte = cursor.fetchone()
    conn.close()
    if ponte is None:
        raise HTTPException(status_code=404, detail="Ponte não encontrada")
    return ponte

@router.post("/pontes")
async def criar_ponte(ponte: Pontes):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Pontes (nome, estado_conservacao, ultimo_reparo, trafego_medio_diario) VALUES (%s, %s, %s, %s)",
        (ponte.nome, ponte.estado_conservacao, ponte.ultimo_reparo, ponte.trafego_medio_diario)
    )
    conn.commit()
    conn.close()
    return {"message": "Ponte criada com sucesso"}

@router.put("/pontes/{ponte_id}")
async def atualizar_ponte(ponte_id: str, ponte: Pontes):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE Pontes SET nome = %s, estado_conservacao = %s, ultimo_reparo = %s, trafego_medio_diario = %s WHERE id = %s",
        (ponte.nome, ponte.estado_conservacao, ponte.ultimo_reparo, ponte.trafego_medio_diario, ponte_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Ponte atualizada com sucesso"}

@router.delete("/pontes/{ponte_id}")
async def deletar_ponte(ponte_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Pontes WHERE id = %s", (ponte_id,))
    conn.commit()
    conn.close()
    return {"message": "Ponte deletada com sucesso"}
