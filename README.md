# Projeto FastAPI + React com Docker Compose

Este é um projeto que utiliza Python como backend, React (JS) como frontend e Docker Compose para gerenciar os containers.

## Pré-requisitos

- Docker
- Node.js
- npm

## Instalação e Uso

1. Clone este repositório

2. Navegue até a pasta do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Na pasta `frontend`, instale as dependências do frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Volte para a raiz do projeto:

   ```bash
   cd ..
   ```

5. Inicie os containers usando Docker Compose:

   ```bash
   docker-compose up -d
   ```

6. Aguarde até que todos os containers estejam em execução.

7. Acesse a aplicação em [http://localhost:3000].

## Acesso ao Banco de Dados

- Para acessar o MongoDB, você pode utilizar o [Mongo Express](https://github.com/mongo-express/mongo-express), que está disponível em [http://localhost:8081]. Use as credenciais abaixo:
  - **Usuário:** admin
  - **Senha:** password

## Credenciais Padrão da Aplicação

- **Usuário padrão:** admin@gmail.com
- **Senha padrão:** admin

## Estrutura do Projeto

- A pasta `api` contém o código fonte do backend FastAPI.
- A pasta `frontend` contém o código fonte do frontend React.
- O arquivo `docker-compose.yml` define os serviços e configurações dos containers Docker.

