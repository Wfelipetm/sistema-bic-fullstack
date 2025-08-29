const db = require('../config/db');

const situacaoUnidadeController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM situacao_unidade ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { fechado_abandonado, ocupado, vago } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO situacao_unidade (fechado_abandonado, ocupado, vago) VALUES ($1, $2, $3) RETURNING *',
                [fechado_abandonado, ocupado, vago]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { fechado_abandonado, ocupado, vago } = req.body;
        try {
            const result = await db.query(
                'UPDATE situacao_unidade SET fechado_abandonado = $1, ocupado = $2, vago = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
                [fechado_abandonado, ocupado, vago, id]
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
            const result = await db.query('DELETE FROM situacao_unidade WHERE id = $1 RETURNING *', [id]);
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

module.exports = situacaoUnidadeController;
