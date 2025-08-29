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

            -- Ocupação do Terreno
            ot.territorial,
            ot.predial,

            -- Limitação do Terreno
            lt.com_cerca,
            lt.com_muro,
            lt.sem AS limitacao_sem,

            -- Proporção do Terreno
            pt.area_ocupada,
            pt.fracao_ideal,

            -- Pedologia do Terreno
            pet.aluminio AS pedologia_aluminio,
            pet.especial AS pedologia_especial,
            pet.ferro AS pedologia_ferro,
            pet.madeira AS pedologia_madeira,
            pet.rustica AS pedologia_rustica,
            pet.sem AS pedologia_sem,

            -- Conservação da Edificação
            ce.mau,
            ce.bom,
            ce.nova_otima,
            ce.regular,

            -- Tipo de Fachada
            tf.alinhada,
            tf.recuada,

            -- Tipo de Forro
            tfo.especial AS tipo_forro_especial,
            tfo.estuque AS tipo_forro_estuque,
            tfo.gesso AS tipo_forro_gesso,
            tfo.laje AS tipo_forro_laje,
            tfo.madeira AS tipo_forro_madeira,
            tfo.placa AS tipo_forro_placa,
            tfo.sem_forro,

            -- Instalação Elétrica
            ie.aparente,
            ie.embutida,
            ie.nao_existente,

            -- Instalação Sanitária
            isa.mas_de_uma_interna,
            isa.interna_simples,
            isa.interna_completa,
            isa.inexistente,
            isa.externa,

            -- Situação da Edificação
            se.frente,
            se.fundos,

            -- Pavimentação da Unidade
            pu.um_tres,
            pu.quatro_sete,
            pu.acima_sete,
            pu.cobertura,
            pu.terreo,

            -- Posição da Unidade
            pou.superposta,
            pou.isolada,
            pou.geminada,
            pou.conjugada,

            -- Situação da Unidade
            su.fechado_abandonado,
            su.ocupado,
            su.vago,

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
        LEFT JOIN ocupacao_terreno ot ON ot.id = it.ocupacao_terreno_id
        LEFT JOIN limitacao_terreno lt ON lt.id = it.limitacao_terreno_id
        LEFT JOIN proporcao_terreno pt ON pt.id = it.proporcao_terreno_id
        LEFT JOIN pedologia_terreno pet ON pet.id = it.pedologia_terreno_id
        LEFT JOIN conservacao_edificacao ce ON ce.id = ic.conservacao_edificacao_id
        LEFT JOIN tipo_fachada tf ON tf.id = ic.tipo_fachada_id
        LEFT JOIN tipo_forro tfo ON tfo.id = ic.tipo_forro_id
        LEFT JOIN instalacao_eletrica ie ON ie.id = ic.instalacao_eletrica_id
        LEFT JOIN instalacao_sanitaria isa ON isa.id = ic.instalacao_sanitaria_id
        LEFT JOIN situacao_edificacao se ON se.id = ic.situacao_edificacao_id
        LEFT JOIN pavimentaca_unidade pu ON pu.id = ic.pavimentaca_unidade_id
        LEFT JOIN posicao_unidade pou ON pou.id = ic.posicao_unidade_id
        LEFT JOIN situacao_unidade su ON su.id = ic.situacao_unidade_id
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

