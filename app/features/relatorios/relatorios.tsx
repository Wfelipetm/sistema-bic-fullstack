"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { FiltrosRelatorioCard } from "./components/filtros-relatorio"
import { RelatoriosList } from "./components/relatorios-list"
import RelatorioPrintTemplate from "./components/relatorio-print-template"

import { mockRelatorios } from "@/app/constants/mock-data"
import type { FiltrosRelatorio } from "@/app/types/relatorio"

export default function Relatorios() {
  const [filtros, setFiltros] = useState<FiltrosRelatorio>({
    dataInicio: "",
    dataFim: "",
    status: "all",
    tecnico: "all",
  })

  const [relatorios, setRelatorios] = useState([])

  useEffect(() => {
    fetch("http://10.200.200.187:5001/relatorios")
      .then((res) => res.json())
      .then((data) => setRelatorios(data))
  }, [])

  const handlePreview = (relatorioId: string) => {
    console.log(`Visualizando relatório ${relatorioId}`)
    alert(`Abrindo visualização do relatório ${relatorioId}`)
  }

  const handleDownload = (relatorioId: string) => {
    console.log(`Baixando relatório ${relatorioId}`)
    alert(`Relatório ${relatorioId} baixado com sucesso!`)
  }

  const handlePrint = (relatorioId: string) => {
    window.print()
    console.log(`Imprimindo relatório ${relatorioId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {mockRelatorios.length} Relatórios
          </Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Novo Relatório
        </Button>
      </div>

      {/* Filtros */}
      <FiltrosRelatorioCard filtros={filtros} setFiltros={setFiltros} />

      {/* Lista de Relatórios */}
      <RelatoriosList
        relatorios={relatorios}
        onPreview={handlePreview}
        onDownload={handleDownload}
        onPrint={handlePrint}
      />

      {/* Modelo de Relatório para Impressão */}
      <RelatorioPrintTemplate />
    </div>
  )
}
