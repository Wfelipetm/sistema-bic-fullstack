"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, Eye, Search, Filter, FileText } from "lucide-react"

export default function Relatorios() {
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    status: "all",
    tecnico: "all",
  })

  const relatorios = [
    {
      id: "BIC-REL-001",
      titulo: "Relatório Técnico - Rua das Flores, 123",
      data: "15/01/2024",
      status: "Concluído",
      tecnico: "João Silva",
      tipo: "Residencial",
      tamanho: "2.3 MB",
    },
    {
      id: "BIC-REL-002",
      titulo: "Relatório Técnico - Av. Principal, 456",
      data: "14/01/2024",
      status: "Pendente",
      tecnico: "Maria Santos",
      tipo: "Comercial",
      tamanho: "1.8 MB",
    },
    {
      id: "BIC-REL-003",
      titulo: "Relatório Técnico - Rua do Comércio, 789",
      data: "13/01/2024",
      status: "Concluído",
      tecnico: "Pedro Costa",
      tipo: "Industrial",
      tamanho: "3.1 MB",
    },
    {
      id: "BIC-REL-004",
      titulo: "Relatório Técnico - Praça Central, 321",
      data: "12/01/2024",
      status: "Em Revisão",
      tecnico: "Ana Oliveira",
      tipo: "Público",
      tamanho: "2.7 MB",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800 border-green-200"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Em Revisão":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "Residencial":
        return "bg-purple-100 text-purple-800"
      case "Comercial":
        return "bg-blue-100 text-blue-800"
      case "Industrial":
        return "bg-orange-100 text-orange-800"
      case "Público":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePrint = (relatorioId: string) => {
    window.print()
    console.log(`Imprimindo relatório ${relatorioId}`)
  }

  const handleDownload = (relatorioId: string) => {
    console.log(`Baixando relatório ${relatorioId}`)
    alert(`Relatório ${relatorioId} baixado com sucesso!`)
  }

  const handlePreview = (relatorioId: string) => {
    console.log(`Visualizando relatório ${relatorioId}`)
    alert(`Abrindo visualização do relatório ${relatorioId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {relatorios.length} Relatórios
          </Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Novo Relatório
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-lg">Filtros de Busca</CardTitle>
          </div>
          <CardDescription>Filtre os relatórios por data, status ou técnico responsável</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dataInicio" className="text-sm font-medium">
                Data Início
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros((prev) => ({ ...prev, dataInicio: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dataFim" className="text-sm font-medium">
                Data Fim
              </Label>
              <Input
                id="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros((prev) => ({ ...prev, dataFim: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={filtros.status}
                onValueChange={(value) => setFiltros((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="revisao">Em Revisão</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tecnico" className="text-sm font-medium">
                Técnico
              </Label>
              <Select
                value={filtros.tecnico}
                onValueChange={(value) => setFiltros((prev) => ({ ...prev, tecnico: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos os técnicos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os técnicos</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Costa</SelectItem>
                  <SelectItem value="ana">Ana Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Buscar Relatórios
            </Button>
            <Button variant="outline">Limpar Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Relatórios */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Relatórios Disponíveis</CardTitle>
          <CardDescription>Lista de todos os relatórios técnicos gerados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {relatorios.map((relatorio) => (
              <div
                key={relatorio.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{relatorio.titulo}</h3>
                      <p className="text-sm text-gray-500">ID: {relatorio.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 {relatorio.data}</span>
                    <span>👤 {relatorio.tecnico}</span>
                    <span>📁 {relatorio.tamanho}</span>
                    <Badge variant="outline" className={getTipoColor(relatorio.tipo)}>
                      {relatorio.tipo}
                    </Badge>
                    <Badge className={getStatusColor(relatorio.status)}>{relatorio.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handlePreview(relatorio.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(relatorio.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handlePrint(relatorio.id)}>
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modelo de Relatório para Impressão */}
      <div className="print:block hidden">
        <Card className="border-0 shadow-sm">
          <CardHeader className="text-center border-b">
            <CardTitle className="text-xl font-bold">RELATÓRIO TÉCNICO DE EDIFICAÇÕES</CardTitle>
            <CardDescription className="text-base">Sistema BIC - Boletim de Informações Cadastrais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <strong>Número de Inscrição:</strong> 12345
              </div>
              <div>
                <strong>Data de Emissão:</strong> {new Date().toLocaleDateString("pt-BR")}
              </div>
              <div>
                <strong>Loteamento:</strong> Vila Nova
              </div>
              <div>
                <strong>Técnico Responsável:</strong> João Silva
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">INFORMAÇÕES DO LOGRADOURO</h3>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Pavimentação: Sim
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Iluminação Pública: Sim
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Rede de Esgoto: Não
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Rede de Água: Sim
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">CARACTERÍSTICAS DO TERRENO</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <strong className="block mb-2">Solo:</strong>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Arenoso
                    </li>
                  </ul>
                </div>
                <div>
                  <strong className="block mb-2">Topografia:</strong>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Horizontal
                    </li>
                  </ul>
                </div>
                <div>
                  <strong className="block mb-2">Nivelamento:</strong>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Ao nível
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t">
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-t border-black w-48 mx-auto mb-2"></div>
                  <p className="font-medium">Assinatura do Técnico</p>
                  <p className="text-sm text-gray-600">João Silva - CREA 12345</p>
                </div>
                <div className="text-center">
                  <div className="border-t border-black w-48 mx-auto mb-2"></div>
                  <p className="font-medium">Data e Carimbo</p>
                  <p className="text-sm text-gray-600">{new Date().toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
