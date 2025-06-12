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
    <div className="min-h-screen bg-gray-50">
      {/* <AppHeader activeView={activeView} setActiveView={setActiveView} /> */}
      {/* Sidebar e conteúdo */}
      <div className="flex">
        <SidebarProvider>
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
          <SidebarInset>
            <AppHeader activeView={activeView} setActiveView={setActiveView} />
            {/* Sub-header com breadcrumbs e trigger do sidebar */}
           

            {/* Conteúdo principal */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{breadcrumb.title}</h1>
                <p className="text-sm text-gray-600">{breadcrumb.subtitle}</p>
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
