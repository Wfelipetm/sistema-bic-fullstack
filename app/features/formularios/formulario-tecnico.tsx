"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Save } from "lucide-react"
import { FormularioSection } from "./components/formulario-section"
import { DadosBasicosSection } from "./components/dados-basicos-section"
import { LogradouroSection } from "./components/logradouro-section"
import { TerrenoSection } from "./components/terreno-section"
import { MetragensSection } from "./components/metragens-section"
import { ConstrucaoSection } from "./components/construcao-section"
import { ServentiasSection } from "./components/serventias-section"
import { AvaliacaoUrbanisticaSection } from "./components/avaliacao-urbanistica-section"
import type { FormularioData } from "@/app/types/formulario"
import { createBoletim } from "./components/boletim-service"
import { createLogradouro } from "./components/logradouro-service"
import { createTerreno } from "./components/terreno-service"
import { createMetragens } from "./components/metragens-service"
import { createConstrucao } from "./components/construcao-service"
import { formularioInicial } from "./components/formulario-inicial"
import {
  usoAPI,
  topografiaAPI,
  tipoConstrucaoAPI,
  tipoAPI,
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
} from "@/lib/api-services"

function sanitizeBooleans<T extends Record<string, any>>(obj: T): T {
  const sanitized: Record<string, any> = {}
  for (const key in obj) {
    sanitized[key] = typeof obj[key] === "boolean" ? obj[key] : false
  }
  return sanitized as T
}

function deepSanitizeBooleans(obj: any): any {
  if (typeof obj === "boolean") return obj
  if (typeof obj === "object" && obj !== null) {
    const sanitized: any = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      sanitized[key] = deepSanitizeBooleans(obj[key])
      if ((sanitized[key] === undefined || sanitized[key] === null) && typeof obj[key] !== "object") {
        sanitized[key] = false
      }
    }
    return sanitized
  }
  return obj
}

