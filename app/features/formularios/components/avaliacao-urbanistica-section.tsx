"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface AvaliacaoUrbanisticaSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
  handleInputChange: (field: string, value: string) => void
}

export function AvaliacaoUrbanisticaSection({
  formData,
  handleCheckboxChange,
  handleNestedCheckboxChange,
  handleInputChange,
}: AvaliacaoUrbanisticaSectionProps) {
  const [avaliacaoOptions, setAvaliacaoOptions] = useState([
    { value: "alta", label: "(A) Alta" },
    { value: "media", label: "(B) Média" },
    { value: "mediaBaixa", label: "(C) Média Baixa" },
    { value: "baixa", label: "(D) Baixa" },
    { value: "muitoBaixa", label: "(E) Muito Baixa" },
  ])

  useEffect(() => {
    fetch(apiUrl("/avali-urba-logradouro/"))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(k => k !== "id")
          setAvaliacaoOptions(
            keys.map((key, idx) => ({
              value: key,
              label: `(${String.fromCharCode(65 + idx)}) ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-8">
      {/* Avaliação Urbanística do Logradouro */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-semibold text-lg mb-4 text-blue-900">Avaliação Urbanística do Logradouro:</h4>
        <RadioGroup
          value={formData.avaliacaoUrbanistica}
          onValueChange={(value) => handleInputChange("avaliacaoUrbanistica", value)}
          className="space-y-3"
        >
          {avaliacaoOptions.map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value} className="font-medium text-blue-800 cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Calçamento */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-semibold text-lg mb-4 text-blue-900">Calçamento:</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h5 className="font-medium mb-3 text-blue-800">Tipo:</h5>
            <div className="space-y-3">
              {[
                { id: "sem_asfalto", label: "S/Asfalto" },
                { id: "asfaltada", label: "Asfaltada" },
                { id: "novo", label: "Novo" },
                { id: "antigo", label: "Antigo" },
              ].map((item) => (
                <CheckboxField
                  key={item.id}
                  id={item.id}
                  label={<span className="font-medium text-blue-800">{item.label}</span>}
                  description=""
                  checked={formData.calcamento.tipo[item.id as keyof typeof formData.calcamento.tipo]}
                  onCheckedChange={(checked) => handleNestedCheckboxChange("calcamento", "tipo", item.id, checked)}
                />
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3 text-blue-800">Extensão:</h5>
            <div className="space-y-3">
              {[
                { id: "parte", label: "Parte" },
                { id: "toda", label: "Toda" },
                { id: "paralelo", label: "Paralelo" },
                { id: "bloco", label: "Bloco" },
              ].map((item) => (
                <CheckboxField
                  key={item.id}
                  id={item.id}
                  label={<span className="font-medium text-blue-800">{item.label}</span>}
                  description=""
                  checked={formData.calcamento.extensao[item.id as keyof typeof formData.calcamento.extensao]}
                  onCheckedChange={(checked) => handleNestedCheckboxChange("calcamento", "extensao", item.id, checked)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logradouro com Placa */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex items-center">
        <CheckboxField
          id="logradouroComPlaca"
          label={<span className="font-medium text-blue-800">Logradouro com Placa?</span>}
          description="Indica se o logradouro possui placa de identificação"
          checked={formData.logradouroComPlaca}
          onCheckedChange={(checked) => handleInputChange("logradouroComPlaca", checked.toString())}
        />
      </div>

      {/* Observações */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <Label htmlFor="observacoes" className="text-base font-semibold text-blue-900 mb-2">
          Observações:
        </Label>
        <Textarea
          id="observacoes"
          placeholder="Observações adicionais sobre o imóvel, construção ou logradouro..."
          value={formData.observacoes}
          onChange={(e) => handleInputChange("observacoes", e.target.value)}
          className="mt-2 rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-lg transition placeholder:text-blue-300"
          rows={6}
        />
      </div>
    </div>
  )
}
