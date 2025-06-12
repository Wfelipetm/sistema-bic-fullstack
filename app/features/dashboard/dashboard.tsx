"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, BarChart3, Clock, CheckCircle, Users, TrendingUp, Plus } from "lucide-react"

// Helpers para badge de status/tipo (ajuste conforme seu projeto)
function getStatusColor(status: string) {
  switch (status) {
    case "Concluído":
      return "bg-green-100 text-green-800"
    case "Pendente":
      return "bg-yellow-100 text-yellow-800"
    case "Em andamento":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
function getTipoColor(tipo: string) {
  switch (tipo) {
    case "Técnico":
      return "bg-blue-100 text-blue-800"
    case "Administrativo":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// StatCard
interface StatCardProps {
  title: string
  value: string
  description: string
  icon: string
  color: string
  aura: string
}
function StatCard({ title, value, description, icon, color, aura }: StatCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "FileText":
        return <FileText className={`h-4 w-4 ${color}`} />
      case "BarChart3":
        return <BarChart3 className={`h-4 w-4 ${color}`} />
      case "Clock":
        return <Clock className={`h-4 w-4 ${color}`} />
      case "CheckCircle":
        return <CheckCircle className={`h-4 w-4 ${color}`} />
      default:
        return <FileText className={`h-4 w-4 ${color}`} />
    }
  }
  return (
    <Card className={`border-0 bg-white transition-shadow ${aura}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-transparent">
        <CardTitle className={`text-sm font-medium ${color}`}>{title}</CardTitle>
        <div className="p-2 rounded-lg bg-white">{renderIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <p className={`text-xs ${color}`}>{description}</p>
      </CardContent>
    </Card>
  )
}

// QuickActionButton
import type { LucideIcon } from "lucide-react"
interface QuickActionButtonProps {
  icon: LucideIcon
  title: string
  description: string
  onClick?: () => void
}
function QuickActionButton({ icon: Icon, title, description, onClick }: QuickActionButtonProps) {
  return (
    <Button variant="outline" className="w-full justify-start h-12" onClick={onClick}>
      <Icon className="h-4 w-4 mr-3" />
      <div className="text-left">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Button>
  )
}

// RecentFormCard
interface RecentFormProps {
  id: string
  local: string
  data: string
  status: string
  tecnico: string
  tipo: string
}
function RecentFormCard({ id, local, data, status, tecnico, tipo }: RecentFormProps) {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-medium text-gray-900">#{id}</p>
          <Badge variant="outline" className={getTipoColor(tipo)}>
            {tipo}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-1">{local}</p>
        <p className="text-xs text-gray-500">Técnico: {tecnico}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-2">{data}</p>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>
    </div>
  )
}

// RecentFormsList
const recentForms = [
  {
    id: "001",
    local: "Obra A",
    data: "10/06/2025",
    status: "Concluído",
    tecnico: "João Silva",
    tipo: "Técnico",
  },
  {
    id: "002",
    local: "Obra B",
    data: "09/06/2025",
    status: "Pendente",
    tecnico: "Maria Souza",
    tipo: "Administrativo",
  },
]
function RecentFormsList() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Formulários Recentes</CardTitle>
        <CardDescription>Últimos formulários preenchidos no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentForms.map((form) => (
            <RecentFormCard
              key={form.id}
              id={form.id}
              local={form.local}
              data={form.data}
              status={form.status}
              tecnico={form.tecnico}
              tipo={form.tipo}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// QuickActions
function QuickActions() {
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

// Dashboard stats data
const dashboardStats = [
  {
    title: "Documentos",
    value: "120",
    description: "Total de documentos",
    icon: "FileText",
    color: "text-yellow-800",
    aura: "ring-2 ring-yellow-100 border-yellow-200 shadow-lg hover:shadow-yellow-200 hover:bg-yellow-50 hover:border-yellow-300",
  },
  {
    title: "Relatórios",
    value: "80",
    description: "Relatórios gerados",
    icon: "BarChart3",
    color: "text-blue-900",
    aura: "ring-2 ring-blue-100 border-blue-200 shadow-lg hover:shadow-blue-200 hover:bg-blue-50 hover:border-blue-300",
  },
  {
    title: "Tempo Médio",
    value: "2h 30m",
    description: "Tempo médio de resposta",
    icon: "Clock",
    color: "text-green-900",
    aura: "ring-2 ring-green-100 border-green-200 shadow-lg hover:shadow-green-200 hover:bg-green-50 hover:border-green-300",
  },
  {
    title: "Concluídos",
    value: "95",
    description: "Tarefas concluídas",
    icon: "CheckCircle",
    color: "text-red-900",
    aura: "ring-2 ring-red-100 border-red-200 shadow-lg hover:shadow-red-200 hover:bg-red-50 hover:border-red-300",
  },
]

// Dashboard page
export default function Dashboard() {
  return (
    <div className="space-y-6 bg-blue-50 min-h-screen p-6">
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
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            color={stat.color}
            aura={stat.aura}
          />
        ))}
      </div>

      {/* Recent Forms and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentFormsList />
        <QuickActions />
      </div>
    </div>
  )
}