export default function FormularioTecnico() {
  const [formData, setFormData] = useState<FormularioData>(formularioInicial)
  const [isLoading, setIsLoading] = useState(false)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dadosBasicos: true,
    logradouro: false,
    terreno: false,
    metragens: false,
    construcao: false,
    serventias: false,
    avaliacaoUrbanistica: false,
  })

  const [situacaoOptions, setSituacaoOptions] = useState<{ id: string; label: string }[]>([])
  const [soloOptions, setSoloOptions] = useState<{ id: string; label: string }[]>([])
  const [topografiaOptions, setTopografiaOptions] = useState<{ id: string; label: string }[]>([])
  const [nivelamentoOptions, setNivelamentoOptions] = useState<{ id: string; label: string }[]>([])

  // Calcular progresso do formulário
  const calculateProgress = () => {
    let totalFields = 0
    let filledFields = 0

    // Dados básicos
    if (formData.inscricaoNumero) filledFields++
    if (formData.lote) filledFields++
    if (formData.quadra) filledFields++
    if (formData.endereco) filledFields++
    if (formData.tecnicoId) filledFields++
    totalFields += 5

    // Logradouro
    const logradouroCount = Object.values(formData.logradouro).filter(Boolean).length
    filledFields += logradouroCount > 0 ? 1 : 0
    totalFields += 1

    // Terreno
    const terrenoCount = [
      Object.values(formData.terreno.situacao).some(Boolean),
      Object.values(formData.terreno.caracteristicasSolo).some(Boolean),
      Object.values(formData.terreno.topografia).some(Boolean),
      Object.values(formData.terreno.nivelamento).some(Boolean),
    ].filter(Boolean).length
    filledFields += terrenoCount
    totalFields += 4

    // Metragens
    if (formData.metragens.areaTerreno) filledFields++
    if (formData.metragens.testada) filledFields++
    if (formData.metragens.areaEdificada) filledFields++
    totalFields += 3

    // Avaliação
    if (formData.avaliacaoUrbanistica) filledFields++
    totalFields += 1

    return Math.round((filledFields / totalFields) * 100)
  }

  const progress = calculateProgress()

  useEffect(() => {
    // APIs calls mantidas iguais...
    situacaoAPI.get().then((data) => {
      const options = data.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao && typeof item.descricao === "string" && item.descricao.trim() !== ""
            ? item.descricao
            : item.nome && typeof item.nome === "string" && item.nome.trim() !== ""
              ? item.nome
              : item.label && typeof item.label === "string" && item.label.trim() !== ""
                ? item.label
                : `Opção ${idx + 1}`,
      }))
      setSituacaoOptions(options)
    })

    caracterSoloAPI.get().then((data) => {
      const options = data.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao && typeof item.descricao === "string" && item.descricao.trim() !== ""
            ? item.descricao
            : item.nome && typeof item.nome === "string" && item.nome.trim() !== ""
              ? item.nome
              : item.label && typeof item.label === "string" && item.label.trim() !== ""
                ? item.label
                : `Opção ${idx + 1}`,
      }))
      setSoloOptions(options)
    })

    topografiaAPI.get().then((data) => {
      const options = data.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao && typeof item.descricao === "string" && item.descricao.trim() !== ""
            ? item.descricao
            : item.nome && typeof item.nome === "string" && item.nome.trim() !== ""
              ? item.nome
              : item.label && typeof item.label === "string" && item.label.trim() !== ""
                ? item.label
                : `Opção ${idx + 1}`,
      }))
      setTopografiaOptions(options)
    })

    nivelamentoAPI.get().then((data) => {
      const options = data.map((item: any, idx: number) => ({
        id: item.id,
        label:
          item.descricao && typeof item.descricao === "string" && item.descricao.trim() !== ""
            ? item.descricao
            : item.nome && typeof item.nome === "string" && item.nome.trim() !== ""
              ? item.nome
              : item.label && typeof item.label === "string" && item.label.trim() !== ""
                ? item.label
                : `Opção ${idx + 1}`,
      }))
      setNivelamentoOptions(options)
    })
  }, [])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: section === "serventias" ? (value === "" ? "" : Number(value)) : value,
      },
    }))
  }

  const handleCheckboxChange = (section: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...{ ...(prev[section as keyof typeof prev] as object) },
        [field]: checked,
      },
    }))
  }

  const handleNestedCheckboxChange = (section: string, subsection: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as Record<string, any>),
        [subsection]: {
          ...(prev[section as keyof typeof prev] as Record<string, any>)[subsection],
          [field]: checked,
        },
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      console.log("🚀 FormData completo:", formData)
      console.log("🎯 tecnicoId:", formData.tecnicoId, "tipo:", typeof formData.tecnicoId)

      if (!formData.tecnicoId) {
        alert("Por favor, selecione um técnico responsável")
        return
      }

      // Resto da lógica de salvamento mantida igual...
      const sanitizedFormData = {
        ...deepSanitizeBooleans(formData),
        area_terreno: formData.metragens?.areaTerreno ? Number(formData.metragens.areaTerreno.replace(",", ".")) : null,
        testada: formData.metragens?.testada ? Number(formData.metragens.testada.replace(",", ".")) : null,
        area_edificada: formData.metragens?.areaEdificada
          ? Number(formData.metragens.areaEdificada.replace(",", "."))
          : null,
      }

      const boletim = await createBoletim(sanitizedFormData)

      await createMetragens({
        area_terreno: formData.metragens?.areaTerreno ? Number(formData.metragens.areaTerreno.replace(",", ".")) : null,
        area_testada: formData.metragens?.testada ? Number(formData.metragens.testada.replace(",", ".")) : null,
        area_edificada: formData.metragens?.areaEdificada
          ? Number(formData.metragens.areaEdificada.replace(",", "."))
          : null,
        boletim_id: boletim.id,
      })

      const avaliacao = formData.avaliacaoUrbanistica
      const avaliUrbaPayload = {
        alta: avaliacao === "alta",
        media: avaliacao === "media",
        media_baixa: avaliacao === "media_baixa",
        baixa: avaliacao === "baixa",
        muito_baixa: avaliacao === "muito_baixa",
      }

      const situacaoPayload = sanitizeBooleans(formData.terreno.situacao)
      const usoPayload = sanitizeBooleans(formData.construcao.uso)

      const obsLogradouroPayload = {
        logradouro_placa: !!formData.logradouroComPlaca,
        observacoes: formData.observacoes || "",
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
        tipoConstrucaoAPI.create(sanitizeBooleans(formData.construcao.tipoConstrucao)),
        tipoAPI.create(sanitizeBooleans(formData.construcao.tipo)),
        situacaoAPI.create(sanitizeBooleans(formData.terreno.situacao)),
        caracterSoloAPI.create(sanitizeBooleans(formData.terreno.caracteristicasSolo)),
        serventiasAPI.create(formData.serventias),
        pisoAPI.create(sanitizeBooleans(formData.construcao.piso)),
        obsLogradouroAPI.create(obsLogradouroPayload).then((res) => {
          console.log("✅ obsLogradouro enviado:", obsLogradouroPayload, "Resposta:", res)
          return res
        }),
        nivelamentoAPI.create(sanitizeBooleans(formData.terreno.nivelamento)),
        forroAPI.create(sanitizeBooleans(formData.construcao.forro)),
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
        acabamentoInternoAPI.create(sanitizeBooleans(formData.construcao.acabamentoInterno)),
        acabamentoExternoAPI.create(sanitizeBooleans(formData.construcao.acabamentoExterno)),
      ])

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
        createConstrucao({
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
        }),
      ])

      const cleanServentias = Object.fromEntries(Object.entries(formData.serventias).filter(([_, v]) => v !== 0))
      await serventiasAPI.create({ ...formData.serventias })

      alert("Formulário BIC salvo com sucesso!")
    } catch (e) {
      console.error("Erro completo:", e)
      alert("Erro ao salvar o formulário!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-6">
      <div className="w-full max-w-none">
        {/* Header Simples */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Boletim de Informação Cadastral - BIC</h1>
                <p className="text-sky-100">Prefeitura Municipal de Itaguaí - Secretaria de Fazenda</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sky-100 text-sm mb-1">Progresso</p>
                <div className="w-32">
                  <Progress value={progress} className="h-2 bg-white/20" />
                  <p className="text-white text-sm mt-1">{progress}%</p>
                </div>
              </div>

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
            </div>
          </div>
        </div>

        {/* Seções do Formulário */}
        <div className="space-y-6">
          <FormularioSection
            id="dadosBasicos"
            title="Dados Básicos do Imóvel"
            description="Inscrição, lançamento, revisão e dados do proprietário"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.dadosBasicos}
            onToggle={() => toggleSection("dadosBasicos")}
          >
            <DadosBasicosSection formData={formData} handleInputChange={handleInputChange} />
          </FormularioSection>

          <FormularioSection
            id="logradouro"
            title="I - Informações sobre o Logradouro"
            description="Pavimentação, iluminação, rede de esgoto, água e coleta de lixo"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.logradouro}
            onToggle={() => toggleSection("logradouro")}
          >
            <LogradouroSection formData={formData} handleCheckboxChange={handleCheckboxChange} />
          </FormularioSection>

          <FormularioSection
            id="terreno"
            title="II - Informações sobre o Terreno"
            description="Situação, características do solo, topografia e nivelamento"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.terreno}
            onToggle={() => toggleSection("terreno")}
          >
            <TerrenoSection formData={formData} handleNestedCheckboxChange={handleNestedCheckboxChange} />
          </FormularioSection>

          <FormularioSection
            id="metragens"
            title="III - Metragens"
            description="Área do terreno, testada e área edificada"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.metragens}
            onToggle={() => toggleSection("metragens")}
          >
            <MetragensSection formData={formData} handleNestedInputChange={handleNestedInputChange} />
          </FormularioSection>

          <FormularioSection
            id="construcao"
            title="IV - Informações sobre a Construção"
            description="Tipo, uso, materiais, acabamentos e características construtivas"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.construcao}
            onToggle={() => toggleSection("construcao")}
          >
            <ConstrucaoSection formData={formData} handleNestedCheckboxChange={handleNestedCheckboxChange} />
          </FormularioSection>

          <FormularioSection
            id="serventias"
            title="Serventias e Características Complementares"
            description="Cômodos, avaliação urbanística e calçamento"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.serventias}
            onToggle={() => toggleSection("serventias")}
          >
            <ServentiasSection formData={formData} handleNestedInputChange={handleNestedInputChange} />
          </FormularioSection>

          <FormularioSection
            id="avaliacaoUrbanistica"
            title="Avaliação Urbanística e Observações"
            description="Avaliação do logradouro, calçamento e observações gerais"
            icon={FileText}
            iconColor="text-sky-600"
            iconBgColor="bg-sky-50"
            isOpen={openSections.avaliacaoUrbanistica}
            onToggle={() => toggleSection("avaliacaoUrbanistica")}
          >
            <AvaliacaoUrbanisticaSection
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
              handleNestedCheckboxChange={handleNestedCheckboxChange}
              handleInputChange={handleInputChange}
            />
          </FormularioSection>
        </div>
      </div>
    </div>
  )
}

function getSelectedId(section: Record<string, boolean>, options: { id: number | string }[]) {
  const selectedKey = Object.keys(section).find((key) => section[key])
  const selectedOption = options.find((opt) => String(opt.id) === selectedKey)
  return selectedOption ? selectedOption.id : null
}
