import pymssql
import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

def get_connection():
    return pymssql.connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

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
