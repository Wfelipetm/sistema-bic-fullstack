const db = require('../config/db');

const conservacaoEdificacaoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM conservacao_edificacao ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { mau, bom, nova_otima, regular } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO conservacao_edificacao (mau, bom, nova_otima, regular) VALUES ($1, $2, $3, $4) RETURNING *',
                [mau, bom, nova_otima, regular]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { mau, bom, nova_otima, regular } = req.body;
        try {
            const result = await db.query(
                'UPDATE conservacao_edificacao SET mau = $1, bom = $2, nova_otima = $3, regular = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
                [mau, bom, nova_otima, regular, id]
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
            const result = await db.query('DELETE FROM conservacao_edificacao WHERE id = $1 RETURNING *', [id]);
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

module.exports = conservacaoEdificacaoController;
