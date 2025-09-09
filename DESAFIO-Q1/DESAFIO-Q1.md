# API de Benchmarks e Controles

Esta é uma API backend desenvolvida em Node.js, Express e TypeScript para gerenciar benchmarks, seus controles e o histórico de estados de cada controle. A interação com o banco de dados é gerenciada pelo ORM Prisma, utilizando SQLite para simplicidade e portabilidade.

## Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para construção da API
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Prisma** - ORM para interação com o banco de dados
- **SQLite** - Banco de dados SQL embutido em um único arquivo

## Funcionalidades

A API expõe endpoints para consultar o estado de benchmarks e controles de três maneiras:

1.  **Estado Atual:** Lista todos os benchmarks com o último estado registrado de cada controle.
2.  **Histórico em Intervalo:** Lista o histórico de mudanças de estado dentro de um período específico.
3.  **Estado em Data Específica:** Mostra qual era o estado de cada controle em um ponto exato no tempo.

## Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- NPM ou Yarn

### 1. Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-seu-repositorio>
cd <nome-do-repositorio>
npm install
```

### 2. Cria o banco e as tabelas

```bash
npx prisma migrate dev --name init
```

#### 3. Popula o banco com dados de teste e iniciar o server

```bash
npx prisma db seed

npm run dev
```
