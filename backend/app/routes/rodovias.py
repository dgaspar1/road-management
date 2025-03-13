from fastapi import APIRouter, HTTPException
from app.models.models import Rodovia
from app.database.database import get_connection
from pydantic import BaseModel

router = APIRouter()

@router.get("/rodovias")
def listar_rodovias():
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute("SELECT * FROM Rodovias")
    rodovias = cursor.fetchall()
    conn.close()
    return rodovias

@router.get("/rodovias/{rodovia_id}")
def obter_rodovia(rodovia_id: str):
    conn = get_connection()
    cursor = conn.cursor(as_dict=True)
    cursor.execute("SELECT * FROM Rodovias WHERE id = %s", (rodovia_id,))
    rodovia = cursor.fetchone()
    conn.close()
    if rodovia is None:
        raise HTTPException(status_code=404, detail="Rodovia não encontrada")
    return rodovia

@router.post("/rodovias")
def criar_rodovia(rodovia: Rodovia):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Rodovias (nome, estado_conservacao, ultimo_reparo, trafego_medio_diario) VALUES (%s, %s, %s, %s)",
        (rodovia.nome, rodovia.estado_conservacao, rodovia.ultimo_reparo, rodovia.trafego_medio_diario)
    )
    conn.commit()
    conn.close()
    return {"message": "Rodovia criada com sucesso"}

@router.put("/rodovias/{rodovia_id}")
def atualizar_rodovia(rodovia_id: str, rodovia: Rodovia):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE Rodovias SET nome = %s, estado_conservacao = %s, ultimo_reparo = %s, trafego_medio_diario = %s WHERE id = %s",
        (rodovia.nome, rodovia.estado_conservacao, rodovia.ultimo_reparo, rodovia.trafego_medio_diario, rodovia_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Rodovia atualizada com sucesso"}

@router.delete("/rodovias/{rodovia_id}")
def deletar_rodovia(rodovia_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Rodovias WHERE id = %s", (rodovia_id,))
    conn.commit()
    conn.close()
    return {"message": "Rodovia deletada com sucesso"}
