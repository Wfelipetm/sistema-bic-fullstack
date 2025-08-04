"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { FormularioSection } from "./components/formulario-section";
import { DadosBasicosSection } from "./components/dados-basicos-section";
import { LogradouroSection } from "./components/logradouro-section";
import { TerrenoSection } from "./components/terreno-section";
import { MetragensSection } from "./components/metragens-section";
import { ConstrucaoSection } from "./components/construcao-section";
import { ServentiasSection } from "./components/serventias-section";
import { AvaliacaoUrbanisticaSection } from "./components/avaliacao-urbanistica-section";
import type { FormularioData } from "@/app/types/formulario";
import { createBoletim } from "./components/boletim-service";
import { createLogradouro } from "./components/logradouro-service";
import { createTerreno } from "./components/terreno-service";
import { createMetragens } from "./components/metragens-service";
import { createConstrucao } from "./components/construcao-service";
import { formularioInicial } from "./components/formulario-inicial";
import {
  usoAPI,
  topografiaAPI,
  tipoConstrucaoAPI,
  tipoAPI,
  infoConstrucaoAPI,
  situacaoAPI,
  serventiasAPI,
  pisoAPI,
  obsLogradouroAPI,
  nivelamentoAPI,
  forroAPI,
  esquadrilhaAPI,
  coberturaAPI,
  calcamentoAPI,
  avaliUrbaLogradouroAPI,
  acabamentoInternoAPI,
  acabamentoExternoAPI,
  caracterSoloAPI,
} from "@/lib/api-services";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });

function sanitizeBooleans<T extends Record<string, any>>(obj: T): T {
  const sanitized: Record<string, any> = {};
  for (const key in obj) {
    sanitized[key] = typeof obj[key] === "boolean" ? obj[key] : false;
  }
  return sanitized as T;
}

function deepSanitizeBooleans(obj: any): any {
  if (typeof obj === "boolean") return obj;
  if (typeof obj === "object" && obj !== null) {
    const sanitized: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      sanitized[key] = deepSanitizeBooleans(obj[key]);
      if (
        (sanitized[key] === undefined || sanitized[key] === null) &&
        typeof obj[key] !== "object"
      ) {
        sanitized[key] = false;
      }
    }
    return sanitized;
  }
  return obj;
}

