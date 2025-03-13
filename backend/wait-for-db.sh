echo "Aguardando o SQL Server iniciar..."

until /opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P "YourStrong!Passw0rd" -Q "SELECT 1" &> /dev/null
do
    echo "Banco de dados ainda não está pronto. Tentando novamente..."
    sleep 5
done

echo "Banco de dados está pronto! Iniciando aplicação..."
exec "$@"
