"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface MetragensSectionProps {
  formData: FormularioData
  handleNestedInputChange: (section: string, field: string, value: string) => void
}

export function MetragensSection({ formData, handleNestedInputChange }: MetragensSectionProps) {
  const [metragensApi, setMetragensApi] = useState<any[]>([])

  useEffect(() => {
    fetch(apiUrl("/metragem/"))
      .then(res => res.json())
      .then(setMetragensApi)
      .catch(() => setMetragensApi([]))
  }, [])

  // Você pode usar metragensApi para preencher sugestões, autocomplete, ou exibir dados existentes

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="text-center flex flex-row items-center justify-center">
        <Label htmlFor="areaTerreno" className="text-sm text-start mt-1 font-medium block mb-2">
          Área do Terreno:
        </Label>
        <div className="relative">
          <Input
            id="areaTerreno"
            placeholder="0,00"
            value={formData.metragens.areaTerreno}
            onChange={(e) => handleNestedInputChange("metragens", "areaTerreno", e.target.value)}
            className="text-center text-lg font-semibold"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-normal">m²</span>
        </div>
      </div>

      <div className="text-center flex flex-row items-center justify-center">
        <Label htmlFor="testada" className="text-sm text-start mt-1 font-medium block mb-2">
          Testada:
        </Label>
        <div className="relative">
          <Input
            id="testada"
            placeholder="0,00"
            value={formData.metragens.testada}
            onChange={(e) => handleNestedInputChange("metragens", "testada", e.target.value)}
            className="text-center text-lg font-semibold"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">m</span>
        </div>
      </div>

      <div className="text-center flex flex-row items-center justify-center">
        <Label htmlFor="areaEdificada" className="text-sm text-start mt-1 font-medium block mb-2">
          Área Edificada:
        </Label>
        <div className="relative">
          <Input
            id="areaEdificada"
            placeholder="0,00"
            value={formData.metragens.areaEdificada}
            onChange={(e) => handleNestedInputChange("metragens", "areaEdificada", e.target.value)}
            className="text-center text-lg font-semibold"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">m²</span>
        </div>
      </div>
    </div>
  )
}