async function exportBoletimCompletoCSV(req, res) {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        // Função para remover acentos e caracteres especiais
        const removeAcentos = (texto) => {
            return texto
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9\s]/g, '');
        };

        // Função para formatar data
        const formatDate = (dateString) => {
            if (!dateString) return 'Em_branco';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '_');
        };

        // Função auxiliar para formatar valores
        const formatValue = (value) => {
            if (value === null || value === undefined || value === '') return 'Em_branco';
            if (typeof value === 'boolean') return value ? 'Sim' : 'Nao';
            if (typeof value === 'string') return removeAcentos(value);
            return value;
        };

        // Função para criar seção da tabela
        const createSection = (title, data) => {
            let section = `\n${title}\n`;
            section += 'Campo,Valor\n';
            Object.entries(data).forEach(([key, value]) => {
                let formattedValue;
                if (key.includes('_at') || key.includes('lancamento') || key.includes('revisao')) {
                    formattedValue = formatDate(value);
                } else {
                    formattedValue = formatValue(value);
                }
                section += `${key},"${formattedValue}"\n`;
            });
            return section;
        };        // Usando a mesma query do getBoletimCompleto
        const query = `
        SELECT 
            b.*,
            il.iluminacao_publica, il.rede_esgoto, il.rede_agua, il.coleta_lixo, il.pavimentacao,
            s.sala AS serventia_sala, s.quarto AS serventia_quarto, s.copa AS serventia_copa,
            s.cozinha AS serventia_cozinha, s.banheiro AS serventia_banheiro, s.garagem AS serventia_garagem,
            s.varanda AS serventia_varanda, s.corredor AS serventia_corredor, s.area AS serventia_area,
            s.porao_habital AS serventia_porao_habital,
            aul.alta, aul.media, aul.media_baixa, aul.baixa, aul.muito_baixa,
            c.sem_asfalto, c.asfaltada, c.novo, c.antigo, c.parte, c.toda, c.paralelo, c.bloco,
            t.casa AS tipo_casa, t.apartamento AS tipo_apartamento, t.sala AS tipo_sala,
            t.loja AS tipo_loja, t.galpao AS tipo_galpao, t.templo AS tipo_templo,
            u.residencial, u.comercial, u.servico, u.industrial, u.religioso,
            tc.madeira_interna, tc.alvenaria, tc.metalica, tc.concreto, tc.misto,
            es.rustica, es.madeira, es.ferro, es.aluminio, es.especial, es.blindex,
            p.tijolo, p.cimento, p.tabua, p.taco, p.ceramica, p.especial, p.porcelanato,
            f.estuque, f.placas, f.madeira, f.laje, f.gesso, f.especial, f.sem,
            co.zinco, co.aluminio, co.telha, co.amianto, co.especial, co.sem, co.laje,
            ai.caiacao, ai.pintura_simples, ai.pintura_lavavel, ai.especial, ai.reboco, ai.sem,
            ae.caiacao AS caiacao_externo, ae.pintura_simples AS pintura_simples_externo,
            ae.pintura_lavavel AS pintura_lavavel_externo, ae.especial AS especial_externo,
            ae.reboco AS reboco_externo, ae.sem AS sem_externo,
            si.encravamento, si.vila, si.meio_quadra, si.esquina, si.tres_frentes, si.toda_quadra,
            cs.alagadico, cs.arenoso, cs.rochoso, cs.normal,
            topos.aclive, topos.declive, topos.encosta, topos.horizontal,
            ni.abaixo_nivel, ni.ao_nivel, ni.acima_nivel,
            ot.territorial, ot.predial,
            lt.com_cerca, lt.com_muro, lt.sem AS limitacao_sem,
            pt.area_ocupada, pt.fracao_ideal,
            pet.aluminio AS pedologia_aluminio, pet.especial AS pedologia_especial,
            pet.ferro AS pedologia_ferro, pet.madeira AS pedologia_madeira,
            pet.rustica AS pedologia_rustica, pet.sem AS pedologia_sem,
            ce.mau, ce.bom, ce.nova_otima, ce.regular,
            tf.alinhada, tf.recuada,
            tfo.especial AS tipo_forro_especial, tfo.estuque AS tipo_forro_estuque,
            tfo.gesso AS tipo_forro_gesso, tfo.laje AS tipo_forro_laje,
            tfo.madeira AS tipo_forro_madeira, tfo.placa AS tipo_forro_placa, tfo.sem_forro,
            ie.aparente, ie.embutida, ie.nao_existente,
            isa.mas_de_uma_interna, isa.interna_simples, isa.interna_completa, isa.inexistente, isa.externa,
            se.frente, se.fundos,
            pu.um_tres, pu.quatro_sete, pu.acima_sete, pu.cobertura, pu.terreo,
            pou.superposta, pou.isolada, pou.geminada, pou.conjugada,
            su.fechado_abandonado, su.ocupado, su.vago,
            ol.observacoes AS obs_logradouro_observacoes, ol.logradouro_placa AS obs_logradouro_placa,
            m.area_terreno, m.area_testada, m.area_edificada
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
        LEFT JOIN ocupacao_terreno ot ON ot.id = it.ocupacao_terreno_id
        LEFT JOIN limitacao_terreno lt ON lt.id = it.limitacao_terreno_id
        LEFT JOIN proporcao_terreno pt ON pt.id = it.proporcao_terreno_id
        LEFT JOIN pedologia_terreno pet ON pet.id = it.pedologia_terreno_id
        LEFT JOIN conservacao_edificacao ce ON ce.id = ic.conservacao_edificacao_id
        LEFT JOIN tipo_fachada tf ON tf.id = ic.tipo_fachada_id
        LEFT JOIN tipo_forro tfo ON tfo.id = ic.tipo_forro_id
        LEFT JOIN instalacao_eletrica ie ON ie.id = ic.instalacao_eletrica_id
        LEFT JOIN instalacao_sanitaria isa ON isa.id = ic.instalacao_sanitaria_id
        LEFT JOIN situacao_edificacao se ON se.id = ic.situacao_edificacao_id
        LEFT JOIN pavimentaca_unidade pu ON pu.id = ic.pavimentaca_unidade_id
        LEFT JOIN posicao_unidade pou ON pou.id = ic.posicao_unidade_id
        LEFT JOIN situacao_unidade su ON su.id = ic.situacao_unidade_id
        LEFT JOIN obs_logradouro ol ON ol.id = ic.obs_logradouro_id
        WHERE b.id = $1;
        `;

        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Boletim não encontrado' });
        }

        const data = result.rows[0];
        let csvContent = 'BOLETIM DE INFORMACOES CADASTRAIS\n';

        // Dados básicos do boletim
        const boletimBasico = {
            id: data.id,
            inscricao: data.inscricao,
            lancamento_novo: data.lancamento_novo,
            revisao: data.revisao,
            lote: data.lote,
            quadra: data.quadra,
            loteamento: data.loteamento,
            distrito: data.distrito,
            endereco: data.endereco,
            cep: data.cep,
            proprietario: data.proprietario,
            cpf: data.cpf,
            contato: data.contato,
            responsavel: data.responsavel,
            responsavel_tributario: data.responsavel_tributario,
            responsavel_tributario_telefone: data.responsavel_tributario_telefone,
            responsavel_tributario_cpf: data.responsavel_tributario_cpf,
            foto: data.foto,
            created_at: data.created_at,
            updated_at: data.updated_at
        };

        // Informações do Logradouro
        const infoLogradouro = {
            iluminacao_publica: data.iluminacao_publica,
            rede_esgoto: data.rede_esgoto,
            rede_agua: data.rede_agua,
            coleta_lixo: data.coleta_lixo,
            pavimentacao: data.pavimentacao,
            observacoes: data.obs_logradouro_observacoes,
            logradouro_placa: data.obs_logradouro_placa
        };

        // Serventias (Cômodos)
        const serventias = {
            sala: data.serventia_sala,
            quarto: data.serventia_quarto,
            copa: data.serventia_copa,
            cozinha: data.serventia_cozinha,
            banheiro: data.serventia_banheiro,
            garagem: data.serventia_garagem,
            varanda: data.serventia_varanda,
            corredor: data.serventia_corredor,
            area: data.serventia_area,
            porao_habital: data.serventia_porao_habital
        };

        // Avaliação Urbana
        const avaliacaoUrbana = {
            alta: data.alta,
            media: data.media,
            media_baixa: data.media_baixa,
            baixa: data.baixa,
            muito_baixa: data.muito_baixa
        };

        // Calçamento
        const calcamento = {
            sem_asfalto: data.sem_asfalto,
            asfaltada: data.asfaltada,
            novo: data.novo,
            antigo: data.antigo,
            parte: data.parte,
            toda: data.toda,
            paralelo: data.paralelo,
            bloco: data.bloco
        };

        // Tipo de Construção
        const tipoConstrucao = {
            casa: data.tipo_casa,
            apartamento: data.tipo_apartamento,
            sala: data.tipo_sala,
            loja: data.tipo_loja,
            galpao: data.tipo_galpao,
            templo: data.tipo_templo
        };

        // Uso
        const uso = {
            residencial: data.residencial,
            comercial: data.comercial,
            servico: data.servico,
            industrial: data.industrial,
            religioso: data.religioso
        };

        // Material de Construção
        const materialConstrucao = {
            madeira_interna: data.madeira_interna,
            alvenaria: data.alvenaria,
            metalica: data.metalica,
            concreto: data.concreto,
            misto: data.misto
        };

        // Esquadrias
        const esquadrias = {
            rustica: data.rustica,
            madeira: data.madeira,
            ferro: data.ferro,
            aluminio: data.aluminio,
            especial: data.especial,
            blindex: data.blindex
        };

        // Piso
        const piso = {
            tijolo: data.tijolo,
            cimento: data.cimento,
            tabua: data.tabua,
            taco: data.taco,
            ceramica: data.ceramica,
            especial: data.especial,
            porcelanato: data.porcelanato
        };

        // Forro
        const forro = {
            estuque: data.estuque,
            placas: data.placas,
            madeira: data.madeira,
            laje: data.laje,
            gesso: data.gesso,
            especial: data.especial,
            sem: data.sem
        };

        // Cobertura
        const cobertura = {
            zinco: data.zinco,
            telha: data.telha,
            amianto: data.amianto,
            especial: data.especial,
            laje: data.laje
        };

        // Acabamento Interno
        const acabamentoInterno = {
            caiacao: data.caiacao,
            pintura_simples: data.pintura_simples,
            pintura_lavavel: data.pintura_lavavel,
            especial: data.especial,
            reboco: data.reboco,
            sem: data.sem
        };

        // Acabamento Externo
        const acabamentoExterno = {
            caiacao: data.caiacao_externo,
            pintura_simples: data.pintura_simples_externo,
            pintura_lavavel: data.pintura_lavavel_externo,
            especial: data.especial_externo,
            reboco: data.reboco_externo,
            sem: data.sem_externo
        };

        // Situação do Terreno
        const situacaoTerreno = {
            encravamento: data.encravamento,
            vila: data.vila,
            meio_quadra: data.meio_quadra,
            esquina: data.esquina,
            tres_frentes: data.tres_frentes,
            toda_quadra: data.toda_quadra
        };

        // Características do Solo
        const caracteristicasSolo = {
            alagadico: data.alagadico,
            arenoso: data.arenoso,
            rochoso: data.rochoso,
            normal: data.normal
        };

        // Topografia
        const topografia = {
            aclive: data.aclive,
            declive: data.declive,
            encosta: data.encosta,
            horizontal: data.horizontal
        };

        // Nivelamento
        const nivelamento = {
            abaixo_nivel: data.abaixo_nivel,
            ao_nivel: data.ao_nivel,
            acima_nivel: data.acima_nivel
        };

        // Ocupação do Terreno
        const ocupacaoTerreno = {
            territorial: data.territorial,
            predial: data.predial
        };

        // Limitação do Terreno
        const limitacaoTerreno = {
            com_cerca: data.com_cerca,
            com_muro: data.com_muro,
            sem: data.limitacao_sem
        };

        // Proporção do Terreno
        const proporcaoTerreno = {
            area_ocupada: data.area_ocupada,
            fracao_ideal: data.fracao_ideal
        };

        // Pedologia do Terreno
        const pedologiaTerreno = {
            aluminio: data.pedologia_aluminio,
            especial: data.pedologia_especial,
            ferro: data.pedologia_ferro,
            madeira: data.pedologia_madeira,
            rustica: data.pedologia_rustica,
            sem: data.pedologia_sem
        };

        // Estado de Conservação
        const estadoConservacao = {
            mau: data.mau,
            bom: data.bom,
            nova_otima: data.nova_otima,
            regular: data.regular
        };

        // Fachada
        const fachada = {
            alinhada: data.alinhada,
            recuada: data.recuada
        };

        // Tipo de Forro
        const tipoForro = {
            especial: data.tipo_forro_especial,
            estuque: data.tipo_forro_estuque,
            gesso: data.tipo_forro_gesso,
            laje: data.tipo_forro_laje,
            madeira: data.tipo_forro_madeira,
            placa: data.tipo_forro_placa,
            sem_forro: data.sem_forro
        };

        // Instalação Elétrica
        const instalacaoEletrica = {
            aparente: data.aparente,
            embutida: data.embutida,
            nao_existente: data.nao_existente
        };

        // Instalação Sanitária
        const instalacaoSanitaria = {
            mas_de_uma_interna: data.mas_de_uma_interna,
            interna_simples: data.interna_simples,
            interna_completa: data.interna_completa,
            inexistente: data.inexistente,
            externa: data.externa
        };

        // Situação da Edificação
        const situacaoEdificacao = {
            frente: data.frente,
            fundos: data.fundos
        };

        // Pavimentação da Unidade
        const pavimentacaoUnidade = {
            um_tres: data.um_tres,
            quatro_sete: data.quatro_sete,
            acima_sete: data.acima_sete,
            cobertura: data.cobertura,
            terreo: data.terreo
        };

        // Posição da Unidade
        const posicaoUnidade = {
            superposta: data.superposta,
            isolada: data.isolada,
            geminada: data.geminada,
            conjugada: data.conjugada
        };

        // Situação da Unidade
        const situacaoUnidade = {
            fechado_abandonado: data.fechado_abandonado,
            ocupado: data.ocupado,
            vago: data.vago
        };

        // Metragem
        const metragem = {
            area_terreno: data.area_terreno,
            area_testada: data.area_testada,
            area_edificada: data.area_edificada
        };

        // Montando o CSV com as seções
        csvContent += createSection('1. DADOS BASICOS DO BOLETIM', boletimBasico);
        csvContent += createSection('2. INFORMACOES DO LOGRADOURO', infoLogradouro);
        csvContent += createSection('3. SERVENTIAS (COMODOS)', serventias);
        csvContent += createSection('4. AVALIACAO URBANA', avaliacaoUrbana);
        csvContent += createSection('5. CALCAMENTO', calcamento);
        csvContent += createSection('6. TIPO DE CONSTRUCAO', tipoConstrucao);
        csvContent += createSection('7. USO', uso);
        csvContent += createSection('8. MATERIAL DE CONSTRUCAO', materialConstrucao);
        csvContent += createSection('9. ESQUADRIAS', esquadrias);
        csvContent += createSection('10. PISO', piso);
        csvContent += createSection('11. FORRO', forro);
        csvContent += createSection('12. COBERTURA', cobertura);
        csvContent += createSection('13. ACABAMENTO INTERNO', acabamentoInterno);
        csvContent += createSection('14. ACABAMENTO EXTERNO', acabamentoExterno);
        csvContent += createSection('15. SITUACAO DO TERRENO', situacaoTerreno);
        csvContent += createSection('16. CARACTERISTICAS DO SOLO', caracteristicasSolo);
        csvContent += createSection('17. TOPOGRAFIA', topografia);
        csvContent += createSection('18. NIVELAMENTO', nivelamento);
        csvContent += createSection('19. OCUPACAO DO TERRENO', ocupacaoTerreno);
        csvContent += createSection('20. LIMITACAO DO TERRENO', limitacaoTerreno);
        csvContent += createSection('21. PROPORCAO DO TERRENO', proporcaoTerreno);
        csvContent += createSection('22. PEDOLOGIA DO TERRENO', pedologiaTerreno);
        csvContent += createSection('23. ESTADO DE CONSERVACAO', estadoConservacao);
        csvContent += createSection('24. FACHADA', fachada);
        csvContent += createSection('25. TIPO DE FORRO', tipoForro);
        csvContent += createSection('26. INSTALACAO ELETRICA', instalacaoEletrica);
        csvContent += createSection('27. INSTALACAO SANITARIA', instalacaoSanitaria);
        csvContent += createSection('28. SITUACAO DA EDIFICACAO', situacaoEdificacao);
        csvContent += createSection('29. PAVIMENTACAO DA UNIDADE', pavimentacaoUnidade);
        csvContent += createSection('30. POSICAO DA UNIDADE', posicaoUnidade);
        csvContent += createSection('31. SITUACAO DA UNIDADE', situacaoUnidade);
        csvContent += createSection('32. METRAGEM', metragem);        // Configurar headers da resposta
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=boletim_${id}.csv`);

        // Enviar CSV
        res.send(csvContent);

    } catch (error) {
        console.error('Erro ao exportar boletim para CSV:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    getBoletimCompleto,
    exportBoletimCompletoCSV
};