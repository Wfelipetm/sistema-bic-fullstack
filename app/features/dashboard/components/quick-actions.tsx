import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickActionButton } from "./quick-action-button"
import { FileText, BarChart3, Users, TrendingUp } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <QuickActionButton icon={FileText} title="Novo Formulário" description="Iniciar preenchimento" />
        <QuickActionButton icon={BarChart3} title="Gerar Relatório" description="Criar novo relatório" />
        <QuickActionButton icon={Users} title="Gerenciar Técnicos" description="Administrar usuários" />
        <QuickActionButton icon={TrendingUp} title="Análise de Dados" description="Visualizar métricas" />
      </CardContent>
    </Card>
  )
}
