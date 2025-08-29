const db = require('../config/db');

const instalacaoSanitariaController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM instalacao_sanitaria ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { mas_de_uma_interna, interna_simples, interna_completa, inexistente, externa } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO instalacao_sanitaria (mas_de_uma_interna, interna_simples, interna_completa, inexistente, externa) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [mas_de_uma_interna, interna_simples, interna_completa, inexistente, externa]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { mas_de_uma_interna, interna_simples, interna_completa, inexistente, externa } = req.body;
        try {
            const result = await db.query(
                'UPDATE instalacao_sanitaria SET mas_de_uma_interna = $1, interna_simples = $2, interna_completa = $3, inexistente = $4, externa = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
                [mas_de_uma_interna, interna_simples, interna_completa, inexistente, externa, id]
            );
            if (result.rows.length > 0) {
                res.json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'Registro não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM instalacao_sanitaria WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length > 0) {
                res.json({ message: 'Registro excluído com sucesso' });
            } else {
                res.status(404).json({ error: 'Registro não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = instalacaoSanitariaController;
