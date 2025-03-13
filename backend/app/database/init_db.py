from app.database.database import execute_queries

def create_tables():
    queries = [
        """
        CREATE TABLE Rodovias (
            id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
            nome NVARCHAR(255) NOT NULL,
            estado_conservacao NVARCHAR(50),
            ultimo_reparo DATE,
            trafego_medio_diario INT
        );
        """,
        """
        CREATE TABLE Pontes (
            id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
            nome NVARCHAR(255) NOT NULL,
            estado_conservacao NVARCHAR(50),
            ultimo_reparo DATE,
            trafego_medio_diario INT
        );
        """
    ]
    execute_queries(queries)
    print("Tabelas 'Rodovias' e 'Pontes' criadas com sucesso!")