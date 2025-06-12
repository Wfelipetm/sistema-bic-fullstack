import type React from "react"
export type ViewType = "dashboard" | "formulario" | "relatorios" | "configuracoes"

export interface NavigationItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
  id: ViewType
  description: string
}

export interface BreadcrumbInfo {
  title: string
  subtitle: string
}
