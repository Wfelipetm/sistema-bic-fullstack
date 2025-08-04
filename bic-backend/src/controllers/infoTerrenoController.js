const db = require('../config/db');

async function listarInfoTerreno(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM info_terreno');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarInfoTerreno(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM info_terreno WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarInfoTerreno(req, res) {
  try {
    const { boletim_id, situacao_id, caracter_solo_id, topografia_id, nivelamento_id, metragem_id } = req.body;
    const { rows } = await db.query(
      `INSERT INTO info_terreno (boletim_id, situacao_id, caracter_solo_id, topografia_id, nivelamento_id, metragem_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [boletim_id, situacao_id, caracter_solo_id, topografia_id, nivelamento_id, metragem_id]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarInfoTerreno(req, res) {
  try {
    const { id } = req.params;
    const { boletim_id, situacao_id, caracter_solo_id, topografia_id, nivelamento_id, metragem_id } = req.body;
    const { rowCount, rows } = await db.query(
      `UPDATE info_terreno SET
        boletim_id = $1, situacao_id = $2, caracter_solo_id = $3, topografia_id = $4,
        nivelamento_id = $5, metragem_id = $6, updated_at = NOW()
      WHERE id = $7 RETURNING *`,
      [boletim_id, situacao_id, caracter_solo_id, topografia_id, nivelamento_id, metragem_id, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarInfoTerreno(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM info_terreno WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarInfoTerreno,
  buscarInfoTerreno,
  cadastrarInfoTerreno,
  atualizarInfoTerreno,
  deletarInfoTerreno
};