const db = require('../config/db');

async function listarInfoLogradouro(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM info_logradouro');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarInfoLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM info_logradouro WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarInfoLogradouro(req, res) {
  try {
    console.log('📋 Info Logradouro recebido:', req.body);

    // Receber tanto camelCase quanto snake_case
    const {
      boletim_id,
      // snake_case (correto)
      pavimentacao,
      iluminacao_publica,
      rede_esgoto,
      rede_agua,
      coleta_lixo,
      // camelCase (vindo do frontend)
      iluminacaoPublica,
      redeEsgoto,
      redeAgua,
      coletaLixo
    } = req.body;

    // Usar snake_case ou converter do camelCase
    const dados = {
      boletim_id,
      pavimentacao,
      iluminacao_publica: iluminacao_publica || iluminacaoPublica,
      rede_esgoto: rede_esgoto || redeEsgoto,
      rede_agua: rede_agua || redeAgua,
      coleta_lixo: coleta_lixo || coletaLixo
    };

    console.log('Dados convertidos:', dados);

    const { rows } = await db.query(
      `INSERT INTO info_logradouro (
        boletim_id, pavimentacao, iluminacao_publica, rede_esgoto, rede_agua, coleta_lixo
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [dados.boletim_id, dados.pavimentacao, dados.iluminacao_publica, dados.rede_esgoto, dados.rede_agua, dados.coleta_lixo]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(400).json({ error: error.message });
  }
}

async function atualizarInfoLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { boletim_id, pavimentacao, iluminacao_publica, rede_esgoto, rede_agua, coleta_lixo } = req.body;
    const { rowCount, rows } = await db.query(
      `UPDATE info_logradouro SET
        boletim_id = $1, pavimentacao = $2, iluminacao_publica = $3, rede_esgoto = $4,
        rede_agua = $5, coleta_lixo = $6, updated_at = NOW()
      WHERE id = $7 RETURNING *`,
      [boletim_id, pavimentacao, iluminacao_publica, rede_esgoto, rede_agua, coleta_lixo, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarInfoLogradouro(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM info_logradouro WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarInfoLogradouro,
  buscarInfoLogradouro,
  cadastrarInfoLogradouro,
  atualizarInfoLogradouro,
  deletarInfoLogradouro
};