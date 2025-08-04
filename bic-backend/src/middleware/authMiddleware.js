const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

function criarToken(usuarioId, papel) {
    return jwt.sign({ id: usuarioId, papel }, process.env.SECRET_KEY, { expiresIn: '8h' });
}

function validarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    // Verificar se o header existe
    if (!authHeader) {
        return res.status(401).json({
            error: 'Token de autorização não fornecido',
            message: 'É necessário incluir o token de autorização no header da requisição'
        });
    }

    // Validar formato do header (deve ser "Bearer <token>")
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Formato de autorização inválido',
            message: 'O header de autorização deve estar no formato: Bearer <token>'
        });
    }

    const token = authHeader.split(' ')[1];

    // Verificar se o token existe após "Bearer "
    if (!token) {
        return res.status(401).json({
            error: 'Token não encontrado',
            message: 'Token não foi fornecido após "Bearer" no header de autorização'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = { id: payload.id, papel: payload.papel };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expirado',
                message: 'Seu token de acesso expirou. Faça login novamente.'
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Token inválido',
                message: 'O token fornecido é inválido ou malformado.'
            });
        }
        return res.status(401).json({
            error: 'Erro de autenticação',
            message: 'Falha na validação do token de acesso.'
        });
    }
}

function autorizarPapel(papeisPermitidos) {
    return (req, res, next) => {
        const { papel } = req.usuario;
        if (!papeisPermitidos.includes(papel)) {
            return res.status(403).json({
                error: 'Acesso negado',
                message: `Seu perfil de usuário (${papel}) não tem permissão para acessar este recurso.`,
                papeisNecessarios: papeisPermitidos
            });
        }
        next();
    };
}

module.exports = { criarToken, validarToken, autorizarPapel };
