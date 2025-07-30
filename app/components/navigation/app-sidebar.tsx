"use client"

import type * as React from "react"
import "@fontsource-variable/inter";
import { useState, useEffect } from "react"
import { navigationItems } from "@/app/constants/navigation"
import type { ViewType } from "@/app/types/navigation"

interface AppSidebarProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Efeito para hidratação e carregamento do estado do localStorage
  useEffect(() => {
    setIsClient(true)
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    // Salva o estado no localStorage
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
  }

  // Previne hidratação mismatch
  if (!isClient) {
    return null
  }

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-500 flex flex-col relative group cursor-pointer ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}
      onClick={toggleSidebar}
      title={sidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
    >
      {/* Sidebar Content */}
      <nav className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'p-2 pt-2' : 'p-4 pt-5'}`}>
        <ul className={`transition-all duration-300 ${sidebarCollapsed ? 'space-y-0.5' : 'space-y-1'}`}>
          {navigationItems.map((item) => (
            <li key={item.title}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveView(item.id)
                }}
                className={`flex items-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-all duration-300 group w-full ${
                  sidebarCollapsed
                    ? 'space-x-0 px-2 py-3 justify-center h-16'
                    : 'space-x-3 px-3 py-3'
                } ${activeView === item.id ? 'bg-blue-100 text-blue-800' : ''}`}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    sidebarCollapsed
                      ? 'opacity-0 scale-95 w-0 overflow-hidden'
                      : 'opacity-100 scale-100 w-auto'
                  }`}
                  style={{
                    transitionDelay: sidebarCollapsed ? '0ms' : '150ms'
                  }}
                >
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4">
        <div
          className={`transition-all duration-300 ${
            sidebarCollapsed
              ? 'opacity-0 scale-95 overflow-hidden'
              : 'opacity-100 scale-100'
          }`}
          style={{
            transitionDelay: sidebarCollapsed ? '0ms' : '150ms'
          }}
        >
          <div className="text-xs text-end text-blue-700 space-y-1">
            <p>© {new Date().getFullYear()} Sistema BIC</p>
            <p>Desenvolvido por SMCTIC</p>
            <p>Versão 1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
