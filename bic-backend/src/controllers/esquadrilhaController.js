const db = require('../config/db');

async function listarEsquadrilha(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM esquadrilha');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarEsquadrilha(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM esquadrilha WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarEsquadrilha(req, res) {
  try {
    const { rustica, madeira, ferro, aluminio, especial, blindex } = req.body;
    const { rows } = await db.query(
      'INSERT INTO esquadrilha (rustica, madeira, ferro, aluminio, especial, blindex) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [rustica, madeira, ferro, aluminio, especial, blindex]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarEsquadrilha(req, res) {
  try {
    const { id } = req.params;
    const { rustica, madeira, ferro, aluminio, especial, blindex } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE esquadrilha SET rustica = $1, madeira = $2, ferro = $3, aluminio = $4, especial = $5, blindex = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [rustica, madeira, ferro, aluminio, especial, blindex, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarEsquadrilha(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM esquadrilha WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarEsquadrilha,
  buscarEsquadrilha,
  cadastrarEsquadrilha,
  atualizarEsquadrilha,
  deletarEsquadrilha
};