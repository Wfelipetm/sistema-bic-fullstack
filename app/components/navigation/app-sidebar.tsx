"use client"

import type * as React from "react"
import "@fontsource-variable/inter";
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
  const { state, toggleSidebar } = useSidebar(); // adicione toggleSidebar

  return (
    <Sidebar
      collapsible="icon"
      onClick={toggleSidebar}
      style={{ fontFamily: 'InterVariable, Inter, system-ui, sans-serif', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)', borderRight: '1.5px solid #dbeafe', boxShadow: '0 2px 24px 0 rgba(80,150,255,0.07)' }}
      {...props}
    >
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
            <SidebarMenu className="mt-4">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.id}
                    tooltip={item.description}
                    onClick={() => setActiveView(item.id)}
                  >
                    <button
                      className={
                        `flex items-center gap-3 w-full px-3 py-3 rounded-2xl transition-all duration-300
                        text-blue-800 font-semibold group tracking-tight
                        hover:bg-blue-100/70 hover:shadow-[0_2px_12px_0_rgba(80,150,255,0.10)] hover:scale-[1.018]
                        focus:bg-blue-100 focus:outline-none
                        ` + (activeView === item.id ? ' bg-blue-200/80 shadow-[0_2px_16px_0_rgba(80,150,255,0.15)] scale-[1.018] ring-2 ring-blue-200' : '')
                      }
                      style={{ fontFamily: 'inherit', fontVariationSettings: '"wght" 600, "slnt" 0', letterSpacing: '-0.01em', fontSize: '1.08rem', paddingTop: '0.85rem', paddingBottom: '0.85rem' }}
                    >
                      <item.icon className="size-5 text-blue-700 stroke-2 group-hover:text-blue-900 transition-colors duration-200 drop-shadow-sm" />
                      <span className="text-blue-800 font-semibold group-hover:text-blue-900 transition-colors duration-200" style={{fontFamily: 'inherit'}}>{item.title}</span>
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
        <div className="mt-auto p-5 border-t border-blue-100 bg-gradient-to-t from-blue-50/80 to-transparent">
          <div className="flex flex-col items-end">
            <span className="text-xs text-end text-blue-700 dark:text-blue-600 font-medium tracking-tight" style={{fontFamily: 'inherit'}}>© 2025 Sistema BIC.</span>
            <span className="text-xs text-end text-blue-700 dark:text-blue-600 font-medium tracking-tight" style={{fontFamily: 'inherit'}}>Desenvolvido por SMCTIC.</span>
            <span className="text-[10px] text-blue-400 mt-1 font-mono">Versão 1.0.0.</span>
          </div>
        </div>
      )}
    </Sidebar>
  )
}
