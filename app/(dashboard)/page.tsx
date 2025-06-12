import { StatCard } from "@/components/dashboard/stat-card"
import { RecentList } from "@/components/dashboard/recent-list"
import { DailyRecordsChart } from "@/components/dashboard/daily-records-chart"
import { FileText, BarChart3, Clock, Users } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Formulários Preenchidos",
      value: "17",
      description: "Total de formulários na base",
      icon: FileText,
      iconColor: "text-blue-500",
    },
    {
      title: "Técnicos Ativos",
      value: "4",
      description: "Total de técnicos no sistema",
      icon: Users,
      iconColor: "text-orange-500",
    },
    {
      title: "Pendentes de Revisão",
      value: "3",
      description: "Formulários aguardando revisão",
      icon: Clock,
      iconColor: "text-green-500",
    },
    {
      title: "Relatórios Gerados",
      value: "12",
      description: "Total de relatórios no mês atual",
      icon: BarChart3,
      iconColor: "text-red-500",
    },
  ]

  const recentForms = [
    { title: "BIC-001 - Rua das Flores, 123", date: "12/06/2025" },
    { title: "BIC-002 - Av. Principal, 456", date: "12/06/2025" },
    { title: "BIC-003 - Rua do Comércio, 789", date: "11/06/2025" },
    { title: "BIC-004 - Praça Central, 321", date: "11/06/2025" },
    { title: "BIC-005 - Alameda dos Anjos, 500", date: "10/06/2025" },
  ]

  const recentReports = [
    { title: "Relatório Técnico - João Silva", date: "12/06/2025" },
    { title: "Relatório de Pendências - Maria Santos", date: "11/06/2025" },
    { title: "Relatório Mensal - Consolidado", date: "10/06/2025" },
    { title: "Relatório de Revisão - Ana Oliveira", date: "09/06/2025" },
    { title: "Relatório de Loteamento - Pedro Costa", date: "08/06/2025" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Aqui está um resumo do sistema BIC.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentList title="Formulários Recentes" items={recentForms} ctaText="+ 5 outros formulários" />
        <RecentList title="Relatórios Recentes" items={recentReports} ctaText="+ 2 outros relatórios" />
      </div>
      <DailyRecordsChart />
    </div>
  )
}
