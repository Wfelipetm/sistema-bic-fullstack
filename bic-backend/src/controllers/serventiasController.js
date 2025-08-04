const db = require('../config/db');

function toInt(val) {
  const n = Number(val);
  return Number.isInteger(n) && n >= 0 ? n : 0;
}

async function listarServentias(req, res) {
  try {
    const { rows } = await db.query('SELECT * FROM serventias');
    // Transforma cada registro em objeto chave-valor (nome do cômodo: quantidade)
    const result = rows.map(row => {
      return {
        id: row.id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        serventias: {
          sala: row.sala,
          quarto: row.quarto,
          copa: row.copa,
          cozinha: row.cozinha,
          banheiro: row.banheiro,
          garagem: row.garagem,
          varanda: row.varanda,
          corredor: row.corredor,
          area: row.area,
          porao_habital: row.porao_habital
        }
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarServentias(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM serventias WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    const row = rows[0];
    res.json({
      id: row.id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      serventias: {
        sala: row.sala,
        quarto: row.quarto,
        copa: row.copa,
        cozinha: row.cozinha,
        banheiro: row.banheiro,
        garagem: row.garagem,
        varanda: row.varanda,
        corredor: row.corredor,
        area: row.area,
        porao_habital: row.porao_habital
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function cadastrarServentias(req, res) {
  try {
    // Garante que os valores enviados são inteiros (ou 0 se não enviados)
    const {
      sala = 0,
      quarto = 0,
      copa = 0,
      cozinha = 0,
      banheiro = 0,
      garagem = 0,
      varanda = 0,
      corredor = 0,
      area = 0,
      porao_habital = 0
    } = req.body;

    const { rows } = await db.query(
      'INSERT INTO serventias (sala, quarto, copa, cozinha, banheiro, garagem, varanda, corredor, area, porao_habital) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        toInt(sala),
        toInt(quarto),
        toInt(copa),
        toInt(cozinha),
        toInt(banheiro),
        toInt(garagem),
        toInt(varanda),
        toInt(corredor),
        toInt(area),
        toInt(porao_habital)
      ]
    );
    const row = rows[0];
    res.status(201).json({
      id: row.id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      serventias: {
        sala: row.sala,
        quarto: row.quarto,
        copa: row.copa,
        cozinha: row.cozinha,
        banheiro: row.banheiro,
        garagem: row.garagem,
        varanda: row.varanda,
        corredor: row.corredor,
        area: row.area,
        porao_habital: row.porao_habital
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarServentias(req, res) {
  try {
    const { id } = req.params;
    // Espera um objeto chave-valor: { serventias: { sala: 2, quarto: 3, ... } }
    const {
      serventias = {}
    } = req.body;
    const {
      sala = 0,
      quarto = 0,
      copa = 0,
      cozinha = 0,
      banheiro = 0,
      garagem = 0,
      varanda = 0,
      corredor = 0,
      area = 0,
      porao_habital = 0
    } = serventias;
    const { rowCount, rows } = await db.query(
      'UPDATE serventias SET sala = $1, quarto = $2, copa = $3, cozinha = $4, banheiro = $5, garagem = $6, varanda = $7, corredor = $8, area = $9, porao_habital = $10, updated_at = NOW() WHERE id = $11 RETURNING *',
      [
        toInt(sala),
        toInt(quarto),
        toInt(copa),
        toInt(cozinha),
        toInt(banheiro),
        toInt(garagem),
        toInt(varanda),
        toInt(corredor),
        toInt(area),
        toInt(porao_habital),
        id
      ]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    const row = rows[0];
    res.json({
      id: row.id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      serventias: {
        sala: row.sala,
        quarto: row.quarto,
        copa: row.copa,
        cozinha: row.cozinha,
        banheiro: row.banheiro,
        garagem: row.garagem,
        varanda: row.varanda,
        corredor: row.corredor,
        area: row.area,
        porao_habital: row.porao_habital
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarServentias(req, res) {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM serventias WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarServentias,
  buscarServentias,
  cadastrarServentias,
  atualizarServentias,
  deletarServentias
};