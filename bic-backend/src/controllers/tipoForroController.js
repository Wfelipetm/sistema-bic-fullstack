const db = require('../config/db');

const tipoForroController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM tipo_forro ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { especial, estuque, gesso, laje, madeira, placa, sem_forro } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO tipo_forro (especial, estuque, gesso, laje, madeira, placa, sem_forro) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [especial, estuque, gesso, laje, madeira, placa, sem_forro]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { especial, estuque, gesso, laje, madeira, placa, sem_forro } = req.body;
        try {
            const result = await db.query(
                'UPDATE tipo_forro SET especial = $1, estuque = $2, gesso = $3, laje = $4, madeira = $5, placa = $6, sem_forro = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
                [especial, estuque, gesso, laje, madeira, placa, sem_forro, id]
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
            const result = await db.query('DELETE FROM tipo_forro WHERE id = $1 RETURNING *', [id]);
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

module.exports = tipoForroController;
