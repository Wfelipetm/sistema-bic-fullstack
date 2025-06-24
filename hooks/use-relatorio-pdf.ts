import { jsPDF } from "jspdf";

export function gerarRelatorioPDF() {
  const doc = new jsPDF({ orientation: "landscape" });
  let y = 20;

  // Cabeçalho cinza
  doc.setFillColor(240, 240, 240);
  doc.rect(5, 5, 287, 17, "F");

  doc.setFontSize(10);
  doc.setFont(undefined, "bold");
  doc.text("PREFEITURA MUNICIPAL DE ITAGUAÍ", 25, 10);
  doc.setFontSize(7);
  doc.setFont(undefined, "normal");
  doc.text("Estado do Rio de Janeiro", 25, 13);
  doc.text("Secretaria de Fazenda", 25, 16);
  doc.setFont(undefined, "italic");
  doc.text("Subsecretaria de Arrecadação", 25, 19);
  doc.setFont(undefined, "normal");

  doc.line(210, 15, 285, 15);
  doc.setFont(undefined, "italic");
  doc.text("Carimbo e Assinatura do Fiscal", 230, 18);

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("BOLETIM DE INFORMAÇÃO CADASTRAL - (BIC)", 148, y, { align: "center" });

  y += 3;
  // doc.setFillColor(136, 143, 150);
  // doc.rect(5, y, 287, 183, "F");

  // INSCRIÇÃO / DATAS
  doc.setFontSize(10);
  doc.setFont(undefined, "bold");
  doc.text("INSCRIÇÃO Nº:", 10, (y += 6));
  doc.setFont(undefined, "normal");
  doc.text("12345", 38, y);

  doc.setFont(undefined, "bold");
  doc.text("Lançamento novo em:", 55, y);
  doc.setFont(undefined, "normal");
  doc.text("15/01/2024", 95, y);

  doc.setFont(undefined, "bold");
  doc.text("Revisão em:", 120, y);
  doc.setFont(undefined, "normal");
  doc.text("15/01/2024", 145, y);
  doc.line(5, 32, 190, 32);
  y += 4;

  // LOCALIZAÇÃO
  doc.setFont(undefined, "bold");
  doc.text("Lote:", 10, (y += 6));
  doc.text("Quadra:", 30, y);
  doc.text("Loteamento:", 55, y);
  doc.text("Distrito:", 120, y);

  doc.setFont(undefined, "normal");
  doc.text("001", 20, y);
  doc.text("A", 45, y);
  doc.text("Vila Nova", 80, y);
  doc.text("Centro", 135, y);
  doc.line(5, 42, 190, 42);
  y += 4;

  // ENDEREÇO
  doc.setFont(undefined, "bold");
  doc.text("Endereço:", 10, (y += 6));
  doc.setFont(undefined, "normal");
  doc.text("Rua das Flores, 123", 30, y);

  doc.setFont(undefined, "bold");
  doc.text("CEP:", 120, y);
  doc.setFont(undefined, "normal");
  doc.text("23815-000", 130, y);
  doc.line(5, 52, 190, 52);
  y += 4;

  // PROPRIETÁRIO
  doc.setFont(undefined, "bold");
  doc.text("Proprietário (Compromissário):", 10, (y += 6));
  doc.setFont(undefined, "normal");
  doc.text("João Silva", 65, y);

  doc.setFont(undefined, "bold");
  doc.text("CPF:", 120, y);
  doc.setFont(undefined, "normal");
  doc.text("123.456.789-00", 130, y);
  doc.line(5, 62, 190, 62);
  y += 4;

  // LOGRADOURO
  doc.setFont(undefined, "bold");
  doc.text("I - INFORMAÇÕES SOBRE O LOGRADOURO:", 60, (y += 5));
  doc.setFont(undefined, "normal");
  doc.line(5, 70, 190, 70);
  y += 2;
  const InformacoesLogradouro = [
    ["X", "1- Pavimentação"],
    ["X", "2- Iluminação Pública"],
    ["", "3- Rede de Esgoto"],
    ["X", "4- Rede de Água"],
    ["X", "5- Coleta de Lixo"],
  ];

  InformacoesLogradouro.forEach(([check, label], i) => {
    const x = 10 + i * 35;
    doc.rect(x, y + 3, 4, 4);
    doc.setFontSize(8);
    doc.text(check, x + 1.5, y + 6);
    doc.text(label, x + 5, y + 6);
  });
  doc.line(5, 79, 190, 79);
  y += 10;

  // TERRENO - EXIBIÇÃO EM COLUNAS
  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.text("II - INFORMAÇÕES SOBRE O TERRENO:", 64, y + 4);
  doc.line(5, 86, 190, 86);
  y += 4;
  const renderTerrenoHorizontal = () => {
    const opcoes = [
      {
        titulo: "1- Situação:",
        dados: [["", "1- Encravado"], ["", "2- Vila"], ["X", "3- Meio de Quadra"], ["X", "4- Esquina"],
        ["X", "5- Com Três Frentes"], ["X", "6- Toda a Quadra"]],
      },
      {
        titulo: "2- Características do Solo:",
        dados: [["", "1- Alagadiço"], ["X", "2- Arenoso"], ["", "3- Rochoso"]],
      },
      {
        titulo: "3- Topografia:",
        dados: [["", "1- Aclive"], ["", "2- Declive"], ["X", "3- Horizontal"]],
      },
      {
        titulo: "4- Nivelamento:",
        dados: [["", "1- Abaixo do Nível"], ["X", "2- Ao Nível"], ["", "3- Acima do Nível"]],
      },
    ];

    const startY = y + 7;
    const colWidth = 45;

    opcoes.forEach((grupo, i) => {
      const x = 10 + i * colWidth;
      let offsetY = 0;

      doc.setFont(undefined, "bold");
      doc.setFontSize(9);
      doc.text(grupo.titulo, x, startY);

      grupo.dados.forEach(([check, label], idx) => {
        const itemY = startY + 6 + idx * 5;
        doc.rect(x, itemY - 3, 4, 4);
        doc.setFontSize(8);
        doc.setFont(undefined, "normal");
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
  doc.setFont(undefined, "bold");
  doc.setFontSize(10);
  doc.text("III - METRAGENS:", 85, 128);
  doc.line(5, 130, 190, 130);
  doc.setFont(undefined, "bold");
  doc.text("Área do Terreno:", 10, (y += 3));
  doc.setFont(undefined, "normal");
  doc.text("450,00 m²", 40, y);
  doc.setFont(undefined, "bold");
  doc.text("Testada:", 79, y);
  doc.setFont(undefined, "normal");
  doc.text("15,00 m", 95, y);
  doc.setFont(undefined, "bold");
  doc.text("Área Edificada:", 127, y);
  doc.setFont(undefined, "normal");
  doc.text("120,00 m²", 155, y);
  doc.line(5, 137, 190, 137);
  y -= 3;

  const opcoesServentia = () => {
    const opcoesServentia = [
      {
        titulo: "Serventias:",
        dados: [["", "1-Sala"], ["", "2-Quarto"], ["", "3-Copa"], ["", "4-Cozinha"],
        ["", "5- Banheiro"], ["", "6-Garagem"], ["", "7-Varanda"], ["", "8-Corredor"], ["", "9-Área"], ["", "10-Porão Habital"]],
      },
      {
        titulo: "Calçamento",
        dados: [["", "Sem Asfalto"], ["", "Asfaltada"], ["X", "Novo"], ["X", "Antigo"], ["X", "Parte"], ["X", "Toda"], ["X", "Paralelo"], ["X", "Bloco"]],
      },
      {
        titulo: "Avaliação Urbanística do Logradouro:",
        dados: [["", "Alta"], ["X", "Média"], ["", "Média Baixa"], ["", "Baixa"], ["", "Muito Baixa"]],
      },
    ];

    const startY = y + 10;
    const colWidth = 55;

    opcoesServentia.forEach((grupo, i) => {
      const x = 10 + i * colWidth;
      let offsetY = 0;

      doc.setFont(undefined, "bold");
      doc.setFontSize(9);
      doc.text(grupo.titulo, x, startY);

      grupo.dados.forEach(([check, label], idx) => {
        const itemY = startY + 5 + idx * 5;
        doc.rect(x, itemY - 3, 4, 4);
        doc.setFontSize(8);
        doc.setFont(undefined, "normal");
        doc.text(check, x + 1, itemY);
        doc.text(label, x + 6, itemY);
        offsetY = itemY;
      });

      if (offsetY > y) y = offsetY;
    });

    y += 10;
  };

  const renderInfoConstrucao = () => {
    const colX = [195, 225, 258]; // posições X das 3 colunas
    const colY = [35, 35, 35];    // todas começam no mesmo Y

    const grupos = [
      {
        titulo: "1- Tipo:",
        opcoes: ["1- Casa", "2- Apartamento", "3- Sala", "4- Loja", "5- Galpão", "6- Templo"],
        espacoApos: 4,
      },
      {
        titulo: "2- Uso:",
        opcoes: ["1- Residencial", "2- Comercial", "3- Serviço", "4- Industrial", "5- Religioso"],
        espacoApos: 9,
      },
      {
        titulo: "3- Tipo de\nConstrução:",
        opcoes: ["1- Madeira", "2- Alvenaria", "3- Metálica", "4- Concreto", "5- Misto"],
        espacoApos: 4,
      },
      {
        titulo: "4- Esquadrias:",
        opcoes: ["1- Rústica", "2- Madeira", "3- Ferro", "4- Alumínio", "5- Especial", "6- Blindex"],
        espacoApos: 9,
      },
      {
        titulo: "5- Piso:",
        opcoes: ["1- Tijolo", "2- Cimento", "3- Tábua", "4- Taco", "5- Cerâmica", "6- Especial", "7- Porcelanato"],
        espacoApos: 4,
      },
      {
        titulo: "6- Forro:",
        opcoes: ["1- Estuque", "2- Placas", "3- Madeira", "4- Laje", "5- Gesso", "6- Especial", "7- Sem"],
        espacoApos: 5,
      },
      {
        titulo: "7- Cobertura:",
        opcoes: ["1- Zinco", "2- Alumínio", "3- Telha", "4- Amianto", "5- Especial", "6- Sem", "7- Laje"],
        espacoApos: 4,
      },
      {
        titulo: "8- Acabamento\nInterno:",
        opcoes: ["1- Caiação", "2- Pintura Simples", "3- Pintura Lavável", "4- Especial", "5- Reboco", "6- Sem"],
        espacoApos: 4,
      },
      {
        titulo: "9- Acabamento\nExterno:",
        opcoes: ["1- Caiação", "2- Pintura Simples", "3- Pintura Lavável", "4- Especial", "5- Reboco", "6- Sem"],
        espacoApos: 4,
      },
    ];
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.text("IV - INFORMAÇÕES SOBRE A CONSTRUÇÃO", 200, 30);

    // Define a ordem por coluna: 1-4-7, 2-5-8, 3-6-9
    const colunas = [
      [grupos[0], grupos[3], grupos[6]],
      [grupos[1], grupos[4], grupos[7]],
      [grupos[2], grupos[5], grupos[8]],
    ];

    const renderGrupo = (grupo, x, yStart) => {
      let y = yStart;

      const linhasTitulo = grupo.titulo.split("\n");
      doc.setFont(undefined, "bold");
      doc.setFontSize(9);
      linhasTitulo.forEach((linha) => {
        doc.text(linha, x, y);
        y += 4;
      });

      y += 2;

      doc.setFont(undefined, "normal");
      doc.setFontSize(8);

      grupo.opcoes.forEach((texto) => {
        doc.rect(x, y - 3.5, 4, 4);
        doc.text(texto, x + 6, y);
        y += 5;
      });

      // altura personalizada por grupo
      y += grupo.espacoApos || 3;

      return y;
    };



    // Renderiza as 3 colunas
    for (let i = 0; i < colunas.length; i++) {
      colunas[i].forEach((grupo) => {
        colY[i] = renderGrupo(grupo, colX[i], colY[i]);
      });
    }

    y = Math.max(...colY); // avança o Y geral
  };



  opcoesServentia();
  renderInfoConstrucao();

  doc.setDrawColor(0, 0, 0);
  doc.rect(5, 24, 185, 180); // área visual esquerda
  doc.setDrawColor(0, 0, 0);
  doc.rect(190, 24, 102, 180); // área visual direita


  // ASSINATURAS
  // doc.line(60, y, 120, y);
  // doc.text("Assinatura do Técnico", 70, y + 5);
  // doc.text("João Silva - CREA 12345", 70, y + 10);

  // doc.line(180, y, 240, y);
  // doc.text("Data e Carimbo", 190, y + 5);
  // doc.text(new Date().toLocaleDateString("pt-BR"), 190, y + 10);

  return doc.output("blob");
}
