"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, MapPin, Layers, Save, Building, Home, Ruler } from "lucide-react"
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

export default function FormularioTecnico() {
  const [formData, setFormData] = useState<FormularioData>(formularioInicial)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dadosBasicos: true,
    logradouro: false,
    terreno: false,
    metragens: false,
    construcao: false,
    serventias: false,
    avaliacaoUrbanistica: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...{ ...(prev[section as keyof typeof prev] as object) },
        [field]: value,
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
          ...((prev[section as keyof typeof prev] as Record<string, any>)[subsection]),
          [field]: checked,
        },
      },
    }))
  }

  const handleSave = async () => {
    try {
      console.log("🚀 FormData completo:", formData);
      console.log("🎯 tecnicoId:", formData.tecnicoId, "tipo:", typeof formData.tecnicoId);

      // Validar se técnico foi selecionado
      if (!formData.tecnicoId) {
        alert("Por favor, selecione um técnico responsável")
        return
      }

      // 1. Cria o boletim e pega o id
      console.log("📦 FormData sendo enviado:", formData);
      console.log("🎯 tecnicoId no formData:", formData.tecnicoId, "tipo:", typeof formData.tecnicoId);

      const boletim = await createBoletim(formData)
      console.log("✅ Boletim criado:", boletim);

      // 2. Cria todos os registros auxiliares e pega os ids
      // Monte o payload correto para avaliação urbanística
      const avaliacao = formData.avaliacaoUrbanistica
      const avaliUrbaPayload = {
        alta: avaliacao === "alta",
        media: avaliacao === "media",
        media_baixa: avaliacao === "mediaBaixa",
        baixa: avaliacao === "baixa",
        muito_baixa: avaliacao === "muitoBaixa",
      }

      const situacaoPayload = sanitizeBooleans(formData.terreno.situacao)
      const usoPayload = sanitizeBooleans(formData.construcao.uso)
      // Repita para outros objetos booleanos

      const [
        usoRes,
        topografiaRes,
        tipoConstrucaoRes,
        tipoRes,
        situacaoRes,
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
        usoAPI.create(usoPayload),
        topografiaAPI.create(sanitizeBooleans(formData.terreno.topografia)),
        tipoConstrucaoAPI.create(sanitizeBooleans(formData.construcao.tipoConstrucao)),
        tipoAPI.create(sanitizeBooleans(formData.construcao.tipo)),
        situacaoAPI.create(situacaoPayload),
        serventiasAPI.create(sanitizeBooleans(formData.serventias)),
        pisoAPI.create(sanitizeBooleans(formData.construcao.piso)),
        obsLogradouroAPI.create(formData.obsLogradouro),
        nivelamentoAPI.create(sanitizeBooleans(formData.terreno.nivelamento)),
        forroAPI.create(sanitizeBooleans(formData.construcao.forro)),
        esquadrilhaAPI.create(sanitizeBooleans(formData.construcao.esquadrias)),
        coberturaAPI.create(sanitizeBooleans(formData.construcao.cobertura)),
        calcamentoAPI.create(formData.calcamento),
        avaliUrbaLogradouroAPI.create(avaliUrbaPayload),
        acabamentoInternoAPI.create(sanitizeBooleans(formData.construcao.acabamentoInterno)),
        acabamentoExternoAPI.create(sanitizeBooleans(formData.construcao.acabamentoExterno)),
      ])

      // 3. Usa os ids para os outros POSTs
      await Promise.all([
        createLogradouro({ ...formData.logradouro, boletim_id: boletim.id }),
        createTerreno({ ...formData.terreno, boletim_id: boletim.id }),
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
        caracterSoloAPI.create({ ...formData.terreno.caracteristicasSolo, boletim_id: boletim.id }),
      ])

      alert("Formulário BIC salvo com sucesso!")
    } catch (e) {
      console.error("❌ Erro completo:", e);
      alert("Erro ao salvar o formulário!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com referência ao formulário oficial */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <FileText className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">BOLETIM DE INFORMAÇÃO CADASTRAL - (BIC)</h1>
            <p className="text-blue-100">Prefeitura Municipal de Itaguaí - Secretaria de Fazenda</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Novo Formulário BIC
          </Badge>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Salvar Rascunho
            </Button>
            <Button onClick={handleSave} className="bg-white text-blue-600 hover:bg-gray-100">
              <Save className="h-4 w-4 mr-2" />
              Salvar BIC
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Dados Básicos */}
        <FormularioSection
          id="dadosBasicos"
          title="Dados Básicos do Imóvel"
          description="Inscrição, lançamento, revisão e dados do proprietário"
          icon={FileText}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          isOpen={openSections.dadosBasicos}
          onToggle={() => toggleSection("dadosBasicos")}
        >
          <DadosBasicosSection
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </FormularioSection>

        {/* I - Informações sobre o Logradouro */}
        <FormularioSection
          id="logradouro"
          title="I - Informações sobre o Logradouro"
          description="Pavimentação, iluminação, rede de esgoto, água e coleta de lixo"
          icon={MapPin}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          isOpen={openSections.logradouro}
          onToggle={() => toggleSection("logradouro")}
        >
          <LogradouroSection formData={formData} handleCheckboxChange={handleCheckboxChange} />
        </FormularioSection>

        {/* II - Informações sobre o Terreno */}
        <FormularioSection
          id="terreno"
          title="II - Informações sobre o Terreno"
          description="Situação, características do solo, topografia e nivelamento"
          icon={Layers}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-50"
          isOpen={openSections.terreno}
          onToggle={() => toggleSection("terreno")}
        >
          <TerrenoSection formData={formData} handleNestedCheckboxChange={handleNestedCheckboxChange} />
        </FormularioSection>

        {/* III - Metragens */}
        <FormularioSection
          id="metragens"
          title="III - Metragens"
          description="Área do terreno, testada e área edificada"
          icon={Ruler}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          isOpen={openSections.metragens}
          onToggle={() => toggleSection("metragens")}
        >
          <MetragensSection formData={formData} handleNestedInputChange={handleNestedInputChange} />
        </FormularioSection>

        {/* IV - Informações sobre a Construção */}
        <FormularioSection
          id="construcao"
          title="IV - Informações sobre a Construção"
          description="Tipo, uso, materiais, acabamentos e características construtivas"
          icon={Building}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-50"
          isOpen={openSections.construcao}
          onToggle={() => toggleSection("construcao")}
        >
          <ConstrucaoSection formData={formData} handleNestedCheckboxChange={handleNestedCheckboxChange} />
        </FormularioSection>

        {/* Serventias e Avaliação Urbanística */}
        <FormularioSection
          id="serventias"
          title="Serventias e Características Complementares"
          description="Cômodos, avaliação urbanística e calçamento"
          icon={Home}
          iconColor="text-teal-600"
          iconBgColor="bg-teal-50"
          isOpen={openSections.serventias}
          onToggle={() => toggleSection("serventias")}
        >
          <ServentiasSection
            formData={formData}
            handleCheckboxChange={handleCheckboxChange}
            handleNestedCheckboxChange={handleNestedCheckboxChange}
            handleInputChange={handleInputChange}
          />
        </FormularioSection>

        {/* Avaliação Urbanística */}
        <FormularioSection
          id="avaliacaoUrbanistica"
          title="Avaliação Urbanística e Observações"
          description="Avaliação do logradouro, calçamento e observações gerais"
          icon={MapPin}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-50"
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
  )
}