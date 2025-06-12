export interface FormularioData {
  // Dados básicos
  inscricaoNumero: string
  lancamentoNovo: {
    dia: string
    mes: string
    ano: string
  }
  revisao: {
    dia: string
    mes: string
    ano: string
  }

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
      encravado: boolean
      vila: boolean
      meioQuadra: boolean
      esquina: boolean
      comTresFrente: boolean
      todaQuadra: boolean
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
      abaixoNivel: boolean
      aoNivel: boolean
      acimaNivel: boolean
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
      casa: boolean
      apartamento: boolean
      sala: boolean
      loja: boolean
      galpao: boolean
      templo: boolean
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
    sala: boolean
    quarto: boolean
    copa: boolean
    cozinha: boolean
    banheiro: boolean
    garagem: boolean
    varanda: boolean
    corredor: boolean
    area: boolean
    poraoHabital: boolean
  }

  // Avaliação Urbanística do Logradouro
  avaliacaoUrbanistica: "alta" | "media" | "mediaBaixa" | "baixa" | "muitoBaixa" | ""

  // Calçamento
  calcamento: {
    tipo: {
      semAsfalto: boolean
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

  // Observações
  observacoes: string
}
