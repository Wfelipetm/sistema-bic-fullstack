const db = require('../config/db');

async function listarTipoConstrucao(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM tipo_construcao');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarTipoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM tipo_construcao WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarTipoConstrucao(req, res) {
  try {
    // Depuração: veja o que está chegando do frontend
    console.log("Body recebido no backend para tipo_construcao:", req.body);

    const { madeira_interna, alvenaria, metalica, concreto, misto } = req.body;
    const { rows } = await db.query(
      'INSERT INTO tipo_construcao (madeira_interna, alvenaria, metalica, concreto, misto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [madeira_interna, alvenaria, metalica, concreto, misto]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarTipoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const { madeira_interna, alvenaria, metalica, concreto, misto } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE tipo_construcao SET madeira_interna = $1, alvenaria = $2, metalica = $3, concreto = $4, misto = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [madeira_interna, alvenaria, metalica, concreto, misto, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarTipoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM tipo_construcao WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarTipoConstrucao,
  buscarTipoConstrucao,
  cadastrarTipoConstrucao,
  atualizarTipoConstrucao,
  deletarTipoConstrucao
};