import { jsPDF } from "jspdf";

export async function gerarRelatorioPDF(id: number) {
  if (!id || typeof id !== "number" || isNaN(id)) {
    console.error("ID do relatório não informado ou inválido!", id);
    alert("ID do relatório não informado ou inválido!");
    return;
  }

  // 1. Buscar dados da API
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const response = await fetch(`${apiBaseUrl}/boletim/${id}/completo`);
  const data = await response.json();

  const doc = new jsPDF({ orientation: "landscape" });
  let y = 20;

  // Cabeçalho cinza
  // doc.setFillColor(0, 102, 175);
  // doc.rect(5, 5, 287, 17, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("PREFEITURA MUNICIPAL DE ITAGUAÍ", 25, 10);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Estado do Rio de Janeiro", 25, 13);
  doc.text("Secretaria de Fazenda", 25, 16);
  doc.setFont("helvetica", "italic");
  doc.text("Subsecretaria de Arrecadação", 25, 19);
  doc.setFont("helvetica", "normal");
  doc.setDrawColor(0, 0, 0);

  doc.line(210, 15, 285, 15);
  doc.setFont("helvetica", "italic", "bold");
  doc.text("Carimbo e Assinatura do Fiscal", 230, 18);
  doc.setDrawColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("BOLETIM DE INFORMAÇÃO CADASTRAL - (BIC)", 140, y, { align: "center" });

  y += 3;
  doc.setTextColor(0, 0, 0);

  // INSCRIÇÃO / DATAS
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("INSCRIÇÃO Nº:", 10, (y += 6));
  doc.setFont("helvetica", "normal");
  doc.text(String(data.inscricao ?? ""), 38, y);

  doc.setFont("helvetica", "bold");
  doc.text("Lançamento novo em:", 55, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.lancamento_novo ? new Date(data.lancamento_novo).toLocaleDateString() : "", 95, y);

  doc.setFont("helvetica", "bold");
  doc.text("Revisão em:", 120, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.revisao ? new Date(data.revisao).toLocaleDateString() : "", 145, y);
  doc.line(5, 32, 190, 32);
  y += 4;

  // LOCALIZAÇÃO
  doc.setFont("helvetica", "bold");
  doc.text("Lote:", 10, (y += 6));
  doc.text("Quadra:", 30, y);
  doc.text("Loteamento:", 55, y);
  doc.text("Distrito:", 120, y);

  doc.setFont("helvetica", "normal");
  doc.text(String(data.lote ?? ""), 20, y);
  doc.text(String(data.quadra ?? ""), 45, y);
  doc.text(String(data.loteamento ?? ""), 80, y);
  doc.text(String(data.distrito ?? ""), 135, y);
  doc.line(5, 42, 190, 42);
  y += 4;

  // ENDEREÇO + RESPONSÁVEL TRIBUTÁRIO NA MESMA LINHA
  doc.setFont("helvetica", "bold");
  doc.text("Endereço:", 10, (y += 6));
  doc.setFont("helvetica", "normal");
  doc.text(String(data.endereco ?? ""), 30, y);

  doc.setFont("helvetica", "bold");
  doc.text("CEP:", 160, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.cep ?? ""), 170, y);

  doc.setFont("helvetica", "bold");
  doc.text("Resp. Tributário:", 86, y); // Posição ajustada para caber ao lado do CEP
  doc.setFont("helvetica", "normal");
  doc.text(String(data.responsavel_tributario ?? ""), 115, y); // Posição ajustada

  doc.line(5, 52, 190, 52);
  y += 4;

  // PROPRIETÁRIO
  doc.setFont("helvetica", "bold");
  doc.text("Proprietário (Compromissário):", 10, (y += 6));
  doc.setFont("helvetica", "normal");
  doc.text(String(data.proprietario ?? ""), 65, y);

  doc.setFont("helvetica", "bold");
  doc.text("CPF:", 120, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.cpf ?? ""), 130, y);
  doc.line(5, 62, 190, 62);
  y += 4;

  // LOGRADOURO
  doc.setFont("helvetica", "bold");
  doc.text("I - INFORMAÇÕES SOBRE O LOGRADOURO:", 60, (y += 5));
  doc.setFont("helvetica", "normal");
  doc.line(5, 70, 190, 70);
  y += 2;
  const InformacoesLogradouro = [
    [data.pavimentacao === true ? "X" : "", "1- Pavimentação"],
    [data.iluminacao_publica === true ? "X" : "", "2- Iluminação Pública"],
    [data.rede_esgoto === true ? "X" : "", "3- Rede de Esgoto"],
    [data.rede_agua === true ? "X" : "", "4- Rede de Água"],
    [data.coleta_lixo === true ? "X" : "", "5- Coleta de Lixo"],
  ];

  InformacoesLogradouro.forEach(([check, label], i) => {
    const x = 10 + i * 35;
    doc.rect(x, y + 3, 4, 4);
    doc.setFontSize(8);
    doc.text(check, x + 1, y + 6);
    doc.text(label, x + 5, y + 6);
  });
  doc.line(5, 79, 190, 79);
  y += 10;

  // TERRENO - EXIBIÇÃO EM COLUNAS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("II - INFORMAÇÕES SOBRE O TERRENO:", 64, y + 4);
  doc.line(5, 86, 190, 86);
  y += 4;
  const renderTerrenoHorizontal = () => {
    const opcoes = [
      {
        titulo: "1- Situação:",
        dados: [
          [data.encravamento === true ? "X" : "", "1- encravamento"],
          [data.vila === true ? "X" : "", "2- Vila"],
          [data.meio_quadra === true ? "X" : "", "3- Meio de Quadra"],
          [data.esquina === true ? "X" : "", "4- Esquina"],
          [data.tres_frentes === true ? "X" : "", "5- Com Três Frentes"],
          [data.toda_quadra === true ? "X" : "", "6- Toda a Quadra"],
        ],
      },
      {
        titulo: "2- Características do Solo:",
        dados: [
          [data.alagadico === true ? "X" : "", "1- Alagadiço"],
          [data.arenoso === true ? "X" : "", "2- Arenoso"],
          [data.rochoso === true ? "X" : "", "3- Rochoso"],
        ],
      },
      {
        titulo: "3- Topografia:",
        dados: [
          [data.aclive === true ? "X" : "", "1- Aclive"],
          [data.declive === true ? "X" : "", "2- Declive"],
          [data.horizontal === true ? "X" : "", "3- Horizontal"],
        ],
      },
      {
        titulo: "4- Nivelamento:",
        dados: [
          [data.abaixo_nivel === true ? "X" : "", "1- Abaixo do Nível"],
          [data.ao_nivel === true ? "X" : "", "2- Ao Nível"],
          [data.acima_nivel === true ? "X" : "", "3- Acima do Nível"],
        ],
      },
    ];

    const startY = y + 7;
    const colWidth = 45;

    opcoes.forEach((grupo, i) => {
      const x = 10 + i * colWidth;
      let offsetY = 0;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(grupo.titulo, x, startY);

      grupo.dados.forEach(([check, label], idx) => {
        const itemY = startY + 6 + idx * 5;
        doc.rect(x, itemY - 3, 4, 4);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(check, x + 1, itemY);
        doc.text(label, x + 6, itemY);
        offsetY = itemY;
      });

      if (offsetY > y) y = offsetY;
    });

    y += 10;
  };

  renderTerrenoHorizontal();
  doc.line(5, 124, 190, 124);

  // METRAGENS
  const formatNum = (v: any, sufixo: string) =>
    v !== undefined && v !== null && v !== "" && !isNaN(Number(v))
      ? Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + sufixo
      : "0,00" + sufixo;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("III - METRAGENS:", 85, 128);
  doc.line(5, 130, 190, 130);
  doc.setFont("helvetica", "bold");
  doc.text("Área do Terreno:", 10, (y += 3));
  doc.setFont("helvetica", "normal");
  doc.text(formatNum(String(data.area_terreno), " m²"), 40, y);
  doc.setFont("helvetica", "bold");
  doc.text("Testada:", 79, y);
  doc.setFont("helvetica", "normal");
  doc.text(formatNum(String(data.area_testada), " m"), 95, y);
  doc.setFont("helvetica", "bold");
  doc.text("Área Edificada:", 127, y);
  doc.setFont("helvetica", "normal");
  doc.text(formatNum(String(data.area_edificada), " m²"), 155, y);
  doc.line(5, 137, 190, 137);
  y -= 3;

  // CHAMAR AS SEÇÕES RESTANTES PARA APARECEREM NO PDF (após as declarações)

  // As funções são declaradas abaixo, então as chamadas devem ser movidas para depois das declarações

  // ...existing code...

  // ...existing code...

  // ...existing code...

  // CHAMADAS DAS SEÇÕES RESTANTES (após as declarações)
  // (Essas funções precisam ser chamadas após serem declaradas)
  // Mover para antes do return:

  opcoesServentia();
  renderInfoConstrucao();
  renderObservacoes();
  renderLogradouroComPlaca();

  return doc.output("blob");

  function opcoesServentia() {
    const opcoesServentia = [
      {
        titulo: "Serventias:",
        dados: [
          [`${data.serventia_sala ?? 0}`, "1-Sala"],
          [`${data.serventia_quarto ?? 0}`, "2-Quarto"],
          [`${data.serventia_copa ?? 0}`, "3-Copa"],
          [`${data.serventia_cozinha ?? 0}`, "4-Cozinha"],
          [`${data.serventia_banheiro ?? 0}`, "5- Banheiro"],
          [`${data.serventia_garagem ?? 0}`, "6-Garagem"],
          [`${data.serventia_varanda ?? 0}`, "7-Varanda"],
          [`${data.serventia_corredor ?? 0}`, "8-Corredor"],
          [`${data.serventia_area ?? 0}`, "9-Área"],
          [`${data.serventia_porao_habital ?? 0}`, "10-Porão Habital"],
        ],
      },
      {
        titulo: "Calçamento",
        dados: [
          [data.sem_asfalto === true ? "X" : "", "Sem Asfalto"],
          [data.asfaltada === true ? "X" : "", "Asfaltada"],
          [data.novo === true ? "X" : "", "Novo"],
          [data.antigo === true ? "X" : "", "Antigo"],
          [data.parte === true ? "X" : "", "Parte"],
          [data.toda === true ? "X" : "", "Toda"],
          [data.paralelo === true ? "X" : "", "Paralelo"],
          [data.bloco === true ? "X" : "", "Bloco"],
        ],
      },
      {
        titulo: "Avaliação Urbanística do Logradouro:",
        dados: [
          [data.alta === true ? "X" : "", "Alta"],
          [data.media === true ? "X" : "", "Média"],
          [data.media_baixa === true ? "X" : "", "Média Baixa"],
          [data.baixa === true ? "X" : "", "Baixa"],
          [data.muito_baixa === true ? "X" : "", "Muito Baixa"],
        ],
      },
    ];

    const startY = y + 10;
    const colWidth = 55;

    opcoesServentia.forEach((grupo, i) => {
      const x = 10 + i * colWidth;
      let offsetY = 0;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(grupo.titulo, x, startY);

      grupo.dados.forEach(([valor, label], idx) => {
        const itemY = startY + 5 + idx * 5;
        doc.rect(x, itemY - 3, 4, 4);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(valor, x + 1, itemY); // Mostra o número
        doc.text(label, x + 6, itemY);
        offsetY = itemY;
      });

      if (offsetY > y) y = offsetY;
    });

    y += 10;
  };

  function renderInfoConstrucao() {
    const colX = [195, 225, 258];
    let colY = [35, 35, 35];

    const grupos: GrupoConstrucao[] = [
      {
        titulo: "1- Tipo:",
        opcoes: [
          [data.tipo_casa === true ? "X" : "", "1- Casa"],
          [data.tipo_apartamento === true ? "X" : "", "2- Apartamento"],
          [data.tipo_sala === true ? "X" : "", "3- Sala"],
          [data.tipo_loja === true ? "X" : "", "4- Loja"],
          [data.tipo_galpao === true ? "X" : "", "5- Galpão"],
          [data.tipo_templo === true ? "X" : "", "6- Templo"],
        ] as [string, string][],
        espacoApos: 2,
      },
      {
        titulo: "2- Uso:",
        opcoes: [
          [data.residencial === true ? "X" : "", "1- Residencial"],
          [data.comercial === true ? "X" : "", "2- Comercial"],
          [data.servico === true ? "X" : "", "3- Serviço"],
          [data.industrial === true ? "X" : "", "4- Industrial"],
          [data.religioso === true ? "X" : "", "5- Religioso"],
        ] as [string, string][],
        espacoApos: 7,
      },
      {
        titulo: "3- Tipo de\nConstrução:",
        opcoes: [
          [data.madeira_interna === true ? "X" : "", "1- Madeira"],
          [data.alvenaria === true ? "X" : "", "2- Alvenaria"],
          [data.metalica === true ? "X" : "", "3- Metálica"],
          [data.concreto === true ? "X" : "", "4- Concreto"],
          [data.misto === true ? "X" : "", "5- Misto"],
        ] as [string, string][],
        espacoApos: 3,
      },
      {
        titulo: "4- Esquadrias:",
        opcoes: [
          [data.rustica === true ? "X" : "", "1- Rústica"],
          [data.madeira === true ? "X" : "", "2- Madeira"],
          [data.ferro === true ? "X" : "", "3- Ferro"],
          [data.aluminio === true ? "X" : "", "4- Alumínio"],
          [data.especial === true ? "X" : "", "5- Especial"],
          [data.blindex === true ? "X" : "", "6- Blindex"],
        ] as [string, string][],
        espacoApos: 7,
      },
      {
        titulo: "5- Piso:",
        opcoes: [
          [data.tijolo === true ? "X" : "", "1- Tijolo"],
          [data.cimento === true ? "X" : "", "2- Cimento"],
          [data.tabua === true ? "X" : "", "3- Tábua"],
          [data.taco === true ? "X" : "", "4- Taco"],
          [data.ceramica === true ? "X" : "", "5- Cerâmica"],
          [data.especial === true ? "X" : "", "6- Especial"],
          [data.porcelanato === true ? "X" : "", "7- Porcelanato"],
        ] as [string, string][],
        espacoApos: 2,
      },
      {
        titulo: "6- Forro:",
        opcoes: [
          [data.estuque === true ? "X" : "", "1- Estuque"],
          [data.placas === true ? "X" : "", "2- Placas"],
          [data.madeira === true ? "X" : "", "3- Madeira"],
          [data.laje === true ? "X" : "", "4- Laje"],
          [data.gesso === true ? "X" : "", "5- Gesso"],
          [data.especial === true ? "X" : "", "6- Especial"],
          [data.sem === true ? "X" : "", "7- Sem"],
        ] as [string, string][],
        espacoApos: 2,
      },
      {
        titulo: "7- Cobertura:",
        opcoes: [
          [data.zinco === true ? "X" : "", "1- Zinco"],
          [data.aluminio === true ? "X" : "", "2- Alumínio"],
          [data.telha === true ? "X" : "", "3- Telha"],
          [data.amianto === true ? "X" : "", "4- Amianto"],
          [data.especial === true ? "X" : "", "5- Especial"],
          [data.sem === true ? "X" : "", "6- Sem"],
          [data.laje === true ? "X" : "", "7- Laje"],
        ] as [string, string][],
        espacoApos: 4,
      },
      {
        titulo: "8- Acabamento\nInterno:",
        opcoes: [
          [data.caiacao === true ? "X" : "", "1- Caiação"],
          [data.pintura_simples === true ? "X" : "", "2- Pintura Simples"],
          [data.pintura_lavavel === true ? "X" : "", "3- Pintura Lavável"],
          [data.especial === true ? "X" : "", "4- Especial"],
          [data.reboco === true ? "X" : "", "5- Reboco"],
          [data.sem === true ? "X" : "", "6- Sem"],
        ] as [string, string][],
        espacoApos: 4,
      },
      {
        titulo: "9- Acabamento\nExterno:",
        opcoes: [
          [data.caiacao_externo === true ? "X" : "", "1- Caiação"],
          [data.pintura_simples_externo === true ? "X" : "", "2- Pintura Simples"],
          [data.pintura_lavavel_externo === true ? "X" : "", "3- Pintura Lavável"],
          [data.especial_externo === true ? "X" : "", "4- Especial"],
          [data.reboco_externo === true ? "X" : "", "5- Reboco"],
          [data.sem_externo === true ? "X" : "", "6- Sem"],
        ] as [string, string][],
        espacoApos: 4,
      },
    ];

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("IV - INFORMAÇÕES SOBRE A CONSTRUÇÃO", 200, 30);

    // Define a ordem por coluna: 1-4-7, 2-5-8, 3-6-9
    const colunas = [
      [grupos[0], grupos[3], grupos[6]],
      [grupos[1], grupos[4], grupos[7]],
      [grupos[2], grupos[5], grupos[8]],
    ];

    interface GrupoConstrucao {
      titulo: string;
      opcoes: [string, string][];
      espacoApos?: number;
    }

    const renderGrupo = (
      grupo: GrupoConstrucao,
      x: number,
      yStart: number
    ): number => {
      let y = yStart;

      const linhasTitulo: string[] = grupo.titulo.split("\n");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      linhasTitulo.forEach((linha: string) => {
        doc.text(linha, x, y);
        y += 4;
      });

      y += 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      grupo.opcoes.forEach(([check, texto]) => {
        doc.rect(x, y - 3.5, 4, 4);
        doc.text(check, x + 1, y - 0.5);
        doc.text(texto, x + 6, y);
        y += 5;
      });

      y += grupo.espacoApos || 3;

      return y;
    };

    for (let i = 0; i < colunas.length; i++) {
      colunas[i].forEach((grupo) => {
        colY[i] = renderGrupo(grupo, colX[i], colY[i]);
      });
    }

    y = Math.max(...colY);
  };

  doc.setDrawColor(0, 0, 0);
  doc.rect(5, 24, 185, 180);
  doc.setDrawColor(0, 0, 0);
  doc.rect(190, 24, 102, 180);

  function renderObservacoes() {
    const startX = 195;
    let startY = y - 3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Observações:", startX, startY);

    startY += 8; // Espaço maior após o título
    const largura = 93;
    const alturaLinha = 5;
    const linhas = 6;

    doc.setDrawColor(0);
    doc.rect(startX, startY, largura, linhas * alturaLinha);

    // Ajuste: cada linha do texto fica exatamente sobre cada linha do quadro
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const obs = String(data.obs_logradouro_observacoes ?? "");
    const obsLines = doc.splitTextToSize(obs, largura - 4);

    // Escreve cada linha exatamente sobre cada linha do quadro
    for (let i = 0; i < linhas; i++) {
      const lineText = obsLines[i] || "";
      doc.text(lineText, startX + 2, startY + alturaLinha * i + 4);
    }

    // Desenha as linhas internas
    for (let i = 1; i < linhas; i++) {
      doc.line(startX, startY + i * alturaLinha, startX + largura, startY + i * alturaLinha);
    }

    y = startY + linhas * alturaLinha + 5;
  };

  function renderLogradouroComPlaca() {
    const x = 195;
    const yBox = y + 0.5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Logradouro com Placa?", x, yBox);

    doc.setFont("helvetica", "normal");
    doc.rect(x + 38, yBox - 3.5, 4, 4);

    // Adicione o "X" se for true:
    if (data.obs_logradouro_placa === true) {
      doc.setFont("helvetica", "bold");
      doc.text("X", x + 39, yBox);
    }

    y += 10;
  };

  // Removido bloco de debug e chamadas inválidas
  return doc.output("blob");
}
