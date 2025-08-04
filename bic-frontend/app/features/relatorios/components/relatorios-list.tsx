import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RelatorioItem } from "./relatorio-item"
import type { Relatorio } from "@/app/types/relatorio"

interface RelatoriosListProps {
  relatorios: Relatorio[]
  onPreview: (id: string) => void
  onDownload: (id: string) => void
  onPrint: (id: string) => void
}

export function RelatoriosList({ relatorios, onPreview, onDownload, onPrint }: RelatoriosListProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Relatórios Disponíveis</CardTitle>
        <CardDescription>Lista de todos os relatórios técnicos gerados no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relatorios.map((relatorio) => (
            <RelatorioItem
              key={relatorio.id}
              relatorio={relatorio}
              onPreview={onPreview}
              onDownload={onDownload}
              onPrint={onPrint}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
