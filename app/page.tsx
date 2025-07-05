"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AppLayout } from "@/app/components/layouts/app-layout"
import Dashboard from "@/app/features/dashboard/dashboard"
import FormularioTecnico from "@/app/features/formularios/formulario-tecnico"
import Relatorios from "@/app/features/relatorios/relatorios"
import Configuracoes from "@/app/features/configuracoes/configuracoes"
import ProtectedRoute from "@/components/auth/protected-route"
import type { ViewType } from "@/app/types/navigation"

export default function BICApp() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const renderContent = () => {
    switch (activeView) {
      // case "dashboard":
      //   return <Dashboard />
      case "formulario":
        return <FormularioTecnico />
      case "relatorios":
        return <Relatorios setActiveView={setActiveView} />
      case "configuracoes":
        return <Configuracoes />
      default:
        return <FormularioTecnico />
    }
  }
  //  const renderContent = () => <FormularioTecnico />
  
  return (
    <ProtectedRoute>
      <AppLayout activeView={activeView} setActiveView={setActiveView}>
        {renderContent()}
      </AppLayout>
    </ProtectedRoute>
  )
}
