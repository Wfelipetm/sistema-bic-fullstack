const db = require('../config/db');

const pedologiaTerrenoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM pedologia_terreno ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { aluminio, especial, ferro, madeira, rustica, sem } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO pedologia_terreno (aluminio, especial, ferro, madeira, rustica, sem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [aluminio, especial, ferro, madeira, rustica, sem]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { aluminio, especial, ferro, madeira, rustica, sem } = req.body;
        try {
            const result = await db.query(
                'UPDATE pedologia_terreno SET aluminio = $1, especial = $2, ferro = $3, madeira = $4, rustica = $5, sem = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
                [aluminio, especial, ferro, madeira, rustica, sem, id]
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
            const result = await db.query('DELETE FROM pedologia_terreno WHERE id = $1 RETURNING *', [id]);
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

module.exports = pedologiaTerrenoController;
