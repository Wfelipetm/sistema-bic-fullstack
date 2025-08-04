const db = require('../config/db');

// Buscar todos os boletins
async function getAll(req, res) {
    try {
        const result = await db.query('SELECT * FROM boletim');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar boletins:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Buscar boletim por ID
async function getById(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await db.query('SELECT * FROM boletim WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Boletim não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar boletim:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Criar novo boletim
async function create(req, res) {
    const {
        inscricao, lancamento_novo, revisao, lote, quadra, loteamento, distrito,
        endereco, cep, proprietario, cpf, contato, responsavel, responsavel_tributario,
        responsavel_tributario_telefone, responsavel_tributario_cpf
    } = req.body;
    let foto = null;
    if (req.file && req.file.filename) {
        foto = req.file.filename;
    }

    // Validação dos campos obrigatórios (exceto datas)
    if (!inscricao || isNaN(inscricao)) {
        return res.status(400).json({ error: "Inscrição inválida" });
    }
    if (!lote) {
        return res.status(400).json({ error: "Lote é obrigatório" });
    }
    if (!quadra) {
        return res.status(400).json({ error: "Quadra é obrigatório" });
    }
    if (!loteamento) {
        return res.status(400).json({ error: "Loteamento é obrigatório" });
    }
    if (!distrito) {
        return res.status(400).json({ error: "Distrito é obrigatório" });
    }
    if (!endereco) {
        return res.status(400).json({ error: "Endereço é obrigatório" });
    }
    if (!cep) {
        return res.status(400).json({ error: "CEP é obrigatório" });
    }
    if (!proprietario) {
        return res.status(400).json({ error: "Proprietário é obrigatório" });
    }
    if (!cpf) {
        return res.status(400).json({ error: "CPF é obrigatório" });
    }
    if (!contato) {
        return res.status(400).json({ error: "Contato é obrigatório" });
    }
    if (!responsavel) {
        return res.status(400).json({ error: "Responsável é obrigatório" });
    }
    if (!responsavel_tributario) {
        return res.status(400).json({ error: "Responsável Tributário é obrigatório" });
    }
    if (!responsavel_tributario_telefone) {
        return res.status(400).json({ error: "Telefone do Responsável Tributário é obrigatório" });
    }
    if (!responsavel_tributario_cpf) {
        return res.status(400).json({ error: "CPF do Responsável Tributário é obrigatório" });
    }

    // Permitir datas nulas ou vazias - garantir que seja null e não string
    const lancamentoProcessado =
        !lancamento_novo ||
            lancamento_novo === '' ||
            lancamento_novo === 'null' ||
            lancamento_novo === 'undefined' ||
            lancamento_novo === '00/00/0000' ||
            lancamento_novo === '0000-00-00' ||
            lancamento_novo === '00/00/000'
            ? null
            : lancamento_novo;

    const revisaoProcessada =
        !revisao ||
            revisao === '' ||
            revisao === 'null' ||
            revisao === 'undefined' ||
            revisao === '00/00/0000' ||
            revisao === '0000-00-00' ||
            revisao === '00/00/000'
            ? null
            : revisao;

    try {
        const insertQuery = `
            INSERT INTO boletim (
                inscricao, lancamento_novo, revisao, lote, quadra, loteamento, distrito,
                endereco, cep, proprietario, cpf, contato, responsavel, responsavel_tributario,
                responsavel_tributario_telefone, responsavel_tributario_cpf, foto
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
            ) RETURNING *
        `;

        const result = await db.query(insertQuery, [
            inscricao, lancamentoProcessado, revisaoProcessada, lote, quadra, loteamento, distrito,
            endereco, cep, proprietario, cpf, contato, responsavel, responsavel_tributario,
            responsavel_tributario_telefone, responsavel_tributario_cpf, foto
        ]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Inscrição já cadastrada.' });
        }
        if (error.code === '22007') {
            return res.status(400).json({ error: 'Formato de data inválido! Use o formato correto ou deixe em branco.' });
        }
        if (error.code === '22008') {
            return res.status(400).json({ error: 'Data inválida! Verifique o formato da data ou deixe o campo vazio.' });
        }

        console.error('Erro ao criar boletim:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
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
            il.pavimentacao,
            

            -- Serventias (Cômodos)
            s.sala AS serventia_sala,
            s.quarto AS serventia_quarto,
            s.copa AS serventia_copa,
            s.cozinha AS serventia_cozinha,
            s.banheiro AS serventia_banheiro,
            s.garagem AS serventia_garagem,
            s.varanda AS serventia_varanda,
            s.corredor AS serventia_corredor,
            s.area AS serventia_area,
            s.porao_habital AS serventia_porao_habital,

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
t.casa AS tipo_casa,
t.apartamento AS tipo_apartamento,
t.sala AS tipo_sala,
t.loja AS tipo_loja,
t.galpao AS tipo_galpao,
t.templo AS tipo_templo,

            -- Uso
            u.residencial,
            u.comercial,
            u.servico,
            u.industrial,
            u.religioso,

            -- Tipo construção
            tc.madeira_interna,
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
            ni.acima_nivel,

            -- info construção

            ol.observacoes AS obs_logradouro_observacoes,
            ol.logradouro_placa AS obs_logradouro_placa,

            -- Metragens
            m.area_terreno,
            m.area_testada,
            m.area_edificada

        FROM boletim b
        LEFT JOIN info_logradouro il ON il.boletim_id = b.id
        LEFT JOIN info_construcao ic ON ic.boletim_id = b.id
        LEFT JOIN info_terreno it ON it.boletim_id = b.id

        LEFT JOIN metragem m ON m.boletim_id = b.id

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
        LEFT JOIN obs_logradouro ol ON ol.id = ic.obs_logradouro_id
        WHERE b.id = $1;
        `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Boletim não encontrado' });
        }

        console.log("Retornando para o frontend:", result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar boletim completo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    getBoletimCompleto
};