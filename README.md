# nestjs-mongo-aggregate-sample

Backend API construída com **NestJS** e **MongoDB**, utilizando **Mongoose** como ODM.

O projeto demonstra modelagem baseada em **agregados (User com Orders embutidos)**, uso de **MongoDB Aggregation Pipeline**, autenticação **JWT**, autorização **RBAC (Role-Based Access Control)** e práticas comuns em ambientes de produção como **logging estruturado**, **tratamento global de erros** e **publicação de eventos desacoplada**.

A aplicação foi construída **incrementalmente**, inspirada em conceitos de **Clean Architecture** e **DDD**.

---

# 🧱 Stack

- Node.js
- NestJS
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Role-Based Authorization (RBAC)
- Docker / Docker Compose

---

# 📦 Requisitos

- Node.js (LTS recomendado)
- Docker
- Docker Compose

---

# 🚀 Executando o Projeto

## 1. Clonar o repositório

```bash
git clone <https://github.com/alexandremoraiscosta/nestjs-mongo-aggregate-sample.git>
cd nestjs-mongo-aggregate-sample
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Configurar variáveis de ambiente

Copie o arquivo `.env.example`:

```bash
cp .env.example .env
```

Exemplo:

```env
MONGODB_URI=mongodb://localhost:27017/nestmongo
APP_PORT=3000
JWT_SECRET=dev_secret_change_me
JWT_EXPIRES_IN=1h
NODE_ENV=development
```

---

# 🐳 Executando o MongoDB localmente

Subir o container:

```bash
docker compose up -d
```

Verificar status:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f mongo
```

MongoDB disponível em:

```
mongodb://localhost:27017
```

---

# 🚀 Executando a aplicação

```bash
npm run start:dev
```

Aplicação disponível em:

```
http://localhost:3000
```

---

# 🔐 Autenticação (JWT)

Antes de acessar rotas protegidas é necessário obter um **token JWT**.

## Login

```
POST /v1/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Resposta:

```json
{
  "accessToken": "..."
}
```

Utilize o token nas requisições:

```
Authorization: Bearer <token>
```

---

# 🛡 Authorization (Roles)

O sistema utiliza **Role-Based Access Control (RBAC)**.

Roles disponíveis:

```
admin
user
```

Algumas rotas analíticas são restritas à role **admin**.

Exemplo no código:

```ts
@Roles(Role.Admin)
```

Se o usuário não possuir permissão:

```
403 Forbidden
```

---

# 📊 Rotas Principais

## Criar usuário

```http
POST /v1/users
```

---

## Adicionar pedido ao usuário

```http
POST /v1/users/:id/orders
```

Esse endpoint:

1. adiciona o pedido ao usuário
2. persiste no MongoDB
3. publica o evento `order.created`

---

## Resumo do usuário

```http
GET /v1/users/:id/summary
```

Utiliza **MongoDB Aggregation Pipeline** para retornar:

- total de pedidos
- valor total gasto
- ticket médio
- data do primeiro pedido
- data do último pedido

---

## Top produtos do usuário

```http
GET /v1/users/:id/top-products
```

Filtro por período:

```http
GET /v1/users/:id/top-products?from=2026-01-01&to=2026-02-01
```

Esse endpoint também utiliza **Aggregation Pipeline**.

---

# 🧠 Arquitetura Simplificada

```
Client
  │
  ▼
Controllers
  │
  ▼
Services (Use Cases)
  │
  ├── MongoDB (Mongoose ODM)
  │
  └── Event Publisher
         │
         ▼
   SqsLikeEventsPublisher
         │
         ▼
      Structured Logs
```

---

# 🔔 Eventos

Quando um pedido é criado, a aplicação publica o evento:

```
order.created
```

Fluxo:

```
UsersService
   │
   ▼
EventsPublisher (interface)
   │
   ▼
SqsLikeEventsPublisher
   │
   ▼
log estruturado simulando envio para fila
```

Essa implementação demonstra o padrão **Producer → Queue → Consumer**, mantendo a aplicação desacoplada da infraestrutura real.

---

# ⚙️ Configuração

Variáveis utilizadas:

- `MONGODB_URI`
- `APP_PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `NODE_ENV`

Um arquivo `.env.example` é fornecido como referência.

---

# 📂 Evolução do Projeto

O projeto foi desenvolvido incrementalmente:

1. Base NestJS + MongoDB  
2. Modelagem de agregados (User → Orders)  
3. Endpoints REST com DTO e validação  
4. Indexação estratégica  
5. Aggregation Pipeline  
6. Versionamento de API (`/v1`)  
7. JWT Authentication  
8. Role-Based Authorization  
9. Logging estruturado  
10. Publicação de eventos desacoplada  

---

# 📌 Objetivo Técnico

Demonstrar:

- Modelagem adequada em **MongoDB**
- Uso de **Aggregation Pipeline**
- Autenticação moderna com **JWT**
- Autorização baseada em **roles**
- Logging estruturado
- Arquitetura preparada para **event-driven systems**
- Estrutura evolutiva inspirada em **Clean Architecture**

---

# 🚧 Próximos passos

- Integração real com **AWS SQS**
- Consumer de eventos
- Testes **E2E**
- Refactor para **Clean Architecture completa**
- Observabilidade com **CloudWatch ou Datadog**