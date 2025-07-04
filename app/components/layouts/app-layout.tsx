"use client"

import type { ReactNode } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "@/app/components/navigation/app-sidebar"
import { AppHeader } from "@/app/components/navigation/app-header"
import type { ViewType } from "@/app/types/navigation"
import { getBreadcrumbInfo } from "@/app/constants/navigation"

interface AppLayoutProps {
  children: ReactNode
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

const AppLayout = ({ children, activeView, setActiveView }: AppLayoutProps) => {
  const breadcrumb = getBreadcrumbInfo(activeView)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-200">
      {/* Header fixo no topo */}
      <AppHeader activeView={activeView} setActiveView={setActiveView} />

      {/* Sidebar e conteúdo */}
      <div className="flex">
        <SidebarProvider>
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
          <SidebarInset>
            {/* Sub-header com breadcrumbs e trigger do sidebar */}
            <div className="flex h-12 shrink-0 items-center gap-2 border-b border-blue-100 bg-white/80 backdrop-blur-sm px-4">
              <SidebarTrigger className="-ml-1 text-blue-700 hover:text-blue-900 hover:bg-blue-50" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-blue-200" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                      Início
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block text-blue-400" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-blue-900">{breadcrumb.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">{breadcrumb.title}</h1>
                <p className="text-blue-400 leading-relaxed">{breadcrumb.subtitle}</p>
              </div>
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

export { AppLayout }
export default AppLayout
