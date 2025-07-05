# Como Testar a API - Sistema BIC

## 🚀 Início Rápido

### 1. Importe a Collection no Postman
- Abra o Postman
- Clique em "Import"
- Selecione o arquivo `Sistema_BIC_API.postman_collection.json`
- A collection será importada com todas as requisições prontas

### 2. Configure as Variáveis
- Na collection, configure as variáveis:
  - `base_url`: `http://10.200.200.187:5001/auth`
  - `token`: (será preenchido automaticamente após o login)

## 📋 Sequência de Teste Recomendada

### Passo 1: Cadastrar um Administrador
```bash
POST http://10.200.200.187:5001/auth/cadastro
```
```json
{
  "nome": "Administrador Sistema",
  "email": "admin@prefeitura.itaguai.rj.gov.br",
  "senha": "admin123",
  "papel": "admin"
}
```

### Passo 2: Fazer Login como Admin
```bash
POST http://10.200.200.187:5001/auth/login
```
```json
{
  "email": "admin@prefeitura.itaguai.rj.gov.br",
  "senha": "admin123"
}
```
**⚠️ IMPORTANTE:** Copie o `token` da resposta e cole na variável `{{token}}` do Postman

### Passo 3: Cadastrar Outros Usuários
Use o token do admin no header `Authorization: Bearer {{token}}`

**Técnico:**
```json
{
  "nome": "Maria Técnica Silva",
  "email": "maria.tecnica@prefeitura.itaguai.rj.gov.br",
  "senha": "senha123",
  "papel": "tecnico"
}
```

**Coordenador:**
```json
{
  "nome": "Carlos Coordenador Santos",
  "email": "carlos.coordenador@prefeitura.itaguai.rj.gov.br",
  "senha": "coord123",
  "papel": "coordenador"
}
```

### Passo 4: Listar Usuários
```bash
GET http://10.200.200.187:5001/auth/usuarios
Headers: Authorization: Bearer {{token}}
```

### Passo 5: Atualizar Usuário
```bash
PUT http://10.200.200.187:5001/auth/atualizar/1
Headers: Authorization: Bearer {{token}}
```
```json
{
  "nome": "João Silva Santos Atualizado",
  "email": "joao.silva.novo@prefeitura.itaguai.rj.gov.br",
  "papel": "coordenador"
}
```

### Passo 6: Deletar Usuário
```bash
DELETE http://10.200.200.187:5001/auth/deletar/1
Headers: Authorization: Bearer {{token}}
```

## 🔧 Exemplos de JSON para Cadastro

### 1. Cadastro de Técnico
```json
{
  "nome": "João Silva Santos",
  "email": "joao.silva@prefeitura.itaguai.rj.gov.br",
  "senha": "123456",
  "papel": "tecnico"
}
```

### 2. Cadastro de Coordenador
```json
{
  "nome": "Ana Paula Coordenadora",
  "email": "ana.paula@prefeitura.itaguai.rj.gov.br",
  "senha": "coord456",
  "papel": "coordenador"
}
```

### 3. Cadastro de Administrador
```json
{
  "nome": "Roberto Admin Silva",
  "email": "roberto.admin@prefeitura.itaguai.rj.gov.br",
  "senha": "admin789",
  "papel": "admin"
}
```

## 📊 Respostas Esperadas

### Sucesso no Cadastro/Login (201/200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva Santos",
    "email": "joao.silva@prefeitura.itaguai.rj.gov.br",
    "papel": "tecnico"
  }
}
```

### Lista de Usuários (200):
```json
[
  {
    "id": 1,
    "nome": "João Silva Santos",
    "email": "joao.silva@prefeitura.itaguai.rj.gov.br",
    "papel": "tecnico"
  },
  {
    "id": 2,
    "nome": "Maria Santos Costa",
    "email": "maria.santos@prefeitura.itaguai.rj.gov.br",
    "papel": "coordenador"
  }
]
```

### Erro (400/401/403):
```json
{
  "error": "Email já cadastrado"
}
```

## ⚡ Testes Rápidos via cURL

### Cadastrar usuário:
```bash
curl -X POST http://10.200.200.187:5001/auth/cadastro \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste User","email":"teste@prefeitura.itaguai.rj.gov.br","senha":"123456","papel":"tecnico"}'
```

### Fazer login:
```bash
curl -X POST http://10.200.200.187:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@prefeitura.itaguai.rj.gov.br","senha":"123456"}'
```

### Listar usuários (com token):
```bash
curl -X GET http://10.200.200.187:5001/auth/usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🐛 Troubleshooting

### Erro de CORS
Se encontrar erro de CORS, certifique-se de que:
- O backend está configurado para aceitar requisições do frontend
- Os headers estão corretos

### Token Inválido
- Verifique se o token está sendo enviado corretamente
- O token pode ter expirado (duração: 1h para login normal, 999999 para cadastro)
- Faça login novamente para obter um novo token

### Email Já Cadastrado
- Use emails únicos para cada teste
- Ou delete o usuário antes de tentar cadastrar novamente

## 📝 Notas Importantes

1. **Papéis disponíveis:** `admin`, `coordenador`, `tecnico`
2. **Apenas admins** podem listar, atualizar e deletar usuários
3. **Senhas são criptografadas** no backend com bcrypt
4. **Tokens JWT** têm expiração configurada
5. **Emails devem ser únicos** no sistema
