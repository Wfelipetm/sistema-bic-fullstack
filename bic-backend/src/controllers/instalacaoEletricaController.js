const db = require('../config/db');

const instalacaoEletricaController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM instalacao_eletrica ORDER BY id');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        const { aparente, embutida, nao_existente } = req.body;
        try {
            const result = await db.query(
                'INSERT INTO instalacao_eletrica (aparente, embutida, nao_existente) VALUES ($1, $2, $3) RETURNING *',
                [aparente, embutida, nao_existente]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { aparente, embutida, nao_existente } = req.body;
        try {
            const result = await db.query(
                'UPDATE instalacao_eletrica SET aparente = $1, embutida = $2, nao_existente = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
                [aparente, embutida, nao_existente, id]
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
            const result = await db.query('DELETE FROM instalacao_eletrica WHERE id = $1 RETURNING *', [id]);
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

module.exports = instalacaoEletricaController;
