import type { ViewType, BreadcrumbInfo } from "../types/navigation"

export const getBreadcrumbInfo = (view: ViewType): BreadcrumbInfo => {
  switch (view) {
    case "dashboard":
      return { title: "Dashboard", subtitle: "Visão geral do sistema" }
    case "formulario":
      return { title: "Formulário Técnico", subtitle: "Preenchimento de dados técnicos" }
    case "relatorios":
      return { title: "Relatórios", subtitle: "Geração e visualização de relatórios" }
    case "configuracoes":
      return { title: "Configurações", subtitle: "Configurações do sistema" }
    default:
      return { title: "Dashboard", subtitle: "Visão geral do sistema" }
  }
}
