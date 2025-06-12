"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"

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
  return (
    <div className="space-y-8">
      {/* Avaliação Urbanística do Logradouro */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Avaliação Urbanística do Logradouro:</h4>
        <RadioGroup
          value={formData.avaliacaoUrbanistica}
          onValueChange={(value) => handleInputChange("avaliacaoUrbanistica", value)}
          className="space-y-3"
        >
          {[
            { value: "alta", label: "(A) Alta" },
            { value: "media", label: "(B) Média" },
            { value: "mediaBaixa", label: "(C) Média Baixa" },
            { value: "baixa", label: "(D) Baixa" },
            { value: "muitoBaixa", label: "(E) Muito Baixa" },
          ].map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value} className="font-medium cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Calçamento */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Calçamento:</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h5 className="font-medium mb-3 text-gray-700">Tipo:</h5>
            <div className="space-y-3">
              {[
                { id: "semAsfalto", label: "S/Asfalto" },
                { id: "asfaltada", label: "Asfaltada" },
                { id: "novo", label: "Novo" },
                { id: "antigo", label: "Antigo" },
              ].map((item) => (
                <CheckboxField
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  description=""
                  checked={formData.calcamento.tipo[item.id as keyof typeof formData.calcamento.tipo]}
                  onCheckedChange={(checked) => handleNestedCheckboxChange("calcamento", "tipo", item.id, checked)}
                />
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-gray-700">Extensão:</h5>
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
                  label={item.label}
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
      <div>
        <CheckboxField
          id="logradouroComPlaca"
          label="Logradouro com Placa?"
          description="Indica se o logradouro possui placa de identificação"
          checked={formData.logradouroComPlaca}
          onCheckedChange={(checked) => handleInputChange("logradouroComPlaca", checked.toString())}
        />
      </div>

      {/* Observações */}
      <div>
        <Label htmlFor="observacoes" className="text-sm font-medium">
          Observações:
        </Label>
        <Textarea
          id="observacoes"
          placeholder="Observações adicionais sobre o imóvel, construção ou logradouro..."
          value={formData.observacoes}
          onChange={(e) => handleInputChange("observacoes", e.target.value)}
          className="mt-1"
          rows={6}
        />
      </div>
    </div>
  )
}
