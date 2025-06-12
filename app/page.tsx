"use client"

import { useState } from "react"
import { AppLayout } from "@/app/components/layouts/app-layout"
import Dashboard from "@/app/features/dashboard/dashboard"
import FormularioTecnico from "@/app/features/formularios/formulario-tecnico"
import Relatorios from "@/app/features/relatorios/relatorios"
import Configuracoes from "@/app/features/configuracoes/configuracoes"
import type { ViewType } from "@/app/types/navigation"

export default function BICApp() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "formulario":
        return <FormularioTecnico />
      case "relatorios":
        return <Relatorios />
      case "configuracoes":
        return <Configuracoes />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-blue-900">
      <AppLayout activeView={activeView} setActiveView={setActiveView}>
        {renderContent()}
      </AppLayout>
    </div>
  )
}
