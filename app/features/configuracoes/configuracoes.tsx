"use client"

import { Badge } from "@/components/ui/badge"
import { PerfilSection } from "./components/perfil-section"
import { NotificacoesSection } from "./components/notificacoes-section"
import { SegurancaSection } from "./components/seguranca-section"
import { SistemaSection } from "./components/sistema-section"

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Configurações
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        <PerfilSection />
        <NotificacoesSection />
        <SegurancaSection />
        <SistemaSection />
      </div>
    </div>
  )
}
