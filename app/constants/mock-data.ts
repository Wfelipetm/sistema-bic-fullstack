import type { UserProfile } from "@/types/user"
import type { Relatorio } from "@/types/relatorio"

export const currentUser: UserProfile = {
  id: "1",
  name: "João Silva",
  email: "joao.silva@bic.com",
  role: "Técnico em Edificações",
  crea: "12345",
}

export const mockRelatorios: Relatorio[] = [
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

export const dashboardStats = [
  {
    title: "Formulários Preenchidos",
    value: "24",
    description: "+12% em relação ao mês anterior",
    icon: "FileText",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: "+12%",
  },
  {
    title: "Relatórios Gerados",
    value: "18",
    description: "Últimos 30 dias",
    icon: "BarChart3",
    color: "text-green-600",
    bgColor: "bg-green-50",
    trend: "+8%",
  },
  {
    title: "Pendentes",
    value: "6",
    description: "Aguardando revisão",
    icon: "Clock",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    trend: "-3%",
  },
  {
    title: "Taxa de Conclusão",
    value: "92%",
    description: "Meta: 90%",
    icon: "CheckCircle",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    trend: "+2%",
  },
]

export const recentForms = [
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
