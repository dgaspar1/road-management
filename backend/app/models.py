from pydantic import BaseModel

class Rodovia(BaseModel):
    id: int
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int

class Pontes(BaseModel):
    id: int
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int
