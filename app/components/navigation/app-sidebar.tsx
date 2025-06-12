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
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleSidebar}>
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
        <SidebarGroup className="group-data-[collapsible=icon]:mt-14">
          
          <SidebarGroupContent>
            <SidebarMenu className="mt-12">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeView === item.id}
                    tooltip={item.description}
                    onClick={() => setActiveView(item.id)}
                  >
                    <button className="flex items-center gap-3 w-full">
                      <item.icon className="size-6 text-blue-700" />
                      <span className="text-base text-blue-700">{item.title}</span>
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
