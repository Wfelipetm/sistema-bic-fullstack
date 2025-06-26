"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { FiltrosRelatorioCard } from "./components/filtros-relatorio"
import RelatorioPrintTemplate from "./components/relatorio-print-template"

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            📊 Relatórios do Sistema
          </Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          Novo Relatório
        </Button>
      </div>

      {/* Componente completo com filtros e resultados */}
      <FiltrosRelatorioCard />

      {/* Modelo de Relatório para Impressão */}
      <RelatorioPrintTemplate />
    </div>
  )
}
