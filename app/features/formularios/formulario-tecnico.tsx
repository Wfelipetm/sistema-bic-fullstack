"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
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

export default function FormularioTecnico() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dadosBasicos: true,
    logradouro: false,
    terreno: false,
    metragens: false,
    construcao: false,
    serventias: false,
    avaliacaoUrbanistica: false,
  })

  const [formData, setFormData] = useState<FormularioData>({
    inscricaoNumero: "",
    lancamentoNovo: { dia: "", mes: "", ano: "" },
    revisao: { dia: "", mes: "", ano: "" },
    lote: "",
    quadra: "",
    loteamento: "",
    distrito: "",
    endereco: "",
    cep: "",
    proprietario: "",
    cpf: "",
    telefone: "",
    logradouro: {
      pavimentacao: false,
      iluminacaoPublica: false,
      redeEsgoto: false,
      redeAgua: false,
      coletaLixo: false,
    },
    terreno: {
      situacao: {
        encravado: false,
        vila: false,
        meioQuadra: false,
        esquina: false,
        comTresFrente: false,
        todaQuadra: false,
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
        abaixoNivel: false,
        aoNivel: false,
        acimaNivel: false,
      },
    },
    metragens: {
      areaTerreno: "",
      testada: "",
      areaEdificada: "",
    },
    construcao: {
      tipo: {
        casa: false,
        apartamento: false,
        sala: false,
        loja: false,
        galpao: false,
        templo: false,
      },
      uso: {
        residencial: false,
        comercial: false,
        servico: false,
        industrial: false,
        religioso: false,
      },
      tipoConstrucao: {
        madeira: false,
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
        estaque: false,
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
        pinturaSimples: false,
        pinturaLavavel: false,
        especial: false,
        reboco: false,
        sem: false,
      },
      acabamentoExterno: {
        caiacao: false,
        pinturaSimples: false,
        pinturaLavavel: false,
        especial: false,
        reboco: false,
        sem: false,
      },
    },
    serventias: {
      sala: false,
      quarto: false,
      copa: false,
      cozinha: false,
      banheiro: false,
      garagem: false,
      varanda: false,
      corredor: false,
      area: false,
      poraoHabital: false,
    },
    avaliacaoUrbanistica: "",
    calcamento: {
      tipo: {
        semAsfalto: false,
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
    },
    logradouroComPlaca: false,
    observacoes: "",
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
        ...prev[section as keyof typeof prev] as Record<string, any>,
        [field]: value,
      },
    }))
  }

  const handleCheckboxChange = (section: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as Record<string, any>,
        [field]: checked,
      },
    }))
  }

  const handleNestedCheckboxChange = (section: string, subsection: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section as keyof typeof prev] as Record<string, any>) || {}),
        [subsection]: {
          ...((prev[section as keyof typeof prev] as Record<string, any>)[subsection] || {}),
          [field]: checked,
        },
      },
    }))
  }

  const handleSave = () => {
    console.log("Dados do BIC salvos:", formData)
    alert("Formulário BIC salvo com sucesso!")
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
            handleNestedInputChange={handleNestedInputChange}
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
