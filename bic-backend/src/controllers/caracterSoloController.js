const db = require('../config/db');

async function listarCaracterSolo(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM caracter_solo');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarCaracterSolo(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM caracter_solo WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarCaracterSolo(req, res) {
  try {
    const { alagadico, arenoso, rochoso, normal } = req.body;
    const { rows } = await db.query(
      'INSERT INTO caracter_solo (alagadico, arenoso, rochoso, normal) VALUES ($1, $2, $3, $4) RETURNING *',
      [alagadico, arenoso, rochoso, normal]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarCaracterSolo(req, res) {
  try {
    const { id } = req.params;
    const { alagadico, arenoso, rochoso, normal } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE caracter_solo SET alagadico = $1, arenoso = $2, rochoso = $3, normal = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [alagadico, arenoso, rochoso, normal, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarCaracterSolo(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM caracter_solo WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarCaracterSolo,
  buscarCaracterSolo,
  cadastrarCaracterSolo,
  atualizarCaracterSolo,
  deletarCaracterSolo
};