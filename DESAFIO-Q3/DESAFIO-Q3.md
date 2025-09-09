# DESAFIO: TERCEIRA QUESTÃO - Automação de Ambientes Operacionais

## Deploy de Aplicação Node.js e React na Acme Co.

### Problema

A _Acme Co._ possui um processo de deploy para seu software (backend em **Node.js** e frontend em **React**) que é totalmente manual, lento e suscetível a falhas.  
A cada nova versão, a equipe precisa empacotar manualmente os componentes e realizar o deploy em **homologação**. Após cerca de uma semana, repete-se o mesmo processo em **produção**.

Esse método consome tempo, introduz riscos de erros humanos e carece de padronização e rastreabilidade, dificultando a resolução de problemas.

### Causa

O problema está na **ausência de automação do processo de CI/CD (Integração Contínua e Entrega Contínua)**, resultando em:

- **Ineficiência:** processo manual, repetitivo e demorado.
- **Risco de erros humanos:** empacotamento e configuração feitos manualmente.
- **Inconsistência entre ambientes:** diferenças na configuração entre homologação e produção.
- **Lentidão na entrega:** novas funcionalidades e correções demoram a chegar ao cliente.

### Solução

Implementar um **pipeline de CI/CD** para automatizar o ciclo de vida da aplicação, desde o commit até o deploy em produção, garantindo padronização, rastreabilidade e consistência.

#### Ferramentas Propostas

- **Controle de Versão:** Git (GitLab, GitHub ou Bitbucket).
- **Servidor de CI/CD:** GitLab CI/CD, GitHub Actions ou Jenkins.
- **Gerenciador de Pacotes:** NPM ou Yarn.
- **Containerização:** Docker (imagens imutáveis e consistentes).
- **Orquestração:** Kubernetes (ou Docker Swarm para menor escala).
- **Repositório de Imagens:** Docker Hub, GitLab Registry ou GitHub Packages.

#### Etapas do Pipeline

1. **Commit e Pull/Merge Request**

   - O desenvolvedor envia o código para o repositório.
   - A abertura de um PR/MR dispara o pipeline de CI.

2. **Integração Contínua (CI)**

   - **Build:** `npm install` + `npm run build` (backend e frontend).
   - **Testes:** unitários e de integração.
   - **Análise de Código:** ESLint, SonarQube etc.
   - **Build da Imagem Docker:** criação das imagens do frontend e backend e envio ao repositório de imagens.

3. **Deploy em Homologação (CD)**

   - **Automático:** após merge no branch principal.
   - O CI/CD atualiza o cluster de homologação com as novas imagens.

4. **Deploy em Produção (CD)**
   - **Gatilho Manual:** executado apenas após validação em homologação.
   - **Estratégia de Deploy:**
     - **Blue-Green:** troca sem downtime.
     - **Canary:** liberação gradual.
   - **Monitoramento:** acompanhamento pós-deploy e rollback em caso de falhas.

---
