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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex flex-col items-center">
        <Label htmlFor="areaTerreno" className="text-base font-bold text-blue-900 mb-2">
          Área do Terreno
        </Label>
        <div className="relative w-full">
          <Input
            id="areaTerreno"
            placeholder="0,00"
            value={formData.metragens.areaTerreno}
            onChange={(e) => handleNestedInputChange("metragens", "areaTerreno", e.target.value)}
            className="text-center text-xl font-bold pr-12 text-blue-800 bg-white border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 font-semibold select-none">m²</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex flex-col items-center">
        <Label htmlFor="testada" className="text-base font-bold text-blue-900 mb-2">
          Testada
        </Label>
        <div className="relative w-full">
          <Input
            id="testada"
            placeholder="0,00"
            value={formData.metragens.testada}
            onChange={(e) => handleNestedInputChange("metragens", "testada", e.target.value)}
            className="text-center text-xl font-bold pr-12 text-blue-800 bg-white border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 font-semibold select-none">m</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex flex-col items-center">
        <Label htmlFor="areaEdificada" className="text-base font-bold text-blue-900 mb-2">
          Área Edificada
        </Label>
        <div className="relative w-full">
          <Input
            id="areaEdificada"
            placeholder="0,00"
            value={formData.metragens.areaEdificada}
            onChange={(e) => handleNestedInputChange("metragens", "areaEdificada", e.target.value)}
            className="text-center text-xl font-bold pr-12 text-blue-800 bg-white border-blue-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-700 font-semibold select-none">m²</span>
        </div>
      </div>
    </div>
  )
}
