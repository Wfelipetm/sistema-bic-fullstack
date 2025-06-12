import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"

interface ServentiasSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
  handleInputChange: (field: string, value: string) => void
}

export function ServentiasSection({ formData, handleCheckboxChange }: ServentiasSectionProps) {
  const serventiasItems = [
    { id: "sala", label: "1- Sala" },
    { id: "quarto", label: "2- Quarto" },
    { id: "copa", label: "3- Copa" },
    { id: "cozinha", label: "4- Cozinha" },
    { id: "banheiro", label: "5- Banheiro" },
    { id: "garagem", label: "6- Garagem" },
    { id: "varanda", label: "7- Varanda" },
    { id: "corredor", label: "8- Corredor" },
    { id: "area", label: "9- Área" },
    { id: "poraoHabital", label: "10- Porão Habital" },
  ]

  return (
    <div>
      <h4 className="font-semibold text-lg mb-4 text-gray-800">Serventias:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serventiasItems.map((item) => (
          <CheckboxField
            key={item.id}
            id={item.id}
            label={item.label}
            description=""
            checked={formData.serventias[item.id as keyof typeof formData.serventias]}
            onCheckedChange={(checked) => handleCheckboxChange("serventias", item.id, checked)}
          />
        ))}
      </div>
    </div>
  )
}
