const db = require('../config/db');

async function listarPiso(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM piso');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarPiso(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM piso WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarPiso(req, res) {
  try {
    const { tijolo, cimento, tabua, taco, ceramica, especial, porcelanato } = req.body;
    const { rows } = await db.query(
      'INSERT INTO piso (tijolo, cimento, tabua, taco, ceramica, especial, porcelanato) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [tijolo, cimento, tabua, taco, ceramica, especial, porcelanato]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarPiso(req, res) {
  try {
    const { id } = req.params;
    const { tijolo, cimento, tabua, taco, ceramica, especial, porcelanato } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE piso SET tijolo = $1, cimento = $2, tabua = $3, taco = $4, ceramica = $5, especial = $6, porcelanato = $7, updated_at = NOW() WHERE id = $8 RETURNING *',
      [tijolo, cimento, tabua, taco, ceramica, especial, porcelanato, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarPiso(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM piso WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarPiso,
  buscarPiso,
  cadastrarPiso,
  atualizarPiso,
  deletarPiso
};