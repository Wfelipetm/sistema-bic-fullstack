import type { FormularioData } from "@/app/types/formulario"

export const formularioInicial: FormularioData = {
    // Dados básicos
    inscricaoNumero: "",
    lancamentoNovo: "",
    revisao: "",

    // Localização
    lote: "",
    quadra: "",
    loteamento: "",
    distrito: "",
    endereco: "",
    cep: "",

    // Proprietário
    proprietario: "",
    cpf: "",
    telefone: "",

    // Responsável
    responsavel: "",

    // Responsável Tributário
    responsavel_tributario: "",
    responsavel_tributario_telefone: "",
    responsavel_tributario_cpf: "",

    // Foto do boletim
    foto: null,
    fotoPreview: "",

    logradouro: {
        pavimentacao: false,
        iluminacaoPublica: false,
        redeEsgoto: false,
        redeAgua: false,
        coletaLixo: false,
    }, terreno: {
        situacao: {
            encravamento: false,
            vila: false,
            meio_quadra: false,
            esquina: false,
            tres_frentes: false,
            toda_quadra: false,
        },
        caracteristicasSolo: {
            alagadico: false,
            arenoso: false,
            rochoso: false,
            normal: false,
        },
        topografia: {
            aclive: false,
            declive: false,
            encosta: false,
            horizontal: false,
        },
        nivelamento: {
            abaixo_nivel: false,
            ao_nivel: false,
            acima_nivel: false,
        },
    },

    metragens: {
        areaTerreno: "",
        testada: "",
        areaEdificada: "",
    },

    construcao: {
        // 1- Tipo
        tipo: {
            tipo_casa: false,
            tipo_apartamento: false,
            tipo_sala: false,
            tipo_loja: false,
            tipo_galpao: false,
            tipo_templo: false,
        },
        uso: {
            residencial: false,
            comercial: false,
            servico: false,
            industrial: false,
            religioso: false,
        },
        tipoConstrucao: {
            madeira_interna: false,
            alvenaria: false,
            metalica: false,
            concreto: false,
            misto: false,
        },
        esquadrias: {
            rustica: false,
            madeira: false,
            ferro: false,
            aluminio: false,
            especial: false,
            blindex: false,
        },
        piso: {
            tijolo: false,
            cimento: false,
            tabua: false,
            taco: false,
            ceramica: false,
            especial: false,
            porcelanato: false,
        },
        forro: {
            estuque: false,
            placas: false,
            madeira: false,
            laje: false,
            gesso: false,
            especial: false,
            sem: false,
        },
        cobertura: {
            zinco: false,
            aluminio: false,
            telha: false,
            amianto: false,
            especial: false,
            sem: false,
            laje: false,
        },
        acabamentoInterno: {
            caiacao: false,
            pintura_simples: false,
            pintura_lavavel: false,
            especial: false,
            reboco: false,
            sem: false,
        },
        acabamentoExterno: {
            caiacao: false,
            pintura_simples: false,
            pintura_lavavel: false,
            especial: false,
            reboco: false,
            sem: false,
        },
    }, serventias: {
        serventia_sala: 0,
        serventia_quarto: 0,
        serventia_copa: 0,
        serventia_cozinha: 0,
        serventia_banheiro: 0,
        serventia_garagem: 0,
        serventia_varanda: 0,
        serventia_corredor: 0,
        serventia_area: 0,
        serventia_porao_habital: 0,
    },
    avaliacaoUrbanistica: "alta", calcamento: {
        tipo: {
            sem_asfalto: false,
            asfaltada: false,
            novo: false,
            antigo: false,
        },
        extensao: {
            parte: false,
            toda: false,
            paralelo: false,
            bloco: false,
        },
    }, logradouroComPlaca: false,
    obsLogradouro: {
        logradouro_placa: false,
        observacoes: "",
    },

    // Técnico responsável (opcional)
    tecnicoId: undefined
}
