"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Save } from "lucide-react";
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

export default function FormularioTecnico() {
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
      "tecnicoId",
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

    // Observações gerais
    totalFields++;
    if (formData.observacoes) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const overallProgress = calculateProgress();

  useEffect(() => {
    // APIs calls mantidas iguais...
    situacaoAPI.get().then((data) => {
      const options = data.map((item: any, idx: number) => ({
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
      const options = data.map((item: any, idx: number) => ({
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
      const options = data.map((item: any, idx: number) => ({
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
      const options = data.map((item: any, idx: number) => ({
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
        ...prev[section as keyof typeof prev],
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
    setIsLoading(true);
    try {
      console.log("🚀 FormData completo:", formData);
      console.log(
        "🎯 tecnicoId:",
        formData.tecnicoId,
        "tipo:",
        typeof formData.tecnicoId
      );

      if (!formData.tecnicoId) {
        alert("Por favor, selecione um técnico responsável");
        return;
      }

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
        observacoes: formData.observacoes || "",
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
        obsLogradouroAPI.create(obsLogradouroPayload).then((res) => {
          console.log(
            "✅ obsLogradouro enviado:",
            obsLogradouroPayload,
            "Resposta:",
            res
          );
          return res;
        }),
        nivelamentoAPI.create(sanitizeBooleans(formData.terreno.nivelamento)),
        forroAPI.create({ forro: sanitizeBooleans(formData.construcao.forro) }).then(res => {
          console.log('✅ ✅ ✅ ✅ forroAPI response:', res);
          return res;
        }),
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

      alert("Formulário BIC salvo com sucesso!");
    } catch (e) {
      console.error("Erro completo:", e);
      alert("Erro ao salvar o formulário!");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      id: "dadosBasicos",
      title: "Dados Básicos do Imóvel",
      description: "Inscrição, lançamento, revisão e dados do proprietário",
      icon: FileText,
      iconColor: "text-sky-600",
      iconBgColor: "bg-sky-50",
      content: (
        <DadosBasicosSection
          formData={formData}
          handleInputChange={handleInputChange}
        />
      ),
    },
    {
      id: "logradouro",
      title: "I - Informações sobre o Logradouro",
      description:
        "Pavimentação, iluminação, rede de esgoto, água e coleta de lixo",
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
        "Situação, características do solo, topografia e nivelamento",
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
      description: "Área do terreno, testada e área edificada",
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
    {
      id: "construcao",
      title: "IV - Informações sobre a Construção",
      description:
        "Tipo, uso, materiais, acabamentos e características construtivas",
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
    {
      id: "serventias",
      title: "Serventias e Características Complementares",
      description: "Cômodos, avaliação urbanística e calçamento",
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
      description: "Avaliação do logradouro, calçamento e observações gerais",
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
              className={`${openSans.className} text-black font-bold text-sm ml-2`}
            >
              {stepProgress}%
            </p>
          </div>
        </div>

        {/* Seções do Formulário - apenas uma por vez */}
        <div className="space-y-6">
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

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              variant="outline"
            >
              Voltar
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
                }
                // Aqui você pode adicionar validação para só avançar se os campos estiverem preenchidos
              >
                Avançar
              </Button>
            ) : (
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar BIC"}
              </Button>
            )}
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
