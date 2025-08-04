# Backend - Sistema BIC

Este diretório contém o backend do Sistema BIC, desenvolvido em Node.js com Express.

## Como rodar o backend

1. **Instale as dependências:**
   ```powershell
   npm install
   ```
2. **Configure o banco de dados:**
   - Edite o arquivo de configuração em `src/config/db.js` com os dados do seu banco.
   - Crie um arquivo `.env` com as variáveis necessárias (exemplo: conexão do banco, porta, etc).
3. **Inicie o servidor:**
   ```powershell
   npm start
   ```
   Ou, para desenvolvimento:
   ```powershell
   npm run dev
   ```

O backend estará rodando na porta definida no `.env` (padrão: 3001).

## Estrutura
- `src/controllers/`: Lógica das rotas e manipulação dos dados.
- `src/routes/`: Definição das rotas da API.
- `src/config/`: Configuração do banco de dados.
- `src/middleware/`: Middlewares de autenticação, upload, etc.
- `upload/`: Pasta para arquivos enviados.

## Requisitos
- Node.js
- npm
- Banco de dados configurado

---

Consulte o README principal para mais informações.
