"use client"

import type * as React from "react"
import { Building2, FileText, BarChart3, Settings, Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
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
    {
      title: "Configurações",
      url: "#",
      icon: Settings,
      id: "configuracoes",
      description: "Configurações do sistema",
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BIC Sistema</span>
                  <span className="truncate text-xs text-muted-foreground">Técnico Edificações</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.id}
                    tooltip={item.description}
                    onClick={() => setActiveView(item.id)}
                  >
                    <button className="flex items-center gap-2 w-full">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
