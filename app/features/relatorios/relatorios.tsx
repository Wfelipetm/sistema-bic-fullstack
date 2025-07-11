import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { FiltrosRelatorioCard } from "./components/filtros-relatorio"
import { RelatoriosList } from "./components/relatorios-list"
import RelatorioPrintTemplate from "./components/relatorio-print-template"

import type { FiltrosRelatorio } from "@/app/types/relatorio"
import type { ViewType } from "@/app/types/navigation"

interface RelatoriosProps {
  setActiveView: (view: ViewType) => void
}

export default function Relatorios({ setActiveView }: RelatoriosProps) {
  const router = useRouter()

  const [filtros, setFiltros] = useState<FiltrosRelatorio>({
    dataInicio: "",
    dataFim: "",
    status: "all",
    inscricao: "",
  })

  const [relatorios, setRelatorios] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/relatorios`)
      .then((res) => res.json())
      .then((data) => setRelatorios(data))
  }, [])

  const handlePreview = (relatorioId: string) => {
    alert(`Abrindo visualização do relatório ${relatorioId}`)
  }

  const handleDownload = (relatorioId: string) => {
    alert(`Relatório ${relatorioId} baixado com sucesso!`)
  }

  const handlePrint = (relatorioId: string) => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        
      
      </div>

      {/* Filtros */}
      <FiltrosRelatorioCard filtros={filtros} setFiltros={setFiltros} />

      {/* Lista de Relatórios */}
      {/* <RelatoriosList
        relatorios={relatorios}
        onPreview={handlePreview}
        onDownload={handleDownload}
        onPrint={handlePrint}
      /> */}

      {/* Modelo de Relatório para Impressão */}
      {/* <RelatorioPrintTemplate /> */}
    </div>
  )
}