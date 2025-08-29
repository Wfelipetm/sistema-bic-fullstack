const db = require('../config/db');

const limitacaoTerrenoController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM limitacao_terreno ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { com_cerca, com_muro, sem } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO limitacao_terreno (com_cerca, com_muro, sem) VALUES ($1, $2, $3) RETURNING *',
                [com_cerca, com_muro, sem]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { com_cerca, com_muro, sem } = req.body;
        try {
            const result = await db.query(
                'UPDATE limitacao_terreno SET com_cerca = $1, com_muro = $2, sem = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
                [com_cerca, com_muro, sem, id]
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
            const result = await db.query('DELETE FROM limitacao_terreno WHERE id = $1 RETURNING *', [id]);
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

module.exports = limitacaoTerrenoController;