export default function qFormularioTecnico() {
  const [formData, setFormData] = useState<FormularioData>(formularioInicial);
  const [isLoading, setIsLoading] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dadosBasicos: true,
    logradouro: false,
    terreno: false,
    metragens: false,
    construcao: false,
    serventias: false,
    avaliacaoUrbanistica: false,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const [situacaoOptions, setSituacaoOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [soloOptions, setSoloOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [topografiaOptions, setTopografiaOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [nivelamentoOptions, setNivelamentoOptions] = useState<
    { id: string; label: string }[]
  >([]);

  // Calcular progresso do formulário
  const calculateProgress = () => {
    let totalFields = 0;
    let filledFields = 0;

    // Dados Básicos
    const dadosBasicosFields = [
      "inscricaoNumero",
      "lote",
      "quadra",
      "endereco",
      // "tecnicoId", // removido
      "proprietario",
      "cpfCnpj",
      "telefone",
      "email",
      "bairro",
      "municipio",
      "cep",
      "complemento",
      "tipoImovel",
      "finalidade",
      "dataCadastro",
      "dataAtualizacao",
      "numero",
      "matricula",
      "cartorio",
      "observacoes",
    ];
    dadosBasicosFields.forEach((field) => {
      totalFields++;
      if (formData[field as keyof FormularioData]) filledFields++;
    });

    // Logradouro (considera todos os checkboxes)
    Object.values(formData.logradouro).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });

    // Terreno (cada grupo de opções)
    Object.values(formData.terreno.situacao).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.terreno.caracteristicasSolo).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.terreno.topografia).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.terreno.nivelamento).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });

    // Metragens
    (
      [
        "areaTerreno",
        "testada",
        "areaEdificada",
      ] as (keyof typeof formData.metragens)[]
    ).forEach((field) => {
      totalFields++;
      if (formData.metragens[field]) filledFields++;
    });

    // Construção (considera todos os checkboxes e campos principais)
    Object.values(formData.construcao.tipoConstrucao).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.tipo).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.uso).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.piso).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.forro).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.esquadrias).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.cobertura).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.acabamentoInterno).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.construcao.acabamentoExterno).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });

    // Serventias (considera todos os campos numéricos)
    Object.values(formData.serventias).forEach((val) => {
      totalFields++;
      if (val && val !== 0) filledFields++;
    });

    // Calçamento (tipo e extensão)
    Object.values(formData.calcamento.tipo).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });
    Object.values(formData.calcamento.extensao).forEach((val) => {
      totalFields++;
      if (val) filledFields++;
    });

    // Avaliação Urbanística
    if (formData.avaliacaoUrbanistica) filledFields++;
    totalFields++;

    // Observações do logradouro
    totalFields++;
    if (formData.obsLogradouro?.observacoes) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const overallProgress = calculateProgress();

  useEffect(() => {
    // APIs calls mantidas iguais...
    situacaoAPI.get().then((data) => {
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      const options = arr.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao &&
          typeof item.descricao === "string" &&
          item.descricao.trim() !== ""
            ? item.descricao
            : item.nome &&
              typeof item.nome === "string" &&
              item.nome.trim() !== ""
            ? item.nome
            : item.label &&
              typeof item.label === "string" &&
              item.label.trim() !== ""
            ? item.label
            : `Opção ${idx + 1}`,
      }));
      setSituacaoOptions(options);
    });

    caracterSoloAPI.get().then((data) => {
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      const options = arr.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao &&
          typeof item.descricao === "string" &&
          item.descricao.trim() !== ""
            ? item.descricao
            : item.nome &&
              typeof item.nome === "string" &&
              item.nome.trim() !== ""
            ? item.nome
            : item.label &&
              typeof item.label === "string" &&
              item.label.trim() !== ""
            ? item.label
            : `Opção ${idx + 1}`,
      }));
      setSoloOptions(options);
    });

    topografiaAPI.get().then((data) => {
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      const options = arr.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao &&
          typeof item.descricao === "string" &&
          item.descricao.trim() !== ""
            ? item.descricao
            : item.nome &&
              typeof item.nome === "string" &&
              item.nome.trim() !== ""
            ? item.nome
            : item.label &&
              typeof item.label === "string" &&
              item.label.trim() !== ""
            ? item.label
            : `Opção ${idx + 1}`,
      }));
      setTopografiaOptions(options);
    });

    nivelamentoAPI.get().then((data) => {
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      const options = arr.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao &&
          typeof item.descricao === "string" &&
          item.descricao.trim() !== ""
            ? item.descricao
            : item.nome &&
              typeof item.nome === "string" &&
              item.nome.trim() !== ""
            ? item.nome
            : item.label &&
              typeof item.label === "string" &&
              item.label.trim() !== ""
            ? item.label
            : `Opção ${idx + 1}`,
      }));
      setNivelamentoOptions(options);
    });
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => {
      // Suporte a campos aninhados usando dot notation (ex: "obsLogradouro.observacoes")
      if (field.includes('.')) {
        const [parentField, childField] = field.split('.');
        return {
          ...prev,
          [parentField]: {
            ...(prev[parentField as keyof typeof prev] as Record<string, any>),
            [childField]: value,
          },
        };
      }
      
      // Campo simples
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  // Nova função para lidar com arquivos
  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleNestedInputChange = (
    section: string,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, any>),
        [field]:
          section === "serventias"
            ? value === ""
              ? ""
              : Number(value)
            : value,
      },
    }));
  };

  const handleCheckboxChange = (
    section: string,
    field: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...{ ...(prev[section as keyof typeof prev] as object) },
        [field]: checked,
      },
    }));
  };

  const handleNestedCheckboxChange = (
    section: string,
    subsection: string,
    field: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, any>),
        [subsection]: {
          ...(prev[section as keyof typeof prev] as Record<string, any>)[
            subsection
          ],
          [field]: checked,
        },
      },
    }));
  };

  const handleSave = async () => {
    // Validação obrigatória da Avaliação Urbanística
    if (window.__validateRequiredAvaliacaoUrbanistica && !window.__validateRequiredAvaliacaoUrbanistica()) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      // Não exige técnico responsável

      // Resto da lógica de salvamento mantida igual...
      const sanitizedFormData = {
        ...deepSanitizeBooleans(formData),
        area_terreno: formData.metragens?.areaTerreno
          ? Number(formData.metragens.areaTerreno.replace(",", "."))
          : null,
        testada: formData.metragens?.testada
          ? Number(formData.metragens.testada.replace(",", "."))
          : null,
        area_edificada: formData.metragens?.areaEdificada
          ? Number(formData.metragens.areaEdificada.replace(",", "."))
          : null,
      };

      const boletim = await createBoletim(sanitizedFormData);

      await createMetragens({
        area_terreno: formData.metragens?.areaTerreno
          ? Number(formData.metragens.areaTerreno.replace(",", "."))
          : null,
        area_testada: formData.metragens?.testada
          ? Number(formData.metragens.testada.replace(",", "."))
          : null,
        area_edificada: formData.metragens?.areaEdificada
          ? Number(formData.metragens.areaEdificada.replace(",", "."))
          : null,
        boletim_id: boletim.id,
      });

      const avaliacao = formData.avaliacaoUrbanistica;
      const avaliUrbaPayload = {
        alta: avaliacao === "alta",
        media: avaliacao === "media",
        media_baixa: avaliacao === "media_baixa",
        baixa: avaliacao === "baixa",
        muito_baixa: avaliacao === "muito_baixa",
      };

      const situacaoPayload = sanitizeBooleans(formData.terreno.situacao);
      const usoPayload = sanitizeBooleans(formData.construcao.uso);

      const obsLogradouroPayload = {
        logradouro_placa: !!formData.logradouroComPlaca,
        observacoes: formData.obsLogradouro?.observacoes || "",
      };

      // Funções de sanitização para acabamento interno/externo
      function sanitizeAcabamentoInterno(data: any) {
        return {
          caiacao: !!data.caiacao,
          pintura_simples: !!data.pintura_simples,
          pintura_lavavel: !!data.pintura_lavavel,
          especial: !!data.especial,
          reboco: !!data.reboco,
          sem: !!data.sem,
        };
      }
      function sanitizeAcabamentoExterno(data: any) {
        return {
          caiacao: !!data.caiacao,
          pintura_simples: !!data.pintura_simples,
          pintura_lavavel: !!data.pintura_lavavel,
          especial: !!data.especial,
          reboco: !!data.reboco,
          sem: !!data.sem,
        };
      }

      const [
        usoRes,
        topografiaRes,
        tipoConstrucaoRes,
        tipoRes,
        situacaoRes,
        caracterSoloRes,
        serventiasRes,
        pisoRes,
        obsLogradouroRes,
        nivelamentoRes,
        forroRes,
        esquadrilhaRes,
        coberturaRes,
        calcamentoRes,
        avaliUrbaLogradouroRes,
        acabamentoInternoRes,
        acabamentoExternoRes,
      ] = await Promise.all([
        usoAPI.create(sanitizeBooleans(formData.construcao.uso)),
        topografiaAPI.create(sanitizeBooleans(formData.terreno.topografia)),
        tipoConstrucaoAPI.create(
          sanitizeBooleans(formData.construcao.tipoConstrucao)
        ),
        tipoAPI.create(sanitizeBooleans(formData.construcao.tipo)),
        situacaoAPI.create(sanitizeBooleans(formData.terreno.situacao)),
        caracterSoloAPI.create(
          sanitizeBooleans(formData.terreno.caracteristicasSolo)
        ),
        serventiasAPI.create(formData.serventias),
        pisoAPI.create(sanitizeBooleans(formData.construcao.piso)),
        obsLogradouroAPI.create(obsLogradouroPayload),
        nivelamentoAPI.create(sanitizeBooleans(formData.terreno.nivelamento)),
        forroAPI.create({ forro: sanitizeBooleans(formData.construcao.forro) }),
        esquadrilhaAPI.create(sanitizeBooleans(formData.construcao.esquadrias)),
        coberturaAPI.create(sanitizeBooleans(formData.construcao.cobertura)),
        calcamentoAPI.create({
          sem_asfalto: !!formData.calcamento.tipo.sem_asfalto,
          asfaltada: !!formData.calcamento.tipo.asfaltada,
          novo: !!formData.calcamento.tipo.novo,
          antigo: !!formData.calcamento.tipo.antigo,
          parte: !!formData.calcamento.extensao.parte,
          toda: !!formData.calcamento.extensao.toda,
          paralelo: !!formData.calcamento.extensao.paralelo,
          bloco: !!formData.calcamento.extensao.bloco,
        }),
        avaliUrbaLogradouroAPI.create({
          alta: formData.avaliacaoUrbanistica === "alta",
          media: formData.avaliacaoUrbanistica === "media",
          media_baixa: formData.avaliacaoUrbanistica === "media_baixa",
          baixa: formData.avaliacaoUrbanistica === "baixa",
          muito_baixa: formData.avaliacaoUrbanistica === "muito_baixa",
        }),
        acabamentoInternoAPI.create({ acabamentoInterno: sanitizeAcabamentoInterno(formData.construcao.acabamentoInterno) }),
        acabamentoExternoAPI.create({ acabamentoExterno: sanitizeAcabamentoExterno(formData.construcao.acabamentoExterno) }),
      ]);

      await Promise.all([
        createLogradouro({ ...formData.logradouro, boletim_id: boletim.id }),
        createTerreno({
          boletim_id: boletim.id,
          situacao_id: situacaoRes.id,
          caracter_solo_id: caracterSoloRes.id,
          topografia_id: topografiaRes.id,
          nivelamento_id: nivelamentoRes.id,
        }),
        createMetragens({ ...formData.metragens, boletim_id: boletim.id }),
        // Salva o grupo tipoConstrucao explicitamente
        tipoConstrucaoAPI.create({ tipoConstrucao: sanitizeBooleans(formData.construcao.tipoConstrucao) }),
        (async () => {
          const construcaoPayload = {
            ...formData.construcao,
            uso_id: usoRes.id,
            topografia_id: topografiaRes.id,
            tipo_construcao_id: tipoConstrucaoRes.id,
            tipo_id: tipoRes.id,
            situacao_id: situacaoRes.id,
            serventias_id: serventiasRes.id,
            piso_id: pisoRes.id,
            obs_logradouro_id: obsLogradouroRes.id,
            nivelamento_id: nivelamentoRes.id,
            forro_id: forroRes.id,
            esquadrilha_id: esquadrilhaRes.id,
            cobertura_id: coberturaRes.id,
            calcamento_id: calcamentoRes.id,
            avali_urba_logradouro_id: avaliUrbaLogradouroRes.id,
            acabamento_interno_id: acabamentoInternoRes.id,
            acabamento_externo_id: acabamentoExternoRes.id,
            boletim_id: boletim.id,
          }

          // Remover os objetos completos do payload
          const construcaoPayloadAny: any = construcaoPayload;
          delete construcaoPayloadAny.uso
          delete construcaoPayloadAny.topografia
          delete construcaoPayloadAny.tipoConstrucao
          delete construcaoPayloadAny.tipo
          delete construcaoPayloadAny.situacao
          delete construcaoPayloadAny.serventias
          delete construcaoPayloadAny.piso
          delete construcaoPayloadAny.obs_logradouro
          delete construcaoPayloadAny.nivelamento
          delete construcaoPayloadAny.forro
          delete construcaoPayloadAny.esquadrias
          delete construcaoPayloadAny.cobertura
          delete construcaoPayloadAny.calcamento
          delete construcaoPayloadAny.acabamento_interno
          delete construcaoPayloadAny.acabamento_externo

          await createConstrucao(construcaoPayload)
        })(),
      ]);

      const cleanServentias = Object.fromEntries(
        Object.entries(formData.serventias).filter(([_, v]) => v !== 0)
      );
      await serventiasAPI.create({ ...formData.serventias });

      toast.success("Formulário BIC salvo com sucesso!");
    } catch (e) {
      toast.error("Inscrição já existe");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para checar se todas as metragens são zero ou vazias (memoizada para evitar erro de dependências do useEffect)
  // Nova lógica: só pula para Serventias se areaEdificada for zero ou vazio
  const isAreaEdificadaZero = useCallback(() => {
    const v = formData.metragens.areaEdificada;
    if (v === undefined || v === null) return true;
    if (typeof v === "string") {
      const val = v.replace(",", ".").trim();
      return val === "0" || val === "0.00" || val === "";
    }
    return v === 0;
  }, [formData.metragens.areaEdificada]);

  // Monta steps dinamicamente pulando construção se necessário
  const steps = [
    {
      id: "dadosBasicos",
      title: "Dados Básicos do Imóvel",
      description: "Preencha as informações básicas do imóvel",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <DadosBasicosSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleNestedInputChange={handleNestedInputChange}
        />
      ),
    },
    {
      id: "logradouro",
      title: "I - Informações sobre o Logradouro",
      description:
        "Selecione os itens de infraestrutura disponíveis no local",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <LogradouroSection
          formData={formData}
          handleCheckboxChange={handleCheckboxChange}
        />
      ),
    },
    {
      id: "terreno",
      title: "II - Informações sobre o Terreno",
      description:
        "Selecione as características que descrevem o terreno",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <TerrenoSection
          formData={formData}
          handleNestedCheckboxChange={handleNestedCheckboxChange}
        />
      ),
    },
    {
      id: "metragens",
      title: "III - Metragens",
      description: "Informe as medidas do imóvel",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <MetragensSection
          formData={formData}
          handleNestedInputChange={handleNestedInputChange}
        />
      ),
    },
    // Só inclui construção se areaEdificada for diferente de zero
    ...(!isAreaEdificadaZero()
      ? [
          {
            id: "construcao",
            title: "IV - Informações sobre a Construção",
            description: "Selecione as características da construção",
            icon: FileText,
            iconColor: "text-sky-600",
            iconBgColor: "bg-sky-50",
            content: (
              <ConstrucaoSection
                formData={formData}
                handleNestedCheckboxChange={handleNestedCheckboxChange}
              />
            ),
          },
        ]
      : []),
    {
      id: "serventias",
      title: "Serventias e Características Complementares",
      description: "Informe a quantidade de cada cômodo",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <ServentiasSection
          formData={formData}
          handleNestedInputChange={handleNestedInputChange}
        />
      ),
    },
    {
      id: "avaliacaoUrbanistica",
      title: "Avaliação Urbanística e Observações",
      description: "Avalie as características urbanísticas do logradouro",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <AvaliacaoUrbanisticaSection
          formData={formData}
          handleCheckboxChange={handleCheckboxChange}
          handleNestedCheckboxChange={handleNestedCheckboxChange}
          handleInputChange={handleInputChange}
        />
      ),
    },
  ];

  // Progresso baseado no step atual
  const stepProgress = Math.round(((currentStep + 1) / steps.length) * 100);

  // Navegação por teclado pulando construção se necessário
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentStep((prev) => {
          let next = prev + 1;
          // Pular construção se não existir
          if (
            steps[next] &&
            steps[next].id === "construcao" &&
            isAreaEdificadaZero()
          ) {
            next++;
          }
          return Math.min(next, steps.length - 1);
        });
      }
      if (e.key === "ArrowLeft") {
        setCurrentStep((prev) => {
          let prevStep = prev - 1;
          // Pular construção se não existir
          if (
            steps[prevStep] &&
            steps[prevStep].id === "construcao" &&
            isAreaEdificadaZero()
          ) {
            prevStep--;
          }
          return Math.max(prevStep, 0);
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [steps, isAreaEdificadaZero]);

  return (
    <div >
      <div className="w-full max-w-none">
        {/* Header Simples */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-lg p-5 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Boletim de Informação Cadastral - BIC
                </h1>
                <p className="text-sky-100">
                  Prefeitura Municipal de Itaguaí - Secretaria de Fazenda
                </p>
              </div>
            </div>

            {/* <div className="flex items-center gap-6">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-white text-sky-600 hover:bg-sky-50 px-6 py-3 rounded-xl font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-600 mr-2"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar BIC
                  </>
                )}
              </Button>
            </div> */}
          </div>
        </div>

        {/* Barra de Progresso abaixo do header */}
        <div className="w-full mb-1 rounded-xl">
          <div className="flex flex-row items-center justify-center p-1">
            <Progress
              value={stepProgress}
              className="h-2 fill-white bg-slate-300 w-full"
            />
            <p
              className={`${openSans.className} text-sky-600 font-bold text-sm ml-2`}
            >
              {stepProgress}%
            </p>
          </div>
        </div>

        {/* Seções do Formulário - apenas uma por vez */}
        <div className="space-y-6 relative">
          <FormularioSection
            id={steps[currentStep].id}
            title={steps[currentStep].title}
            description={steps[currentStep].description}
            icon={steps[currentStep].icon}
            iconColor={steps[currentStep].iconColor}
            iconBgColor={steps[currentStep].iconBgColor}
            isOpen={true}
            onToggle={() => {}}
          >
            {steps[currentStep].content}
          </FormularioSection>

          {/* Botões de navegação abaixo do formulário */}
          <div
            className="mt-8 w-full flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between"
          >
            {currentStep > 0 && (
              <div className="w-full md:w-auto md:flex-1 md:flex md:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep((prev) => {
                      let prevStep = prev - 1;
                      if (
                        steps[prevStep] &&
                        steps[prevStep].id === "construcao" &&
                        isAreaEdificadaZero()
                      ) {
                        prevStep--;
                      }
                      return Math.max(prevStep, 0);
                    });
                  }}
                  className="w-full md:w-auto px-6 py-2 rounded-xl border border-sky-200 bg-white text-sky-700 font-semibold shadow-md hover:bg-sky-100 hover:text-sky-900 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Voltar etapa"
                  tabIndex={0}
                >
                  Anterior
                </button>
              </div>
            )}
            <div className="w-full md:w-auto md:flex-1 md:flex md:justify-end">
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    // Validação obrigatória dos Dados Básicos
                    if (steps[currentStep].id === "dadosBasicos") {
                      if (!formData.inscricaoNumero || formData.inscricaoNumero.trim() === "") {
                        toast.warning("Preencha o campo Inscrição Nº.");
                        return;
                      }
                      if (!formData.lote || formData.lote.trim() === "") {
                        toast.warning("Preencha o campo Lote.");
                        return;
                      }
                      if (!formData.quadra || formData.quadra.trim() === "") {
                        toast.warning("Preencha o campo Quadra.");
                        return;
                      }
                      if (!formData.endereco || formData.endereco.trim() === "") {
                        toast.warning("Preencha o campo Endereço.");
                        return;
                      }
                    }
                    // Validação obrigatória do Logradouro
                    if (steps[currentStep].id === "logradouro") {
                      if (typeof window !== "undefined" && typeof window.__validateRequiredLogradouro === "function") {
                        if (!window.__validateRequiredLogradouro()) {
                          return;
                        }
                      }
                    }
                    // Validação obrigatória das Metragens
                    if (steps[currentStep].id === "metragens") {
                      if (typeof window !== "undefined" && typeof window.__validateRequiredMetragens === "function") {
                        if (!window.__validateRequiredMetragens()) {
                          return;
                        }
                      }
                    }
                    // Validação obrigatória da Construção
                    if (steps[currentStep].id === "construcao") {
                      if (typeof window !== "undefined" && typeof window.__validateRequiredConstrucao === "function") {
                        if (!window.__validateRequiredConstrucao()) {
                          return;
                        }
                      }
                    }
                    // Validação obrigatória das Serventias
                    if (steps[currentStep].id === "serventias") {
                      if (typeof window !== "undefined" && typeof window.__validateRequiredServentias === "function") {
                        if (!window.__validateRequiredServentias()) {
                          return;
                        }
                      }
                    }
                    // Validação obrigatória do Terreno
                    if (steps[currentStep].id === "terreno") {
                      const soloPreenchido = Object.values(formData.terreno.caracteristicasSolo).some(Boolean);
                      const topoPreenchido = Object.values(formData.terreno.topografia).some(Boolean);
                      const nivelPreenchido = Object.values(formData.terreno.nivelamento).some(Boolean);
                      if (!soloPreenchido) {
                        toast.warning("Selecione pelo menos uma opção em Características do Solo.");
                        return;
                      }
                      if (!topoPreenchido) {
                        toast.warning("Selecione pelo menos uma opção em Topografia.");
                        return;
                      }
                      if (!nivelPreenchido) {
                        toast.warning("Selecione pelo menos uma opção em Nivelamento.");
                        return;
                      }
                    }
                    setCurrentStep((prev) => {
                      let next = prev + 1;
                      // Pular construção se não existir
                      if (
                        steps[next] &&
                        steps[next].id === "construcao" &&
                        isAreaEdificadaZero()
                      ) {
                        next++;
                      }
                      return Math.min(next, steps.length - 1);
                    });
                  }}
                  className="w-full md:w-auto px-6 py-2 rounded-xl border border-sky-200 bg-white text-sky-700 font-semibold shadow-md hover:bg-sky-100 hover:text-sky-900 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Avançar etapa"
                  tabIndex={0}
                >
                  Próxima
                </button>
              ) : (
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="w-full md:w-auto bg-sky-600 hover:bg-sky-700 text-white font-semibold shadow-md border border-sky-700 transition-all duration-150"
                >
                  {isLoading ? "Salvando..." : "Salvar BIC"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSelectedId(
  section: Record<string, boolean>,
  options: { id: number | string }[]
) {
  const selectedKey = Object.keys(section).find((key) => section[key]);
  const selectedOption = options.find((opt) => String(opt.id) === selectedKey);
  return selectedOption ? selectedOption.id : null;
}
