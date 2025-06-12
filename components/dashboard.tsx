"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, BarChart3, Clock, TrendingUp, Users, CheckCircle } from "lucide-react"

export default function Dashboard() {
  const stats = [
    {
      title: "Formulários Preenchidos",
      value: "24",
      description: "+12% em relação ao mês anterior",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
    },
    {
      title: "Relatórios Gerados",
      value: "18",
      description: "Últimos 30 dias",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+8%",
    },
    {
      title: "Pendentes",
      value: "6",
      description: "Aguardando revisão",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "-3%",
    },
    {
      title: "Taxa de Conclusão",
      value: "92%",
      description: "Meta: 90%",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+2%",
    },
  ]

  const recentForms = [
    {
      id: "BIC-001",
      local: "Rua das Flores, 123 - Centro",
      data: "15/01/2024",
      status: "Concluído",
      tecnico: "João Silva",
      tipo: "Residencial",
    },
    {
      id: "BIC-002",
      local: "Av. Principal, 456 - Jardim América",
      data: "14/01/2024",
      status: "Pendente",
      tecnico: "Maria Santos",
      tipo: "Comercial",
    },
    {
      id: "BIC-003",
      local: "Rua do Comércio, 789 - Vila Nova",
      data: "13/01/2024",
      status: "Concluído",
      tecnico: "Pedro Costa",
      tipo: "Industrial",
    },
    {
      id: "BIC-004",
      local: "Praça Central, 321 - Centro",
      data: "12/01/2024",
      status: "Em Revisão",
      tecnico: "Ana Oliveira",
      tipo: "Público",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Bem-vindo de volta!</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Formulário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.trend}
                </span>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Forms */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Formulários Recentes</CardTitle>
            <CardDescription>Últimos formulários preenchidos no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentForms.map((form) => (
                <div key={form.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium text-gray-900">#{form.id}</p>
                      <Badge variant="outline" className={getTipoColor(form.tipo)}>
                        {form.tipo}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{form.local}</p>
                    <p className="text-xs text-gray-500">Técnico: {form.tecnico}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">{form.data}</p>
                    <Badge className={getStatusColor(form.status)}>{form.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12">
              <FileText className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">Novo Formulário</div>
                <div className="text-xs text-gray-500">Iniciar preenchimento</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <BarChart3 className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">Gerar Relatório</div>
                <div className="text-xs text-gray-500">Criar novo relatório</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <Users className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">Gerenciar Técnicos</div>
                <div className="text-xs text-gray-500">Administrar usuários</div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <TrendingUp className="h-4 w-4 mr-3" />
              <div className="text-left">
                <div className="font-medium">Análise de Dados</div>
                <div className="text-xs text-gray-500">Visualizar métricas</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
