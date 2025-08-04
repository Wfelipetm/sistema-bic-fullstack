const db = require('../config/db');

async function listarCobertura(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM cobertura');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarCobertura(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM cobertura WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarCobertura(req, res) {
  try {
    const { zinco, aluminio, telha, amianto, especial, sem: semCobertura, laje } = req.body;
    const { rows } = await db.query(
      'INSERT INTO cobertura (zinco, aluminio, telha, amianto, especial, sem, laje) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [zinco, aluminio, telha, amianto, especial, semCobertura, laje]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarCobertura(req, res) {
  try {
    const { id } = req.params;
    const { zinco, aluminio, telha, amianto, especial, sem: semCobertura, laje } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE cobertura SET zinco = $1, aluminio = $2, telha = $3, amianto = $4, especial = $5, sem = $6, laje = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [zinco, aluminio, telha, amianto, especial, semCobertura, laje, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarCobertura(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM cobertura WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarCobertura,
  buscarCobertura,
  cadastrarCobertura,
  atualizarCobertura,
  deletarCobertura
};