const db = require('../config/db');

// Lista todos os relatórios técnicos com status real
async function listarRelatorios(req, res) {
  try {
    const { rows } = await db.query(`
      SELECT 
        b.id::text,
        CONCAT('Relatório Técnico - ', b.endereco) AS titulo,
        TO_CHAR(b.created_at, 'DD/MM/YYYY') AS data,
        COALESCE(sr.status, 'PENDENTE') AS status, -- status real da tabela
        t.nome AS tecnico,
        'Residencial' AS tipo,
        '2.0 MB' AS tamanho,
        sr.observacao,
        TO_CHAR(sr.data_atualizacao, 'DD/MM/YYYY HH24:MI') as ultima_atualizacao
      FROM boletim b
      LEFT JOIN tecnicos t ON t.id = b.tecnico_id
      LEFT JOIN status_relatorios sr ON sr.id_boletim = b.id
      ORDER BY b.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Busca um relatório técnico por ID
async function buscarRelatorio(req, res) {
  try {
    const { id } = req.params;
    const { rows } = await db.query(`
      SELECT 
        b.id::text,
        CONCAT('Relatório Técnico - ', b.endereco) AS titulo,
        TO_CHAR(b.created_at, 'DD/MM/YYYY') AS data,
        'Concluído' AS status,
        t.nome AS tecnico,
        'Residencial' AS tipo,
        '2.0 MB' AS tamanho
      FROM boletim b
      LEFT JOIN tecnicos t ON t.id = b.tecnico_id
      WHERE b.id = $1
    `, [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getBoletimCompleto(req, res) {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const query = `
        SELECT 
            b.*,

            -- Info Logradouro
            il.iluminacao_publica,
            il.rede_esgoto,
            il.rede_agua,
            il.coleta_lixo,

            -- Serventias (Cômodos)
            s.sala AS serventia_sala,
            s.quarto,
            s.copa,
            s.cozinha,
            s.banheiro,
            s.garagem,
            s.varanda,
            s.corredor,
            s.area,
            s.porao_habital,

            -- Avaliação Urbana Logradouro
            aul.alta,
            aul.media,
            aul.media_baixa,
            aul.baixa,
            aul.muito_baixa,

            -- Calcamento
            c.sem_asfalto,
            c.asfaltada,
            c.novo,
            c.antigo,
            c.parte,
            c.toda,
            c.paralelo,
            c.bloco,

            -- Tipo
            t.casa,
            t.apartamento,
            t.sala AS tipo_sala,
            t.loja,
            t.galpao,
            t.templo,

            -- Uso
            u.residencial,
            u.comercial,
            u.servico,
            u.industrial,
            u.religioso,

            -- Tipo construção
            tc.madeira,
            tc.alvenaria,
            tc.metalica,
            tc.concreto,
            tc.misto,

            -- Esquadrilha
            es.rustica,
            es.madeira,
            es.ferro,
            es.aluminio,
            es.especial,
            es.blindex,

            -- Piso
            p.tijolo,
            p.cimento,
            p.tabua,
            p.taco,
            p.ceramica,
            p.especial,
            p.porcelanato,

            -- Forro
            f.estuque,
            f.placas,
            f.madeira,
            f.laje,
            f.gesso,
            f.especial,
            f.sem,

            -- Cobertura
            co.zinco,
            co.aluminio,
            co.telha,
            co.amianto,
            co.especial,
            co.sem,
            co.laje,

            -- Acabamento Interno
            ai.caiacao,
            ai.pintura_simples,
            ai.pintura_lavavel,
            ai.especial,
            ai.reboco,
            ai.sem,

            -- Acabamento Externo
            ae.caiacao AS caiacao_externo,
            ae.pintura_simples AS pintura_simples_externo,
            ae.pintura_lavavel AS pintura_lavavel_externo,
            ae.especial AS especial_externo,
            ae.reboco AS reboco_externo,
            ae.sem AS sem_externo,

            -- Situação
            si.encravamento,
            si.vila,
            si.meio_quadra,
            si.esquina,
            si.tres_frentes,
            si.toda_quadra,

            -- Caracter do solo
            cs.alagadico,
            cs.arenoso,
            cs.rochoso,
            cs.normal,

            -- Topografia
            topos.aclive,
            topos.declive,
            topos.encosta,
            topos.horizontal,

            -- Nivelamento
            ni.abaixo_nivel,
            ni.ao_nivel,
            ni.acima_nivel

        FROM boletim b
        LEFT JOIN info_logradouro il ON il.boletim_id = b.id
        LEFT JOIN info_construcao ic ON ic.boletim_id = b.id
        LEFT JOIN info_terreno it ON it.boletim_id = b.id

        LEFT JOIN serventias s ON s.id = ic.serventias_id
        LEFT JOIN avali_urba_logradouro aul ON aul.id = ic.avali_urba_logradouro_id
        LEFT JOIN calcamento c ON c.id = ic.calcamento_id
        LEFT JOIN tipo t ON t.id = ic.tipo_id
        LEFT JOIN uso u ON u.id = ic.uso_id
        LEFT JOIN tipo_construcao tc ON tc.id = ic.tipo_construcao_id
        LEFT JOIN esquadrilha es ON es.id = ic.esquadrilha_id
        LEFT JOIN piso p ON p.id = ic.piso_id
        LEFT JOIN forro f ON f.id = ic.forro_id
        LEFT JOIN cobertura co ON co.id = ic.cobertura_id
        LEFT JOIN acabamento_interno ai ON ai.id = ic.acabamento_interno_id
        LEFT JOIN acabamento_externo ae ON ae.id = ic.acabamento_externo_id
        LEFT JOIN situacao si ON si.id = it.situacao_id
        LEFT JOIN caracter_solo cs ON cs.id = it.caracter_solo_id
        LEFT JOIN topografia topos ON topos.id = it.topografia_id
        LEFT JOIN nivelamento ni ON ni.id = it.nivelamento_id
        WHERE b.id = $1;
        `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Boletim não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar boletim completo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Atualizar status do relatório
async function atualizarStatus(req, res) {
  try {
    const { id } = req.params; // id do boletim
    const { status, observacao, atualizado_por } = req.body;

    // Validações
    if (!status) {
      return res.status(400).json({ error: 'Status é obrigatório' });
    }

    const statusValidos = ['PENDENTE', 'EM ANÁLISE', 'APROVADO', 'REPROVADO'];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        error: 'Status inválido. Use: PENDENTE, EM ANÁLISE, APROVADO, REPROVADO'
      });
    }

    // Verificar se o boletim existe
    const boletimExists = await db.query('SELECT id FROM boletim WHERE id = $1', [id]);
    if (boletimExists.rows.length === 0) {
      return res.status(404).json({ error: 'Boletim não encontrado' });
    }

    // Verificar se já existe um status para este boletim
    const statusExists = await db.query('SELECT id FROM status_relatorios WHERE id_boletim = $1', [id]);

    let result;
    if (statusExists.rows.length > 0) {
      // Atualizar status existente
      result = await db.query(`
        UPDATE status_relatorios 
        SET status = $1, observacao = $2, atualizado_por = $3, data_atualizacao = CURRENT_TIMESTAMP
        WHERE id_boletim = $4
        RETURNING *
      `, [status, observacao, atualizado_por, id]);
    } else {
      // Criar novo status
      result = await db.query(`
        INSERT INTO status_relatorios (id_boletim, status, observacao, atualizado_por)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [id, status, observacao, atualizado_por]);
    }

    res.json({
      message: 'Status atualizado com sucesso',
      status: result.rows[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: error.message });
  }
}

