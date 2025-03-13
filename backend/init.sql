IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'gestao_infra')
BEGIN
    CREATE DATABASE gestao_infra;
END
