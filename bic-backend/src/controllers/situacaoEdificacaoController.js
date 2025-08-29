const db = require('../config/db');

const situacaoEdificacaoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM situacao_edificacao ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { frente, fundos } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO situacao_edificacao (frente, fundos) VALUES ($1, $2) RETURNING *',
                [frente, fundos]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { frente, fundos } = req.body;
        try {
            const result = await db.query(
                'UPDATE situacao_edificacao SET frente = $1, fundos = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [frente, fundos, id]
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
            const result = await db.query('DELETE FROM situacao_edificacao WHERE id = $1 RETURNING *', [id]);
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

module.exports = situacaoEdificacaoController;
