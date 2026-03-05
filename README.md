# nestjs-mongo-aggregate-sample

API backend construída com **NestJS** e **MongoDB**, utilizando
**Mongoose** como ODM.

O projeto demonstra modelagem baseada em agregados (User com Orders
embutido), uso de subdocumentos, aplicação de boas práticas em APIs REST
e evolução arquitetural progressiva inspirada em **Clean Architecture**
e **DDD**.


## 🧱 Stack

-   Node.js
-   NestJS
-   TypeScript
-   MongoDB
-   Mongoose
-   JWT Authentication
-   Role-based Authorization
-   Docker


## 📦 Requisitos

-   Node.js (LTS recomendado)
-   Docker
-   Docker Compose

# 🚀 Executando o Projeto

## 1. Clonar o repositório

``` bash
git clone <repo-url>
cd nestjs-mongo-aggregate-sample
```

## 2. Instalar dependências

``` bash
npm install
```

## 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example`:

``` bash
cp .env.example .env
```

Exemplo de configuração:

``` env
MONGODB_URI=mongodb://localhost:27017/nestmongo
APP_PORT=3000
JWT_SECRET=dev_secret_change_me
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

## 🐳 Executando o MongoDB localmente

Subir o container:

``` bash
docker compose up -d
```

Verificar status:

``` bash
docker compose ps
```

Visualizar logs:

``` bash
docker compose logs -f mongo
```

MongoDB disponível em:

mongodb://localhost:27017

## 🚀 Executando a aplicação

Iniciar em modo desenvolvimento:

``` bash
npm run start:dev
```

Aplicação disponível em:

http://localhost:3000

# 🔐 Autenticação (JWT)

Antes de acessar rotas protegidas é necessário obter um token JWT.

## Login

POST /v1/auth/login

Body:

``` json
{
  "username": "admin",
  "password": "admin"
}
```

Resposta:

``` json
{
  "accessToken": "..."
}
```

Utilize o token no header:

Authorization: Bearer `<token>`{=html}

# 🛡 Authorization (Roles)

O sistema implementa **Role-Based Access Control (RBAC)**.

Roles disponíveis:

admin\
user

Algumas rotas (relatórios) são restritas à role **admin**.

Exemplo:

@Roles(Role.Admin)

Usuários sem permissão receberão:

403 Forbidden

# 📊 Rotas Principais

## Criar usuário

POST /v1/users

## Adicionar pedido ao usuário

POST /v1/users/:id/orders

## Resumo do usuário (Aggregation Pipeline)

GET /v1/users/:id/summary

Retorna:

-   total de pedidos
-   total gasto
-   ticket médio
-   primeiro pedido
-   último pedido

## Top produtos do usuário

GET /v1/users/:id/top-products

Também suporta filtro por período:

GET /v1/users/:id/top-products?from=2026-01-01&to=2026-02-01

Este endpoint utiliza **MongoDB Aggregation Pipeline**.

# ⚙️ Configuração

Variáveis de ambiente utilizadas:

-   MONGODB_URI
-   APP_PORT
-   JWT_SECRET
-   JWT_EXPIRES_IN
-   NODE_ENV

Um arquivo `.env.example` é disponibilizado como referência.

# 📂 Evolução do Projeto

O projeto foi desenvolvido incrementalmente seguindo etapas
arquiteturais:

1.  Base funcional com MongoDB e Mongoose
2.  Modelagem de agregados (User com Orders embutido)
3.  Endpoints REST com validação
4.  Indexação estratégica
5.  Aggregation Pipelines
6.  Versionamento de API (/v1)
7.  JWT Authentication
8.  Role-based Authorization
9.  Relatórios analíticos via Aggregation

# 📌 Objetivo Técnico

Demonstrar:

-   Modelagem adequada em MongoDB com agregados
-   Uso de **Aggregation Pipeline**
-   Estrutura organizada e evolutiva
-   Autenticação e autorização modernas
-   Boas práticas alinhadas a ambientes de produção

# 🚧 Próximos passos

-   Simulação de eventos com **AWS SQS**
-   Logging estruturado (CloudWatch style)
-   Testes E2E
-   Refactor para **Clean Architecture completo**
-   Observabilidade