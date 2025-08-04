const db = require('../config/db');

// Buscar todos os técnicos
async function getAll(req, res) {
    try {
        const result = await db.query('SELECT * FROM tecnicos ORDER BY nome');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar técnicos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Buscar técnico por ID
async function getById(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await db.query('SELECT * FROM tecnicos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar técnico:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Criar novo técnico
async function create(req, res) {
    const { nome, email, matricula } = req.body;

    // Validações
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({ error: "Email é obrigatório" });
    }

    if (!matricula || matricula.trim() === '') {
        return res.status(400).json({ error: "Matrícula é obrigatória" });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email inválido" });
    }

    try {
        const insertQuery = `
            INSERT INTO tecnicos (nome, email, matricula)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await db.query(insertQuery, [nome.trim(), email.trim(), matricula.trim()]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar técnico:', error);

        // Tratamento de erros específicos
        if (error.code === '23505') { // Unique constraint violation
            if (error.constraint === 'tecnicos_email_key') {
                return res.status(400).json({ error: 'Este email já está cadastrado' });
            }
            if (error.constraint === 'tecnicos_matricula_key') {
                return res.status(400).json({ error: 'Esta matrícula já está cadastrada' });
            }
        }

        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Atualizar técnico
async function update(req, res) {
    const { id } = req.params;
    const { nome, email, matricula } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    // Validações
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({ error: "Email é obrigatório" });
    }

    if (!matricula || matricula.trim() === '') {
        return res.status(400).json({ error: "Matrícula é obrigatória" });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email inválido" });
    }

    try {
        const updateQuery = `
            UPDATE tecnicos 
            SET nome = $1, email = $2, matricula = $3, updated_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *
        `;
        const result = await db.query(updateQuery, [nome.trim(), email.trim(), matricula.trim(), id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao atualizar técnico:', error);

        // Tratamento de erros específicos
        if (error.code === '23505') { // Unique constraint violation
            if (error.constraint === 'tecnicos_email_key') {
                return res.status(400).json({ error: 'Este email já está cadastrado' });
            }
            if (error.constraint === 'tecnicos_matricula_key') {
                return res.status(400).json({ error: 'Esta matrícula já está cadastrada' });
            }
        }

        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Deletar técnico
async function deleteById(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        // Verificar se o técnico existe e se tem boletins associados
        const checkQuery = `
            SELECT t.*, COUNT(b.id) as boletins_count
            FROM tecnicos t
            LEFT JOIN boletim b ON b.tecnico_id = t.id
            WHERE t.id = $1
            GROUP BY t.id, t.nome, t.email, t.matricula, t.created_at, t.updated_at
        `;
        const checkResult = await db.query(checkQuery, [id]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Técnico não encontrado' });
        }

        const tecnico = checkResult.rows[0];

        if (parseInt(tecnico.boletins_count) > 0) {
            return res.status(400).json({
                error: `Não é possível excluir o técnico. Existem ${tecnico.boletins_count} boletim(s) associado(s) a este técnico.`
            });
        }

        const deleteQuery = 'DELETE FROM tecnicos WHERE id = $1 RETURNING *';
        const result = await db.query(deleteQuery, [id]);

        res.json({
            message: 'Técnico excluído com sucesso',
            tecnico: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao deletar técnico:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Buscar boletins de um técnico
async function getBoletinsByTecnico(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const query = `
            SELECT b.*, t.nome as tecnico_nome, t.email as tecnico_email, t.matricula as tecnico_matricula
            FROM boletim b
            INNER JOIN tecnicos t ON t.id = b.tecnico_id
            WHERE b.tecnico_id = $1
            ORDER BY b.created_at DESC
        `;
        const result = await db.query(query, [id]);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar boletins do técnico:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getBoletinsByTecnico
};
