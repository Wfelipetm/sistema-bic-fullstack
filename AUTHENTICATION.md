# Sistema de Autenticação - Sistema BIC

## Visão Geral

O Sistema BIC agora conta com um sistema de autenticação completo integrado com backend Node.js. O sistema inclui:

- **Tela de Login**: Página principal para autenticação de usuários
- **Tela de Cadastro**: Página para registro de novos usuários
- **Contexto de Autenticação**: Gerenciamento global do estado de autenticação
- **Proteção de Rotas**: Redirecionamento automático para login quando não autenticado
- **Persistência de Sessão**: Manutenção da sessão usando localStorage

## Estrutura do Sistema

### Contexto de Autenticação (`contexts/auth-context.tsx`)
- Gerencia o estado global de autenticação
- Integração com API backend
- Persistência de dados no localStorage
- Funções: login, register, logout

### Telas
- **Login** (`app/login/page.tsx`): Página de entrada do sistema
- **Cadastro** (`app/cadastro/page.tsx`): Página de registro de usuários

### Serviços
- **Auth Service** (`lib/auth-service.ts`): Centraliza chamadas para API de autenticação

### Componentes de Proteção
- **ProtectedRoute** (`components/auth/protected-route.tsx`): Protege rotas autenticadas
- **Hooks** (`hooks/use-auth-redirect.ts`): Gerencia redirecionamentos

## Funcionalidades

### Login
- Validação de credenciais via API
- Tratamento de erros
- Redirecionamento automático após login
- Persistência de token JWT

### Cadastro
- Formulário completo com validações
- Seleção de função/papel do usuário
- Confirmação de senha
- Redirecionamento automático após cadastro

### Proteção de Rotas
- Usuários não autenticados são redirecionados para `/login`
- Usuários autenticados em `/login` ou `/cadastro` são redirecionados para `/`
- Loading states durante verificação de autenticação

## API Integration

### Endpoints Utilizados
- `POST /auth/login` - Autenticação de usuário
- `POST /auth/cadastro` - Registro de novo usuário
- `GET /auth/usuarios` - Listar usuários (admin)
- `PUT /auth/atualizar/:id` - Atualizar usuário (admin)
- `DELETE /auth/deletar/:id` - Deletar usuário (admin)

### Configuração
- Base URL: `http://10.200.200.187:5001/auth`
- Autenticação: JWT Token
- Headers: Content-Type: application/json

## Fluxo de Navegação

1. **Acesso inicial**: Usuário acessa qualquer rota
2. **Verificação**: Sistema verifica se há token válido
3. **Redirecionamento**: 
   - Se não autenticado → `/login`
   - Se autenticado → Página solicitada
4. **Login/Cadastro**: Usuário se autentica
5. **Acesso liberado**: Redirecionamento para sistema principal

## Tipos de Usuário

### Papéis Disponíveis
- **tecnico**: Técnico em Edificações
- **coordenador**: Coordenador
- **admin**: Administrador

### Permissões
- Técnicos: Acesso às funcionalidades básicas
- Coordenadores: Acesso estendido
- Administradores: Acesso completo + gerenciamento de usuários

## Estados de Loading

O sistema inclui estados de loading em:
- Verificação inicial de autenticação
- Processo de login
- Processo de cadastro
- Proteção de rotas

## Persistência de Dados

### localStorage
- `bic-user`: Dados do usuário autenticado
- `bic-token`: Token JWT para autenticação

### Limpeza Automática
- Logout manual
- Erros de autenticação
- Tokens inválidos

## Segurança

- Senhas criptografadas no backend (bcrypt)
- Tokens JWT com expiração
- Validação de entrada nos formulários
- Limpeza automática de dados sensíveis
- Headers de segurança nas requisições

## Como Testar

1. Acesse o sistema
2. Será redirecionado automaticamente para `/login`
3. Use o link "Cadastre-se aqui" para criar uma conta
4. Ou faça login com credenciais existentes
5. Após autenticação, acesso liberado ao sistema principal
6. Use o botão de logout no header para sair

## Melhorias Futuras

- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Refresh token automático
- [ ] Logs de auditoria
- [ ] Tentativas de login limitadas
- [ ] Sessões múltiplas
- [ ] Notificações de segurança
