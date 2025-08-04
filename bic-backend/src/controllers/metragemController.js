const db = require('../config/db');

async function listarMetragem(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM metragem');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarMetragem(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM metragem WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarMetragem(req, res) {
  try {
    const { area_terreno, area_testada, area_edificada, boletim_id } = req.body;
    const { rows } = await db.query(
      'INSERT INTO metragem (area_terreno, area_testada, area_edificada, boletim_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [area_terreno, area_testada, area_edificada, boletim_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarMetragem(req, res) {
  try {
    const { id } = req.params;
    const { area_terreno, area_testada, area_edificada } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE metragem SET area_terreno = $1, area_testada = $2, area_edificada = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [area_terreno, area_testada, area_edificada, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarMetragem(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM metragem WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarMetragem,
  buscarMetragem,
  cadastrarMetragem,
  atualizarMetragem,
  deletarMetragem
};