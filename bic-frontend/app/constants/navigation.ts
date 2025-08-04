// import { FileText, BarChart3, Settings, Home } from "lucide-react"
// import type { NavigationItem, ViewType, BreadcrumbInfo } from "../types/navigation"

// export const navigationItems: NavigationItem[] = [
//   // {
//   //   title: "Dashboard",
//   //   url: "#",
//   //   icon: Home,
//   //   id: "dashboard",
//   //   description: "Visão geral do sistema",
//   // },
//   {
//     title: "Formulário Técnico",
//     url: "#",
//     icon: FileText,
//     id: "formulario",
//     description: "Preenchimento de dados",
//   },
//   {
//     title: "Relatórios",
//     url: "#",
//     icon: BarChart3,
//     id: "relatorios",
//     description: "Visualizar e imprimir",
//   },
//   // {
//   //   title: "Configurações",
//   //   url: "#",
//   //   icon: Settings,
//   //   id: "configuracoes",
//   //   description: "Configurações do sistema",
//   // },
// ]

// // export const getBreadcrumbInfo = (view: ViewType): BreadcrumbInfo => {
// //   switch (view) {
// //     case "dashboard":
// //       return { title: "Dashboard", subtitle: "Visão geral do sistema" }
// //     case "formulario":
// //       return { title: "Formulário Técnico", subtitle: "Preenchimento de dados técnicos" }
// //     case "relatorios":
// //       return { title: "Relatórios", subtitle: "Geração e visualização de relatórios" }
// //     case "configuracoes":
// //       return { title: "Configurações", subtitle: "Configurações do sistema" }
// //     default:
// //       return { title: "Dashboard", subtitle: "Visão geral do sistema" }
// //   }
// // }


// export const getBreadcrumbInfo = (view: ViewType): BreadcrumbInfo => {
//   switch (view) {
//     case "formulario":
//       return { title: "Formulário Técnico", subtitle: "Preenchimento de dados técnicos" }
//     default:
//       return { title: "Formulário Técnico", subtitle: "Preenchimento de dados técnicos" }
//   }
// }

import { FileText, BarChart3 } from "lucide-react"
import type { NavigationItem, ViewType, BreadcrumbInfo } from "../types/navigation"

export const navigationItems: NavigationItem[] = [
  {
    title: "Formulário BIC",
    url: "#",
    icon: FileText,
    id: "formulario"
  },
  {
    title: "Relatórios",
    url: "#",
    icon: BarChart3,
    id: "relatorios"
  },
]

export const getBreadcrumbInfo = (view: ViewType): BreadcrumbInfo => {
  switch (view) {
    case "formulario":
      return {
        title: "Formulário BIC",
        subtitle: "Boletim de Informação Cadastral - Preenchimento de dados técnicos",

      }
    case "relatorios":
      return {
        title: "Relatórios Técnicos",
        subtitle: "Consulta, visualização e impressão de boletins cadastrais",

      }
    default:
      return {
        title: "Formulário BIC",
        subtitle: "Boletim de Informação Cadastral - Preenchimento de dados técnicos",

      }
  }
}

