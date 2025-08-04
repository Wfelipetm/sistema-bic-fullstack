const db = require('../config/db');

async function listarTopografia(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM topografia');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarTopografia(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM topografia WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarTopografia(req, res) {
  try {
    const { aclive, declive, encosta, horizontal } = req.body;
    const { rows } = await db.query(
      'INSERT INTO topografia (aclive, declive, encosta, horizontal) VALUES ($1, $2, $3, $4) RETURNING *',
      [aclive, declive, encosta, horizontal]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarTopografia(req, res) {
  try {
    const { id } = req.params;
    const { aclive, declive, encosta, horizontal } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE topografia SET aclive = $1, declive = $2, encosta = $3, horizontal = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [aclive, declive, encosta, horizontal, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarTopografia(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM topografia WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarTopografia,
  buscarTopografia,
  cadastrarTopografia,
  atualizarTopografia,
  deletarTopografia
};