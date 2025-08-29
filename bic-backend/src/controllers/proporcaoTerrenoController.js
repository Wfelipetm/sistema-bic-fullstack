const db = require('../config/db');

const proporcaoTerrenoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM proporcao_terreno ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { area_ocupada, fracao_ideal } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO proporcao_terreno (area_ocupada, fracao_ideal) VALUES ($1, $2) RETURNING *',
                [area_ocupada, fracao_ideal]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { area_ocupada, fracao_ideal } = req.body;
        try {
            const result = await db.query(
                'UPDATE proporcao_terreno SET area_ocupada = $1, fracao_ideal = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [area_ocupada, fracao_ideal, id]
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
            const result = await db.query('DELETE FROM proporcao_terreno WHERE id = $1 RETURNING *', [id]);
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

module.exports = proporcaoTerrenoController;
