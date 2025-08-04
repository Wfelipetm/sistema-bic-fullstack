const db = require('../config/db');

async function listarAvaliUrbaLogradouro(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM avali_urba_logradouro');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAvaliUrbaLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM avali_urba_logradouro WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    //
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarAvaliUrbaLogradouro(req, res) {
  try {
    const alta = Boolean(req.body.alta);
    const media = Boolean(req.body.media);
    const media_baixa = Boolean(req.body.media_baixa);
    const baixa = Boolean(req.body.baixa);
    const muito_baixa = Boolean(req.body.muito_baixa);

    const { rows } = await db.query(
      'INSERT INTO avali_urba_logradouro (alta, media, media_baixa, baixa, muito_baixa) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [alta, media, media_baixa, baixa, muito_baixa]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarAvaliUrbaLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { alta, media, media_baixa, baixa, muito_baixa } = req.body;
    const { rowCount, rows } = await db.query(
      'UPDATE avali_urba_logradouro SET alta = $1, media = $2, media_baixa = $3, baixa = $4, muito_baixa = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [alta, media, media_baixa, baixa, muito_baixa, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarAvaliUrbaLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM avali_urba_logradouro WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarAvaliUrbaLogradouro,
  buscarAvaliUrbaLogradouro,
  cadastrarAvaliUrbaLogradouro,
  atualizarAvaliUrbaLogradouro,
  deletarAvaliUrbaLogradouro
};