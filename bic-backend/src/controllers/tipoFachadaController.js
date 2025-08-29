const db = require('../config/db');

const tipoFachadaController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM tipo_fachada ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { alinhada, recuada } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO tipo_fachada (alinhada, recuada) VALUES ($1, $2) RETURNING *',
                [alinhada, recuada]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { alinhada, recuada } = req.body;
        try {
            const result = await db.query(
                'UPDATE tipo_fachada SET alinhada = $1, recuada = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [alinhada, recuada, id]
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
            const result = await db.query('DELETE FROM tipo_fachada WHERE id = $1 RETURNING *', [id]);
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

module.exports = tipoFachadaController;
