from pydantic import BaseModel
from typing import Optional
import uuid

class Rodovia(BaseModel):
    id: Optional[uuid.UUID] = None
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int


class Pontes(BaseModel):
    id: Optional[uuid.UUID] = None
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int
