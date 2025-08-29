const db = require('../config/db');

const posicaoUnidadeController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM posicao_unidade ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { superposta, isolada, geminada, conjugada } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO posicao_unidade (superposta, isolada, geminada, conjugada) VALUES ($1, $2, $3, $4) RETURNING *',
                [superposta, isolada, geminada, conjugada]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { superposta, isolada, geminada, conjugada } = req.body;
        try {
            const result = await db.query(
                'UPDATE posicao_unidade SET superposta = $1, isolada = $2, geminada = $3, conjugada = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
                [superposta, isolada, geminada, conjugada, id]
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
            const result = await db.query('DELETE FROM posicao_unidade WHERE id = $1 RETURNING *', [id]);
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

module.exports = posicaoUnidadeController;
