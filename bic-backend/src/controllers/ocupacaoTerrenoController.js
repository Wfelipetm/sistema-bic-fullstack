const db = require('../config/db');

const ocupacaoTerrenoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM ocupacao_terreno ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { territorial, predial } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO ocupacao_terreno (territorial, predial) VALUES ($1, $2) RETURNING *',
                [territorial, predial]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { territorial, predial } = req.body;
        try {
            const result = await db.query(
                'UPDATE ocupacao_terreno SET territorial = $1, predial = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [territorial, predial, id]
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
            const result = await db.query('DELETE FROM ocupacao_terreno WHERE id = $1 RETURNING *', [id]);
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

module.exports = ocupacaoTerrenoController;
