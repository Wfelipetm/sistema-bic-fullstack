# Exemplos de Requisições API - Sistema BIC

## Base URL
```
http://10.200.200.187:5001/auth
```

## 1. Cadastro de Usuário
**Endpoint:** `POST /cadastro`

### Headers:
```json
{
  "Content-Type": "application/json"
}
```

### Body (JSON):
```json
{
  "nome": "João Silva Santos",
  "email": "joao.silva@prefeitura.itaguai.rj.gov.br",
  "senha": "123456",
  "papel": "tecnico"
}
```

### Exemplo de Resposta (Sucesso):
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

### Exemplo de Resposta (Erro):
```json
{
  "error": "Email já cadastrado"
}
```

---

## 2. Login de Usuário
**Endpoint:** `POST /login`

### Headers:
```json
{
  "Content-Type": "application/json"
}
```

### Body (JSON):
```json
{
  "email": "joao.silva@prefeitura.itaguai.rj.gov.br",
  "senha": "123456"
}
```

### Exemplo de Resposta (Sucesso):
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

### Exemplo de Resposta (Erro):
```json
{
  "error": "Credenciais inválidas"
}
```

---

## 3. Listar Usuários (Somente Admin)
**Endpoint:** `GET /usuarios`

### Headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Body: Não necessário

### Exemplo de Resposta (Sucesso):
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
  },
  {
    "id": 3,
    "nome": "Admin Sistema",
    "email": "admin@prefeitura.itaguai.rj.gov.br",
    "papel": "admin"
  }
]
```

---

## 4. Atualizar Usuário (Somente Admin)
**Endpoint:** `PUT /atualizar/:id`

### Headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Body (JSON):
```json
{
  "nome": "João Silva Santos Atualizado",
  "email": "joao.silva.novo@prefeitura.itaguai.rj.gov.br",
  "senha": "novaSenha123",
  "papel": "coordenador"
}
```

### Exemplo de Resposta (Sucesso):
```json
{
  "id": 1,
  "nome": "João Silva Santos Atualizado",
  "email": "joao.silva.novo@prefeitura.itaguai.rj.gov.br",
  "papel": "coordenador"
}
```

---

## 5. Deletar Usuário (Somente Admin)
**Endpoint:** `DELETE /deletar/:id`

### Headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Body: Não necessário

### Exemplo de Resposta (Sucesso):
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

## Exemplos Práticos para Postman

### Sequência de Teste Recomendada:

1. **Primeiro, cadastre um usuário admin:**
```json
POST http://10.200.200.187:5001/auth/cadastro
{
  "nome": "Administrador Sistema",
  "email": "admin@prefeitura.itaguai.rj.gov.br",
  "senha": "admin123",
  "papel": "admin"
}
```

2. **Faça login com o admin:**
```json
POST http://10.200.200.187:5001/auth/login
{
  "email": "admin@prefeitura.itaguai.rj.gov.br",
  "senha": "admin123"
}
```

3. **Use o token retornado para cadastrar outros usuários:**
```json
POST http://10.200.200.187:5001/auth/cadastro
Headers: Authorization: Bearer SEU_TOKEN_AQUI
{
  "nome": "Técnico Teste",
  "email": "tecnico@prefeitura.itaguai.rj.gov.br",
  "senha": "123456",
  "papel": "tecnico"
}
```

### Papéis Disponíveis:
- `"admin"` - Administrador do sistema
- `"coordenador"` - Coordenador
- `"tecnico"` - Técnico em Edificações

### Códigos de Status HTTP:
- `200` - Sucesso (login, listar, atualizar)
- `201` - Criado (cadastro)
- `400` - Erro de validação
- `401` - Não autorizado
- `403` - Acesso negado
- `404` - Não encontrado
- `500` - Erro interno do servidor

### Dicas para Teste no Postman:

1. **Configure as variáveis de ambiente:**
   - `base_url`: `http://10.200.200.187:5001/auth`
   - `token`: Copie o token da resposta de login

2. **Use a variável token no header:**
   ```
   Authorization: Bearer {{token}}
   ```

3. **Teste a sequência completa:**
   - Cadastro → Login → Listar usuários → Atualizar → Deletar