// Buscar histórico de status de um boletim
async function buscarHistoricoStatus(req, res) {
  try {
    const { id } = req.params; // id do boletim

    const { rows } = await db.query(`
      SELECT 
        sr.*,
        t.nome as tecnico_nome,
        t.matricula as tecnico_matricula,
        TO_CHAR(sr.data_atualizacao, 'DD/MM/YYYY HH24:MI') as data_formatada
      FROM status_relatorios sr
      LEFT JOIN tecnicos t ON t.id = sr.atualizado_por
      WHERE sr.id_boletim = $1
      ORDER BY sr.data_atualizacao DESC
    `, [id]);

    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: error.message });
  }
}

// Filtrar relatórios por status
async function listarRelatoriosPorStatus(req, res) {
  try {
    const { status } = req.params;

    const statusValidos = ['PENDENTE', 'EM ANÁLISE', 'APROVADO', 'REPROVADO'];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        error: 'Status inválido. Use: PENDENTE, EM ANÁLISE, APROVADO, REPROVADO'
      });
    }

    const { rows } = await db.query(`
      SELECT 
        b.id::text,
        CONCAT('Relatório Técnico - ', b.endereco) AS titulo,
        TO_CHAR(b.created_at, 'DD/MM/YYYY') AS data,
        COALESCE(sr.status, 'PENDENTE') AS status,
        t.nome AS tecnico,
        'Residencial' AS tipo,
        '2.0 MB' AS tamanho,
        sr.observacao,
        TO_CHAR(sr.data_atualizacao, 'DD/MM/YYYY HH24:MI') as ultima_atualizacao
      FROM boletim b
      LEFT JOIN tecnicos t ON t.id = b.tecnico_id
      LEFT JOIN status_relatorios sr ON sr.id_boletim = b.id
      WHERE COALESCE(sr.status, 'PENDENTE') = $1
      ORDER BY b.created_at DESC
    `, [status]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listarRelatorios,
  buscarRelatorio,
  atualizarStatus,
  buscarHistoricoStatus,
  listarRelatoriosPorStatus,
  getBoletimCompleto
};