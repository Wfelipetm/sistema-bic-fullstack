"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Plus, Save, FileText, MapPin, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function FormularioTecnico() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    login: true,
    logradouro: false,
    terreno_caracteristicas: false,
    terreno_topografia: false,
    terreno_nivelamento: false,
  })

  const [formData, setFormData] = useState({
    numeroInscricao: "",
    loteamento: "",
    revisao: "",
    numeroBote: "",
    numeroQuadra: "",
    nomeLogradouro: "",
    distrito: "",
    endereco: "",
    cep: "",
    proprietario: "",
    cpf: "",
    observacoes: "",
    logradouro: {
      pavimentacao: false,
      iluminacaoPublica: false,
      redeEsgoto: false,
      redeAgua: false,
    },
    terrenoCaracteristicas: {
      alagadico: false,
      arenoso: false,
      rochoso: false,
    },
    terrenoTopografia: {
      aclive: false,
      declive: false,
      encosta: false,
      horizontal: false,
    },
    terrenoNivelamento: {
      abaixoNivel: false,
      aoNivel: false,
      acimaNivel: false,
    },
    calcamento: {
      tipo: {
        sem_asfalto: false,
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
    serventias: {
      sala: 0,
      quarto: 0,
      copa: 0,
      cozinha: 0,
      banheiro: 0,
      garagem: 0,
      varanda: 0,
      corredor: 0,
      area: 0,
      porao_habital: 0,
    },
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

  const handleCheckboxChange = (section: string, field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: checked,
      },
    }))
  }

  const handleSave = () => {
    alert("Formulário salvo com sucesso!")
  }

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "login":
        return FileText
      case "logradouro":
        return MapPin
      default:
        return Layers
    }
  }

  const sections = [
    {
      id: "login",
      title: "Informações Básicas",
      description: "Dados principais do imóvel e proprietário",
      icon: FileText,
    },
    {
      id: "logradouro",
      title: "Informações sobre Logradouro",
      description: "Infraestrutura e serviços públicos",
      icon: MapPin,
    },
    {
      id: "terreno_caracteristicas",
      title: "Características do Solo",
      description: "Propriedades físicas do terreno",
      icon: Layers,
    },
    {
      id: "terreno_topografia",
      title: "Topografia do Terreno",
      description: "Características topográficas",
      icon: Layers,
    },
    {
      id: "terreno_nivelamento",
      title: "Nivelamento do Terreno",
      description: "Informações sobre nivelamento",
      icon: Layers,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Novo Formulário
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Salvar Rascunho</Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Formulário
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Informações Básicas */}
        <Card className="border-0 shadow-sm">
          <Collapsible open={openSections.login} onOpenChange={() => toggleSection("login")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {openSections.login ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        Informações Básicas
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Dados principais do imóvel e proprietário</p>
                    </div>
                  </div>
                  <Badge variant={openSections.login ? "default" : "secondary"}>
                    {openSections.login ? "Aberto" : "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="numeroInscricao" className="text-sm font-medium">
                      Número de inscrição *
                    </Label>
                    <Input
                      id="numeroInscricao"
                      placeholder="Ex: 12345"
                      value={formData.numeroInscricao}
                      onChange={(e) => handleInputChange("numeroInscricao", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loteamento" className="text-sm font-medium">
                      Loteamento
                    </Label>
                    <Input
                      id="loteamento"
                      placeholder="Nome do loteamento"
                      value={formData.loteamento}
                      onChange={(e) => handleInputChange("loteamento", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="revisao" className="text-sm font-medium">
                      Revisão
                    </Label>
                    <Input
                      id="revisao"
                      placeholder="Número da revisão"
                      value={formData.revisao}
                      onChange={(e) => handleInputChange("revisao", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroBote" className="text-sm font-medium">
                      Número de lote *
                    </Label>
                    <Input
                      id="numeroBote"
                      placeholder="Ex: 001"
                      value={formData.numeroBote}
                      onChange={(e) => handleInputChange("numeroBote", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroQuadra" className="text-sm font-medium">
                      Número da quadra *
                    </Label>
                    <Input
                      id="numeroQuadra"
                      placeholder="Ex: A"
                      value={formData.numeroQuadra}
                      onChange={(e) => handleInputChange("numeroQuadra", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="distrito" className="text-sm font-medium">
                      Distrito
                    </Label>
                    <Input
                      id="distrito"
                      placeholder="Nome do distrito"
                      value={formData.distrito}
                      onChange={(e) => handleInputChange("distrito", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="nomeLogradouro" className="text-sm font-medium">
                      Nome do logradouro *
                    </Label>
                    <Input
                      id="nomeLogradouro"
                      placeholder="Ex: Rua das Flores"
                      value={formData.nomeLogradouro}
                      onChange={(e) => handleInputChange("nomeLogradouro", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cep" className="text-sm font-medium">
                      CEP
                    </Label>
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={(e) => handleInputChange("cep", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="endereco" className="text-sm font-medium">
                      Endereço completo
                    </Label>
                    <Input
                      id="endereco"
                      placeholder="Endereço completo do imóvel"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange("endereco", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf" className="text-sm font-medium">
                      CPF do proprietário
                    </Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="proprietario" className="text-sm font-medium">
                      Nome do proprietário *
                    </Label>
                    <Input
                      id="proprietario"
                      placeholder="Nome completo do proprietário"
                      value={formData.proprietario}
                      onChange={(e) => handleInputChange("proprietario", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor="observacoes" className="text-sm font-medium">
                      Observações
                    </Label>
                    <Textarea
                      id="observacoes"
                      placeholder="Observações adicionais sobre o imóvel..."
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange("observacoes", e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Informações sobre logradouro */}
        <Card className="border-0 shadow-sm">
          <Collapsible open={openSections.logradouro} onOpenChange={() => toggleSection("logradouro")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {openSections.logradouro ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        Informações sobre Logradouro
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Infraestrutura e serviços públicos</p>
                    </div>
                  </div>
                  <Badge variant={openSections.logradouro ? "default" : "secondary"}>
                    {openSections.logradouro ? "Aberto" : "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "pavimentacao", label: "Pavimentação", description: "Via pavimentada" },
                    { id: "iluminacaoPublica", label: "Iluminação Pública", description: "Iluminação adequada" },
                    { id: "redeEsgoto", label: "Rede de Esgoto", description: "Sistema de esgotamento" },
                    { id: "redeAgua", label: "Rede de Água", description: "Abastecimento de água" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={formData.logradouro[item.id as keyof typeof formData.logradouro]}
                        onCheckedChange={(checked) => handleCheckboxChange("logradouro", item.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={item.id} className="font-medium cursor-pointer">
                          {item.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar item personalizado
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Características do Solo */}
        <Card className="border-0 shadow-sm">
          <Collapsible
            open={openSections.terreno_caracteristicas}
            onOpenChange={() => toggleSection("terreno_caracteristicas")}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Layers className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {openSections.terreno_caracteristicas ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        Características do Solo
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Propriedades físicas do terreno</p>
                    </div>
                  </div>
                  <Badge variant={openSections.terreno_caracteristicas ? "default" : "secondary"}>
                    {openSections.terreno_caracteristicas ? "Aberto" : "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "alagadico", label: "Alagadiço", description: "Solo com tendência ao alagamento" },
                    { id: "arenoso", label: "Arenoso", description: "Solo com predominância de areia" },
                    { id: "rochoso", label: "Rochoso", description: "Solo com presença de rochas" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={
                          formData.terrenoCaracteristicas[item.id as keyof typeof formData.terrenoCaracteristicas]
                        }
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("terrenoCaracteristicas", item.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={item.id} className="font-medium cursor-pointer">
                          {item.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar característica
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Topografia */}
        <Card className="border-0 shadow-sm">
          <Collapsible open={openSections.terreno_topografia} onOpenChange={() => toggleSection("terreno_topografia")}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Layers className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {openSections.terreno_topografia ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        Topografia do Terreno
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Características topográficas</p>
                    </div>
                  </div>
                  <Badge variant={openSections.terreno_topografia ? "default" : "secondary"}>
                    {openSections.terreno_topografia ? "Aberto" : "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "aclive", label: "Aclive", description: "Terreno em subida" },
                    { id: "declive", label: "Declive", description: "Terreno em descida" },
                    { id: "encosta", label: "Encosta", description: "Terreno em encosta" },
                    { id: "horizontal", label: "Horizontal", description: "Terreno plano" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={formData.terrenoTopografia[item.id as keyof typeof formData.terrenoTopografia]}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("terrenoTopografia", item.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={item.id} className="font-medium cursor-pointer">
                          {item.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar característica topográfica
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Nivelamento */}
        <Card className="border-0 shadow-sm">
          <Collapsible
            open={openSections.terreno_nivelamento}
            onOpenChange={() => toggleSection("terreno_nivelamento")}
          >
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-50 rounded-lg">
                      <Layers className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {openSections.terreno_nivelamento ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        Nivelamento do Terreno
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Informações sobre nivelamento</p>
                    </div>
                  </div>
                  <Badge variant={openSections.terreno_nivelamento ? "default" : "secondary"}>
                    {openSections.terreno_nivelamento ? "Aberto" : "Fechado"}
                  </Badge>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "abaixoNivel", label: "Abaixo do nível", description: "Terreno abaixo do nível da rua" },
                    { id: "aoNivel", label: "Ao nível", description: "Terreno no mesmo nível da rua" },
                    { id: "acimaNivel", label: "Acima do nível", description: "Terreno acima do nível da rua" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        id={item.id}
                        checked={formData.terrenoNivelamento[item.id as keyof typeof formData.terrenoNivelamento]}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("terrenoNivelamento", item.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={item.id} className="font-medium cursor-pointer">
                          {item.label}
                        </Label>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar informação de nivelamento
                </Button>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  )
}
