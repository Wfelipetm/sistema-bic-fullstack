const db = require('../config/db');

const pavimentacaUnidadeController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM pavimentaca_unidade ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { um_tres, quatro_sete, acima_sete, cobertura, terreo } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO pavimentaca_unidade (um_tres, quatro_sete, acima_sete, cobertura, terreo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [um_tres, quatro_sete, acima_sete, cobertura, terreo]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { um_tres, quatro_sete, acima_sete, cobertura, terreo } = req.body;
        try {
            const result = await db.query(
                'UPDATE pavimentaca_unidade SET um_tres = $1, quatro_sete = $2, acima_sete = $3, cobertura = $4, terreo = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
                [um_tres, quatro_sete, acima_sete, cobertura, terreo, id]
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
            const result = await db.query('DELETE FROM pavimentaca_unidade WHERE id = $1 RETURNING *', [id]);
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

module.exports = pavimentacaUnidadeController;
