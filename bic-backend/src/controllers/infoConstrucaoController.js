const db = require('../config/db');

async function listarInfoConstrucao(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM info_construcao');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarInfoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM info_construcao WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarInfoConstrucao(req, res) {
  try {
    const {
      boletim_id, serventias_id, avali_urba_logradouro_id, calcamento_id, obs_logradouro_id,
      tipo_id, uso_id, tipo_construcao_id, esquadrilha_id, piso_id, forro_id, cobertura_id,
      acabamento_interno_id, acabamento_externo_id
    } = req.body;
    const { rows } = await db.query(
      `INSERT INTO info_construcao (
        boletim_id, serventias_id, avali_urba_logradouro_id, calcamento_id, obs_logradouro_id,
        tipo_id, uso_id, tipo_construcao_id, esquadrilha_id, piso_id, forro_id, cobertura_id,
        acabamento_interno_id, acabamento_externo_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [
        boletim_id, serventias_id, avali_urba_logradouro_id, calcamento_id, obs_logradouro_id,
        tipo_id, uso_id, tipo_construcao_id, esquadrilha_id, piso_id, forro_id, cobertura_id,
        acabamento_interno_id, acabamento_externo_id
      ]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarInfoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const {
      boletim_id, serventias_id, avali_urba_logradouro_id, calcamento_id, obs_logradouro_id,
      tipo_id, uso_id, tipo_construcao_id, esquadrilha_id, piso_id, forro_id, cobertura_id,
      acabamento_interno_id, acabamento_externo_id
    } = req.body;
    const { rowCount, rows } = await db.query(
      `UPDATE info_construcao SET
        boletim_id = $1, serventias_id = $2, avali_urba_logradouro_id = $3, calcamento_id = $4,
        obs_logradouro_id = $5, tipo_id = $6, uso_id = $7, tipo_construcao_id = $8, esquadrilha_id = $9,
        piso_id = $10, forro_id = $11, cobertura_id = $12, acabamento_interno_id = $13, acabamento_externo_id = $14,
        updated_at = NOW()
      WHERE id = $15 RETURNING *`,
      [
        boletim_id, serventias_id, avali_urba_logradouro_id, calcamento_id, obs_logradouro_id,
        tipo_id, uso_id, tipo_construcao_id, esquadrilha_id, piso_id, forro_id, cobertura_id,
        acabamento_interno_id, acabamento_externo_id, id
      ]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarInfoConstrucao(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM info_construcao WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarInfoConstrucao,
  buscarInfoConstrucao,
  cadastrarInfoConstrucao,
  atualizarInfoConstrucao,
  deletarInfoConstrucao
};