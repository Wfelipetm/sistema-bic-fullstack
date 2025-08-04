const db = require('../config/db');

async function listarTipo(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM tipo');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarTipo(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM tipo WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarTipo(req, res) {
  try {
    console.log('📋 Tipo recebido:', req.body);

    const { casa, apartamento, sala, loja, galpao, templo } = req.body;
    const { rows } = await db.query(
      'INSERT INTO tipo (casa, apartamento, sala, loja, galpao, templo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [casa, apartamento, sala, loja, galpao, templo]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao cadastrar tipo:', error.message);
    res.status(400).json({ error: error.message });
  }
}

async function atualizarTipo(req, res) {
  try {
    const { id } = req.params;
    const { casa, apartamento, sala, loja, galpao, templo } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE tipo SET casa = $1, apartamento = $2, sala = $3, loja = $4, galpao = $5, templo = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [casa, apartamento, sala, loja, galpao, templo, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarTipo(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM tipo WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarTipo,
  buscarTipo,
  cadastrarTipo,
  atualizarTipo,
  deletarTipo
};