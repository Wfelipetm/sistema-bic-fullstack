const db = require('../config/db');

async function listarAcabamentoExterno(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM acabamento_externo');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAcabamentoExterno(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM acabamento_externo WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarAcabamentoExterno(req, res) {
  console.log("Recebido no backend para acabamento_externo:", req.body.acabamentoExterno);
  try {
    // Pegando os campos de req.body.acabamentoExterno
    const {
      caiacao,
      pintura_simples,
      pintura_lavavel,
      especial,
      reboco,
      sem
    } = req.body.acabamentoExterno || {};

    const { rows } = await db.query(
      'INSERT INTO acabamento_externo (caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarAcabamentoExterno(req, res) {
  try {
    const { id } = req.params;
    const { caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem: semAcabamento } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE acabamento_externo SET caiacao = $1, pintura_simples = $2, pintura_lavavel = $3, especial = $4, reboco = $5, sem = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [caiacao, pintura_simples, pintura_lavavel, especial, reboco, semAcabamento, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarAcabamentoExterno(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM acabamento_externo WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarAcabamentoExterno,
  buscarAcabamentoExterno,
  cadastrarAcabamentoExterno,
  atualizarAcabamentoExterno,
  deletarAcabamentoExterno
};