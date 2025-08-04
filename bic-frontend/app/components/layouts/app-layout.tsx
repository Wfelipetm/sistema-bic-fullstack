"use client"

import type { ReactNode } from "react"
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
      {/* Header - Full Width */}
      <AppHeader activeView={activeView} setActiveView={setActiveView} />

      {/* Content Area - Sidebar + Main */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{breadcrumb.title}</h1>
            <p className="text-blue-400 leading-relaxed">{breadcrumb.subtitle}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

export { AppLayout }
export default AppLayout
