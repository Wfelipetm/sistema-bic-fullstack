export interface FormularioData {
  observacoes: string | number | readonly string[] | undefined
  numeroInscricao: string | number | readonly string[] | undefined
  numeroBote: string | number | readonly string[] | undefined
  numeroQuadra: string | number | readonly string[] | undefined
  nomeLogradouro: string | number | readonly string[] | undefined
  terrenoCaracteristicas: any
  terrenoNivelamento: any
  terrenoTopografia: any
  // Dados básicos
  inscricaoNumero: string
  lancamentoNovo: string // Ex: "2024-06-13T00:00:00.000Z"
  revisao: string        // Ex: "2024-06-13T00:00:00.000Z"

  // Localização
  lote: string
  quadra: string
  loteamento: string
  distrito: string
  endereco: string
  cep: string

  // Proprietário
  proprietario: string
  cpf: string
  telefone: string

  // I - Informações sobre o logradouro
  logradouro: {
    pavimentacao: boolean
    iluminacaoPublica: boolean
    redeEsgoto: boolean
    redeAgua: boolean
    coletaLixo: boolean
  }

  // II - Informações sobre o terreno
  terreno: {
    // 1- Situação
    situacao: {
      encravamento: boolean
      vila: boolean
      meio_quadra: boolean
      esquina: boolean
      tres_frentes: boolean
      toda_quadra: boolean
    }

    // 2- Características do Solo
    caracteristicasSolo: {
      alagadico: boolean
      arenoso: boolean
      rochoso: boolean
      normal: boolean
    }

    // 3- Topografia
    topografia: {
      aclive: boolean
      declive: boolean
      encosta: boolean
      horizontal: boolean
    }

    // 4- Nivelamento
    nivelamento: {
      abaixo_nivel: boolean
      ao_nivel: boolean
      acima_nivel: boolean
    }
  }

  // III - Metragens
  metragens: {
    areaTerreno: string
    testada: string
    areaEdificada: string
  }

  // IV - Informações sobre a construção
  construcao: {
    // 1- Tipo
    tipo: {
      tipo_casa: boolean
      tipo_apartamento: boolean
      tipo_sala: boolean
      tipo_loja: boolean
      tipo_galpao: boolean
      tipo_templo: boolean
    }

    // 2- Uso
    uso: {
      residencial: boolean
      comercial: boolean
      servico: boolean
      industrial: boolean
      religioso: boolean
    }

    // 3- Tipo de Construção
    tipoConstrucao: {
      madeira: boolean
      alvenaria: boolean
      metalica: boolean
      concreto: boolean
      misto: boolean
    }

    // 4- Esquadrias
    esquadrias: {
      rustica: boolean
      madeira: boolean
      ferro: boolean
      aluminio: boolean
      especial: boolean
      blindex: boolean
    }

    // 5- Piso
    piso: {
      tijolo: boolean
      cimento: boolean
      tabua: boolean
      taco: boolean
      ceramica: boolean
      especial: boolean
      porcelanato: boolean
    }

    // 6- Forro
    forro: {
      estaque: boolean
      placas: boolean
      madeira: boolean
      laje: boolean
      gesso: boolean
      especial: boolean
      sem: boolean
    }

    // 7- Cobertura
    cobertura: {
      zinco: boolean
      aluminio: boolean
      telha: boolean
      amianto: boolean
      especial: boolean
      sem: boolean
      laje: boolean
    }

    // 8- Acabamento Interno
    acabamentoInterno: {
      caiacao: boolean
      pinturaSimples: boolean
      pinturaLavavel: boolean
      especial: boolean
      reboco: boolean
      sem: boolean
    }

    // 9- Acabamento Externo
    acabamentoExterno: {
      caiacao: boolean
      pinturaSimples: boolean
      pinturaLavavel: boolean
      especial: boolean
      reboco: boolean
      sem: boolean
    }
  }

  // Serventias
  serventias: {
    serventia_sala: number
    serventia_quarto: number
    serventia_copa: number
    serventia_cozinha: number
    serventia_banheiro: number
    serventia_garagem: number
    serventia_varanda: number
    serventia_corredor: number
    serventia_area: number
    serventia_porao_habital: number // Corrija o nome para manter igual ao backend, se necessário
  }

  // Avaliação Urbanística do Logradouro
  avaliacaoUrbanistica: "alta" | "media" | "media_baixa" | "baixa" | "muito_baixa" | ""

  // Calçamento
  calcamento: {
    tipo: {
      sem_asfalto: boolean
      asfaltada: boolean
      novo: boolean
      antigo: boolean
    }
    extensao: {
      parte: boolean
      toda: boolean
      paralelo: boolean
      bloco: boolean
    }
  }

  // Logradouro com Placa
  logradouroComPlaca: boolean

  // Observações do Logradouro (ajustado para refletir a entidade do banco)
  obsLogradouro: {
    logradouro_placa: boolean
    observacoes: string
  }

  // Responsável
  responsavel?: string
  responsavel_tributario?: string // <--- Adicione esta linha

  // Técnico responsável
  tecnicoId?: string | number
}
