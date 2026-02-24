# nestjs-mongo-aggregate-sample

API backend construída com **NestJS** e **MongoDB**, utilizando
**Mongoose** como ODM.

O projeto demonstra modelagem baseada em agregados (User com Orders embutido),
uso de subdocumentos, aplicação de boas práticas em APIs REST
e evolução arquitetural progressiva inspirada em Clean Architecture e DDD.

## 🧱 Stack

-   Node.js
-   NestJS
-   TypeScript
-   MongoDB
-   Mongoose

## 📦 Requisitos

-   Node.js (LTS recomendado)
-   Docker
-   Docker Compose

## 🐳 Executando o MongoDB localmente

Subir o container:

``` bash
docker compose up -d
```

Visualizar logs:

``` bash
docker compose logs -f mongodb
```

MongoDB disponível em:

    mongodb://localhost:27017

## 🚀 Executando a aplicação

Instalar dependências:

``` bash
npm install
```

Iniciar em modo desenvolvimento:

``` bash
npm run start:dev
```

Aplicação disponível em:

    http://localhost:3000

## ⚙️ Configuração

O projeto utilizará variáveis de ambiente para configuração, incluindo:

-   `MONGODB_URI`
-   `MONGODB_DB`
-   `APP_PORT`
-   `NODE_ENV`

Um arquivo `.env.example` será disponibilizado como referência.

## 📂 Evolução do Projeto

O projeto é construído de forma incremental:

1.  Base funcional com MongoDB e Mongoose
2.  Modelagem de agregados (User com Orders embutido)
3.  Endpoints REST com validação
4.  Indexação estratégica
5.  Evolução para separação de camadas e arquitetura mais robusta
6.  Implementação de autenticação, versionamento e observabilidade

## 📌 Objetivo Técnico

Demonstrar:

-   Modelagem adequada em MongoDB
-   Uso de Aggregation Pipeline
-   Estrutura organizada e evolutiva
-   Práticas alinhadas a ambientes reais de produção