const db = require('../config/db');

async function listarCalcamento(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM calcamento');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarCalcamento(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM calcamento WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarCalcamento(req, res) {
  try {
    // Depuração: veja o que está chegando do frontend
    console.log("Body recebido no backend para calcamento:", req.body);

    const { sem_asfalto, asfaltada, novo, antigo, parte, toda, paralelo, bloco } = req.body;
    const { rows } = await db.query(
      'INSERT INTO calcamento (sem_asfalto, asfaltada, novo, antigo, parte, toda, paralelo, bloco) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [sem_asfalto, asfaltada, novo, antigo, parte, toda, paralelo, bloco]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarCalcamento(req, res) {
  try {
    const { id } = req.params;
    const { sem_asfalto, asfaltada, novo, antigo, parte, toda, paralelo, bloco } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE calcamento SET sem_asfalto = $1, asfaltada = $2, novo = $3, antigo = $4, parte = $5, toda = $6, paralelo = $7, bloco = $8, updated_at = NOW() WHERE id = $9 RETURNING *',
      [sem_asfalto, asfaltada, novo, antigo, parte, toda, paralelo, bloco, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarCalcamento(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM calcamento WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarCalcamento,
  buscarCalcamento,
  cadastrarCalcamento,
  atualizarCalcamento,
  deletarCalcamento
};