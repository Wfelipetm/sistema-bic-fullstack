const db = require('../config/db');

async function listarSituacao(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM situacao');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarSituacao(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM situacao WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarSituacao(req, res) {
  try {
    const { encravamento, vila, meio_quadra, esquina, tres_frentes, toda_quadra } = req.body;
    const { rows } = await db.query(
      'INSERT INTO situacao (encravamento, vila, meio_quadra, esquina, tres_frentes, toda_quadra) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [encravamento, vila, meio_quadra, esquina, tres_frentes, toda_quadra]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarSituacao(req, res) {
  try {
    const { id } = req.params;
    const { encravamento, vila, meio_quadra, esquina, tres_frentes, toda_quadra } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE situacao SET encravamento = $1, vila = $2, meio_quadra = $3, esquina = $4, tres_frentes = $5, toda_quadra = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [encravamento, vila, meio_quadra, esquina, tres_frentes, toda_quadra, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarSituacao(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM situacao WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarSituacao,
  buscarSituacao,
  cadastrarSituacao,
  atualizarSituacao,
  deletarSituacao
};