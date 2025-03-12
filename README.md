# 🌟 Gestão de Infraestrutura Rodoviária

## ✨ Visão Geral
Este projeto tem como objetivo desenvolver um sistema para gestão de infraestruturas rodoviárias, permitindo o cadastro de estradas, rodovias e pontes, além do monitoramento do estado de conservação, último reparo realizado e tráfego médio diário.

A aplicação será desenvolvida em **Python** com frontend em **React**, utilizando **SQL Server** como banco de dados, e toda a solução rodará dentro de um **container Docker** no **Windows**.

## ⚡ Tecnologias Utilizadas
- **Frontend:** React.js
- **Backend:** FastAPI (Python)
- **Banco de Dados:** SQL Server (Hospedado no Azure SQL Database Free Tier)
- **Armazenamento de Imagens:** Azure Blob Storage (5GB gratuito)
- **Deploy:** Azure Web Apps
- **Containerização:** Docker
- **Autenticação:** Azure Active Directory (Opcional)

## ⚖️ Funcionalidades
### ✍️ CRUD de Rodovias
- Cadastro de estradas, rodovias e pontes
- Atualização e remoção de registros
- Consulta de informações detalhadas

### 🌆 Dashboard Interativo
- Gráficos de tráfego médio diário
- Visualização do estado de conservação das rodovias
- Relatórios sobre últimos reparos

### 🌟 Upload de Imagens
- Envio de imagens das rodovias e pontes
- Armazenamento no **Azure Blob Storage**
- Visualização direta no dashboard

## ⚙️ Configuração e Instalação
### 1. Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/gestao-infra-rodoviaria.git
cd gestao-infra-rodoviaria
```

### 2. Configurar o Banco de Dados
Crie um banco de dados no **Azure SQL Database Free Tier** e configure a string de conexão no arquivo `.env`:
```env
DB_HOST=<seu-host>
DB_NAME=<seu-banco>
DB_USER=<seu-usuario>
DB_PASSWORD=<sua-senha>
```

### 3. Configurar o Azure Blob Storage
Crie um **Storage Account** no Azure e adicione as credenciais no `.env`:
```env
AZURE_STORAGE_ACCOUNT=<seu-storage-account>
AZURE_STORAGE_KEY=<sua-chave>
AZURE_CONTAINER_NAME=<nome-do-container>
```

### 4. Construir e Executar com Docker
Certifique-se de ter o Docker instalado no Windows e execute:
```sh
docker-compose up --build
```
Isso iniciará os containers do backend, frontend e banco de dados.

### 5. Acessar a Aplicação
Após a inicialização, acesse:
- **Frontend:** `http://localhost:3000`
- **Backend (Swagger UI):** `http://localhost:8000/docs`

## 🛠️ Estrutura do Projeto
```bash
/
|-- backend/              # API em Python com FastAPI
|   |-- app/
|   |   |-- models/      # Modelos do SQLAlchemy
|   |   |-- routes/      # Endpoints da API
|   |   |-- services/    # Lógica de negócio
|   |   |-- database.py  # Conexão com SQL Server
|   |-- main.py          # Ponto de entrada da API
|-- frontend/             # Aplicativo React
|   |-- src/
|   |   |-- components/  # Componentes reutilizáveis
|   |   |-- pages/       # Páginas principais
|   |   |-- services/    # Consumo da API
|   |-- App.js           # Arquivo principal
|-- docker-compose.yml    # Configuração dos containers
|-- .env                  # Variáveis de ambiente
|-- README.md             # Documentação
```

## 💪 Contribuição
Ficamos felizes com qualquer contribuição! Para colaborar:
1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature-nome-da-feature`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça um push para a branch (`git push origin feature-nome-da-feature`).
5. Abra um **Pull Request**.

## 🌟 Licença
Este projeto está sob a **Licença MIT**. Consulte o arquivo `LICENSE` para mais detalhes.