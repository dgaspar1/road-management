import pymssql
import os
from pydantic import BaseModel

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "sa")
DB_PASSWORD = os.getenv("DB_PASSWORD", "YourStrong!Passw0rd")
DB_NAME = os.getenv("DB_NAME", "gestao_infra")

def get_connection():
    create_tables()
    return pymssql.connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

class Rodovia(BaseModel):
    id: int
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int

class Ponte(BaseModel):
    id: int
    nome: str
    estado_conservacao: str
    ultimo_reparo: str
    trafego_medio_diario: int

def create_tables():
    queries = [
        """
        CREATE TABLE Rodovias (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nome NVARCHAR(255) NOT NULL,
            estado_conservacao NVARCHAR(50),
            ultimo_reparo DATE,
            trafego_medio_diario INT
        );
        """,
        """
        CREATE TABLE Pontes (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nome NVARCHAR(255) NOT NULL,
            estado_conservacao NVARCHAR(50),
            ultimo_reparo DATE,
            trafego_medio_diario INT
        );
        """
    ]
    execute_queries(queries)
    print("Tabelas 'Rodovias' e 'Pontes' criadas com sucesso!")

def drop_tables():
    queries = [
        "DROP TABLE IF EXISTS Rodovias;",
        "DROP TABLE IF EXISTS Pontes;"
    ]
    execute_queries(queries)
    print("Tabelas 'Rodovias' e 'Pontes' removidas com sucesso!")

def execute_queries(queries):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        for query in queries:
            cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Erro ao executar queries: {e}")
