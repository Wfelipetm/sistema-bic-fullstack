const db = require('../config/db');

async function listarObsLogradouro(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM obs_logradouro');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarObsLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM obs_logradouro WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarObsLogradouro(req, res) {
  try {
    const { logradouro_placa, observacoes } = req.body;
    const { rows } = await db.query(
      'INSERT INTO obs_logradouro (logradouro_placa, observacoes) VALUES ($1, $2) RETURNING *',
      [logradouro_placa, observacoes]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarObsLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { logradouro_placa, observacoes } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE obs_logradouro SET logradouro_placa = $1, observacoes = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [logradouro_placa, observacoes, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarObsLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM obs_logradouro WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarObsLogradouro,
  buscarObsLogradouro,
  cadastrarObsLogradouro,
  atualizarObsLogradouro,
  deletarObsLogradouro
};