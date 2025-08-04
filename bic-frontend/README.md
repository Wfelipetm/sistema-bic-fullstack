# Frontend - Sistema BIC

Este diretório contém o frontend do Sistema BIC, desenvolvido com Next.js e Tailwind CSS.

## Como rodar o frontend

1. **Instale as dependências:**
   ```powershell
   npm install
   ```
   Ou, se estiver usando pnpm:
   ```powershell
   pnpm install
   ```
2. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` com as variáveis necessárias (exemplo: URL da API backend).
3. **Inicie o servidor de desenvolvimento:**
   ```powershell
   npm run dev
   ```
   Ou:
   ```powershell
   pnpm dev
   ```

O frontend estará rodando em `http://localhost:3000` por padrão.

## Estrutura
- `app/`: Páginas e layout principal.
- `components/`: Componentes reutilizáveis.
- `contexts/`: Contextos globais (ex: autenticação).
- `hooks/`: Hooks customizados.
- `lib/`: Serviços de API e utilidades.
- `public/`: Imagens e arquivos estáticos.
- `styles/`: Arquivos de estilo.

## Requisitos
- Node.js
- npm ou pnpm

---

Consulte o README principal para mais informações.
