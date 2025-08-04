const db = require('../config/db');

async function listarForro(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM forro');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarForro(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM forro WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarForro(req, res) {
  console.log("Recebido no backend:", req.body.forro);
  try {
    const { estuque, placas, madeira, laje, gesso, especial, sem } = req.body.forro || {};
    const semForro = sem;

    const { rows } = await db.query(
      'INSERT INTO forro (estuque, placas, madeira, laje, gesso, especial, sem) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [estuque, placas, madeira, laje, gesso, especial, semForro]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarForro(req, res) {
  try {
    const { id } = req.params;
    const { estuque, placas, madeira, laje, gesso, especial, sem: semForro } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE forro SET estuque = $1, placas = $2, madeira = $3, laje = $4, gesso = $5, especial = $6, sem = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [estuque, placas, madeira, laje, gesso, especial, semForro, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarForro(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM forro WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarForro,
  buscarForro,
  cadastrarForro,
  atualizarForro,
  deletarForro
};