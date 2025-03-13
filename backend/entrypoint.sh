#!/bin/bash
echo "⏳ Aguardando SQL Server iniciar..."

# Espera o SQL Server estar pronto
until /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$DB_PASSWORD" -Q "SELECT 1" &> /dev/null
do
    echo "🔄 Banco de dados ainda não está pronto. Tentando novamente..."
    sleep 5
done

echo "✅ Criando/verificando banco de dados..."

# Executa o script SQL para criar o banco
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "$DB_PASSWORD" -d master -i /app/init.sql

echo "✅ Banco de dados pronto! Iniciando API..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload