# Automação de Gerenciamento de Backups

## 📜 Descrição

O script realiza um ciclo completo de verificação e organização de arquivos em um diretório de origem (`backupsFrom`), separando-os com base em sua data de criação. Ele gera logs detalhados de suas ações e mantém o ambiente de backup limpo e organizado.

## ✨ Funcionalidades

- Lista todos os arquivos do diretório de origem (`backupsFrom`), registrando nome, tamanho e datas.
- Gera um log (`backupsFrom.log`) com os detalhes de todos os arquivos encontrados.
- **Remove** arquivos do diretório de origem com data de criação **superior a 3 dias**.
- **Copia** arquivos com **3 dias ou menos** para o diretório de destino (`backupsTo`).
- Gera um segundo log (`backupsTo.log`) listando apenas os arquivos que foram copiados.

## 📂 Estrutura de Pastas Necessária

Para que o script funcione corretamente, crie a seguinte estrutura de pastas e coloque seus arquivos de backup de teste dentro de `backupsFrom`:

### Instalação

Nenhuma dependência externa é necessária. Basta ter o arquivo `gerenciar_backups.js` e a pasta `backupsFrom`.

```bash
node gerenciar_backups.js
```
