"use client"

import type * as React from "react"
import { Building2 } from "lucide-react" // Assuming Home, FileText, etc., are part of item.icon
import { cn } from "@/lib/utils" // For conditional class names
import { ScrollArea } from "@/components/ui/scroll-area" // Import ScrollArea

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel, // Not used in the primary nav styling
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar, // toggleSidebar is no longer used
} from "@/components/ui/sidebar"
import { navigationItems } from "@/app/constants/navigation"
import type { ViewType } from "@/app/types/navigation"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppSidebar({ activeView, setActiveView, ...props }: AppSidebarProps) {
  // Exemplo: supondo que você tenha pelo menos 3 itens
  const topItem = navigationItems[0]
  const middleItem = navigationItems[1]
  const bottomItem = navigationItems[2]

  return (
    <Sidebar
      className={cn(
        "flex flex-col h-full border-r transition-all duration-300 w-64",
        "bg-gradient-to-t from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800",
        props.className,
      )}
      {...props}
    >
      {/* SidebarHeader removido conforme solicitação */}

      <SidebarContent className="flex flex-1 flex-col justify-between items-center py-8">
        {/* Ícone do topo */}
        <div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeView === topItem.id}
                tooltip={topItem.description}
                onClick={() => setActiveView(topItem.id)}
                className={cn(
                  "flex items-center justify-center rounded-lg w-24 h-24 transition-colors",
                  activeView === topItem.id
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                    : "text-blue-700 hover:bg-blue-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50",
                )}
              >
                <button className="w-full h-full flex items-center justify-center">
                  <topItem.icon className="h-16 w-16" />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Ícone do meio */}
        <div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeView === middleItem.id}
                tooltip={middleItem.description}
                onClick={() => setActiveView(middleItem.id)}
                className={cn(
                  "flex items-center justify-center rounded-lg w-24 h-24 transition-colors",
                  activeView === middleItem.id
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                    : "text-blue-700 hover:bg-blue-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50",
                )}
              >
                <button className="w-full h-full flex items-center justify-center">
                  <middleItem.icon className="h-16 w-16" />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        {/* Ícone do final */}
        <div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={activeView === bottomItem.id}
                tooltip={bottomItem.description}
                onClick={() => setActiveView(bottomItem.id)}
                className={cn(
                  "flex items-center justify-center rounded-lg w-24 h-24 transition-colors",
                  activeView === bottomItem.id
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                    : "text-blue-700 hover:bg-blue-100 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-50",
                )}
              >
                <button className="w-full h-full flex items-center justify-center">
                  <bottomItem.icon className="h-16 w-16" />
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      {/* Footer permanece igual */}
      <div className="mt-auto p-4 border-t border-blue-100 dark:border-slate-700">
        <div className="flex flex-col items-end">
          <span className="text-xs text-end text-blue-700 dark:text-blue-200">
            © {new Date().getFullYear()} BIC Sistema.
          </span>
          <span className="text-[10px] text-blue-400 dark:text-slate-500 mt-1">
            Versão 1.0.0
          </span>
        </div>
      </div>
    </Sidebar>
  )
}
