const db = require('../config/db');

async function listarNivelamento(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM nivelamento');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarNivelamento(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM nivelamento WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarNivelamento(req, res) {
  try {
    const { abaixo_nivel, ao_nivel, acima_nivel } = req.body;
    const { rows } = await db.query(
      'INSERT INTO nivelamento (abaixo_nivel, ao_nivel, acima_nivel) VALUES ($1, $2, $3) RETURNING *',
      [abaixo_nivel, ao_nivel, acima_nivel]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarNivelamento(req, res) {
  try {
    const { id } = req.params;
    const { abaixo_nivel, ao_nivel, acima_nivel } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE nivelamento SET abaixo_nivel = $1, ao_nivel = $2, acima_nivel = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [abaixo_nivel, ao_nivel, acima_nivel, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarNivelamento(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM nivelamento WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarNivelamento,
  buscarNivelamento,
  cadastrarNivelamento,
  atualizarNivelamento,
  deletarNivelamento
};