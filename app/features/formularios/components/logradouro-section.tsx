import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"

interface LogradouroSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

export function LogradouroSection({ formData, handleCheckboxChange }: LogradouroSectionProps) {
  const logradouroItems = [
    { id: "pavimentacao", label: "1- Pavimentação", description: "Via pavimentada" },
    { id: "iluminacaoPublica", label: "2- Iluminação Pública", description: "Iluminação adequada" },
    { id: "redeEsgoto", label: "3- Rede de Esgoto", description: "Sistema de esgotamento" },
    { id: "redeAgua", label: "4- Rede de Água", description: "Abastecimento de água" },
    { id: "coletaLixo", label: "5- Coleta de Lixo", description: "Serviço de coleta" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {logradouroItems.map((item) => (
        <CheckboxField
          key={item.id}
          id={item.id}
          label={item.label}
          description={item.description}
          checked={formData.logradouro[item.id as keyof typeof formData.logradouro]}
          onCheckedChange={(checked) => handleCheckboxChange("logradouro", item.id, checked)}
        />
      ))}
    </div>
  )
}
