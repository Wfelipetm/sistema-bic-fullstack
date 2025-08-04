const db = require('../config/db');

async function listarUso(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM uso');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarUso(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM uso WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarUso(req, res) {
  try {
    const { residencial, comercial, servico, industrial, religioso } = req.body;
    const { rows } = await db.query(
      'INSERT INTO uso (residencial, comercial, servico, industrial, religioso) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [residencial, comercial, servico, industrial, religioso]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarUso(req, res) {
  try {
    const { id } = req.params;
    const { residencial, comercial, servico, industrial, religioso } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE uso SET residencial = $1, comercial = $2, servico = $3, industrial = $4, religioso = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [residencial, comercial, servico, industrial, religioso, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarUso(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM uso WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarUso,
  buscarUso,
  cadastrarUso,
  atualizarUso,
  deletarUso
};