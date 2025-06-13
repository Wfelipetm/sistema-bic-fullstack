import { FileText, BarChart3, Settings, Home } from "lucide-react"
import type { NavigationItem, ViewType, BreadcrumbInfo } from "../types/navigation"

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    id: "dashboard",
    description: "Visão geral do sistema",
  },
  {
    title: "Formulário Técnico",
    url: "#",
    icon: FileText,
    id: "formulario",
    description: "Preenchimento de dados",
  },
  {
    title: "Relatórios",
    url: "#",
    icon: BarChart3,
    id: "relatorios",
    description: "Visualizar e imprimir",
  },

]

export const getBreadcrumbInfo = (view: ViewType): BreadcrumbInfo => {
  switch (view) {
    case "dashboard":
      return { title: "", subtitle: "" }
    case "formulario":
      return { title: "", subtitle: "" }
    case "relatorios":
      return { title: "", subtitle: "" }

    default:
      return { title: "", subtitle: "" }
  }
}
