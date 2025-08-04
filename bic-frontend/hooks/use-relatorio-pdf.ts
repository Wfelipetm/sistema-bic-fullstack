import { jsPDF } from "jspdf";
import { logoBase64 } from "../hooks/component/brasao64Image";

export async function gerarRelatorioPDF(id: number) {
  if (!id || typeof id !== "number" || isNaN(id)) {
    console.error("ID do relatório não informado ou inválido!", id);
    alert("ID do relatório não informado ou inválido!");
    return;
  }

  // 1. Buscar dados da API
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;

  if (!token) {
    alert('Token de autenticação não encontrado. Faça login novamente.');
    window.location.href = '/login';
    return;
  }

  const response = await fetch(`${apiBaseUrl}/boletim/${id}/completo`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('bic-token');
      alert('Sessão expirada. Faça login novamente.');
      window.location.href = '/login';
      return;
    }
    throw new Error(`Erro ao buscar dados do relatório: ${response.status}`);
  }

  const data = await response.json();

  const doc = new jsPDF({ orientation: "landscape" });
  let y = 20;
  const margin = 5

  //Cabeçalho cinza
  // doc.setFillColor(0, 102, 175);
  // doc.rect(5, 5, 287, 17, "F");
  const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAD4CAYAAACdW2gvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjVBNUIyQkE2MUIyMTFGMDkyNUZDOEE3QjA2Nzc0Q0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjVBNUIyQkI2MUIyMTFGMDkyNUZDOEE3QjA2Nzc0Q0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNUE1QjJCODYxQjIxMUYwOTI1RkM4QTdCMDY3NzRDRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNUE1QjJCOTYxQjIxMUYwOTI1RkM4QTdCMDY3NzRDRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtJZNtgAADSWSURBVHja7H1LctvK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";
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", margin + 4, 6.5, 12, 14) // x, y, largura, altura
  }
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
  doc.text("Lançamento novo em:", 65, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.lancamento_novo ? new Date(data.lancamento_novo).toLocaleDateString() : "", 105, y);

  doc.setFont("helvetica", "bold");
  doc.text("Revisão em:", 146, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.revisao ? new Date(data.revisao).toLocaleDateString() : "", 168, y);
  doc.line(5, 32, 190, 32);
  y += 4;

  // LOCALIZAÇÃO
  doc.setFont("helvetica", "bold");
  doc.text("Lote:", 10, (y += 6));
  doc.text("Quadra:", 65, y);
  doc.text("Loteamento:", 120, y);
  doc.text("Distrito:", 155, y);

  doc.setFont("helvetica", "normal");
  doc.text(String(data.lote ?? ""), 20, y);
  doc.text(String(data.quadra ?? ""), 80, y);
  doc.text(String(data.loteamento ?? ""), 142, y);
  doc.text(String(data.distrito ?? ""), 170, y);
  doc.line(5, 42, 190, 42);
  y += 4;

  // ENDEREÇO + RESPONSÁVEL TRIBUTÁRIO + TELEFONE/CPF NA MESMA LINHA
  doc.setFont("helvetica", "bold");
  doc.text("Endereço:", 10, (y += 4));
  doc.setFont("helvetica", "normal");
  doc.text(String(data.endereco ?? ""), 30, y);

  doc.setFont("helvetica", "bold");
  doc.text("CEP:", 155, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.cep ?? ""), 165, y);

  doc.line(5, 49, 190, 49);
  // PROPRIETÁRIO
  doc.setFont("helvetica", "bold");
  doc.text("Prop. Compro.:", 10, (y += 7));
  doc.setFont("helvetica", "normal");
  doc.text(String(data.proprietario ?? ""), 37, y);

  doc.setFont("helvetica", "bold");
  doc.text("Tel.:", 120, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.contato ?? ""), 130, y);
  doc.line(5, 57, 190, 57);

  doc.setFont("helvetica", "bold");
  doc.text("CPF:", 155, y);
  doc.setFont("helvetica", "normal");
  doc.text(String(data.cpf ?? ""), 165, y);
  doc.line(5, 57, 190, 57);

  y += 4;

  doc.setFont("helvetica", "bold");
  doc.text("Resp. Tributário:", 10, y + 4); // Posição ajustada para caber ao lado do CEP
  doc.setFont("helvetica", "normal");
  doc.text(String(data.responsavel_tributario ?? ""), 40, y + 4); // Posição ajustada

  // Telefone e CPF do responsável tributário (em sequência, se existirem)
  let xTel = 40 + (String(data.responsavel_tributario ?? "").length * 2.5) + 8;

  if (data.responsavel_tributario_cpf) {
    doc.setFont("helvetica", "bold");
    doc.text("CPF:", xTel + 44.5, y + 4);
    doc.setFont("helvetica", "normal");
    doc.text(String(data.responsavel_tributario_cpf), xTel + 54, y + 4);
  }
  if (data.responsavel_tributario_telefone) {
    doc.setFont("helvetica", "bold");
    doc.text("Tel.:", xTel + 9.5, y + 4);
    doc.setFont("helvetica", "normal");
    doc.text(String(data.responsavel_tributario_telefone), xTel + 19.5, y + 4);
    xTel += 13 + (String(data.responsavel_tributario_telefone).length * 2.5) + 6;
  }

  doc.line(5, 65, 190, 65);
  y += 4;

  // LOGRADOURO
  doc.setFont("helvetica", "bold");
  doc.text("I - INFORMAÇÕES SOBRE O LOGRADOURO:", 60, (y += 8));
  doc.setFont("helvetica", "normal");
  doc.line(5, 72, 190, 72);
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
  doc.line(5, 82, 190, 82);
  y += 10;

  // TERRENO - EXIBIÇÃO EM COLUNAS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("II - INFORMAÇÕES SOBRE O TERRENO:", 64, y + 4);
  doc.line(5, 88, 190, 88);
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

    const startY = y + 6;
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
  doc.line(5, 128, 190, 128);

  // METRAGENS
  const formatNum = (v: any, sufixo: string) =>
    v !== undefined && v !== null && v !== "" && !isNaN(Number(v))
      ? Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + sufixo
      : "0,00" + sufixo;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("III - METRAGENS:", 85, 133);
  doc.line(5, 135, 190, 135);
  doc.setFont("helvetica", "bold");
  doc.text("Área do Terreno:", 10, (y += 7));
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
  doc.line(5, 142, 190, 142);
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
