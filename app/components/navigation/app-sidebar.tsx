"use client"

import type * as React from "react"
import { Building2 } from "lucide-react"

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
  useSidebar,
} from "@/components/ui/sidebar"
import { navigationItems } from "@/app/constants/navigation"
import type { ViewType } from "@/app/types/navigation"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppSidebar({ activeView, setActiveView, ...props }: AppSidebarProps) {
  const { state } = useSidebar(); // 'expanded' ou 'collapsed'

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-24 -mt-1.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/* Removido o logo azul e o texto abaixo */}
              {/* <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Building2 className="size-4 mt-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">BIC Sistema</span>
                  <span className="truncate text-xs text-muted-foreground">Técnico Edificações</span>
                </div>
              </div> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
         
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.id}
                    tooltip={item.description}
                    onClick={() => setActiveView(item.id)}
                  >
                    <button className="flex items-center gap-2 w-full">
                      <item.icon className="size-4 text-blue-700 stroke-2" />
                      <span className="text-blue-700 font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Só mostra o rodapé se o sidebar NÃO estiver colapsado */}
      {state !== "collapsed" && (
        <div className="mt-auto p-4 border-t border-blue-100">
          <div className="flex flex-col items-end">
            <span className="text-xs text-end text-blue-700 dark:text-blue-200">
              © 2025 Sistema BIC.
            </span>
            <span className="text-xs text-end text-blue-700 dark:text-blue-200">
              Desenvolvido por SMCTIC.
            </span>
            <span className="text-[10px] text-blue-400 mt-1">
              Versão 3.0.0.
            </span>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
