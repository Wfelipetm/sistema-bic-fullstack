const db = require('../config/db');

async function listarAcabamentoInterno(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM acabamento_interno');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAcabamentoInterno(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM acabamento_interno WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarAcabamentoInterno(req, res) {
  console.log("Recebido no backend para acabamento_interno:", req.body.acabamentoInterno);

  try {
    // Use snake_case para os campos
    const {
      caiacao,
      pintura_simples,
      pintura_lavavel,
      especial,
      reboco,
      sem
    } = req.body.acabamentoInterno || {};

    const result = await db.query(
      'INSERT INTO acabamento_interno (caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarAcabamentoInterno(req, res) {
  try {
    const { id } = req.params;
    const { caiacao, pintura_simples, pintura_lavavel, especial, reboco, sem: semAcabamento } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE acabamento_interno SET caiacao = $1, pintura_simples = $2, pintura_lavavel = $3, especial = $4, reboco = $5, sem = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [caiacao, pintura_simples, pintura_lavavel, especial, reboco, semAcabamento, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarAcabamentoInterno(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM acabamento_interno WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarAcabamentoInterno,
  buscarAcabamentoInterno,
  cadastrarAcabamentoInterno,
  atualizarAcabamentoInterno,
  deletarAcabamentoInterno
};