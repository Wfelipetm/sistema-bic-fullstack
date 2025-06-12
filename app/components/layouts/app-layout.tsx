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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <AppHeader activeView={activeView} setActiveView={setActiveView} />

      {/* Sidebar absoluto e com z-index alto */}
      <SidebarProvider>
        <div className="absolute top-0 left-0 z-50 h-full">
          <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        </div>
        <div className="flex">
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-6 ml-[260px]">
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{breadcrumb.title}</h1>
                <p className="text-sm text-gray-600">{breadcrumb.subtitle}</p>
              </div>
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export { AppLayout }
export default AppLayout
