import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/types/formulario"

interface TerrenoTopografiaSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

export function TerrenoTopografiaSection({ formData, handleCheckboxChange }: TerrenoTopografiaSectionProps) {
  const topografiaItems = [
    { id: "aclive", label: "Aclive", description: "Terreno em subida" },
    { id: "declive", label: "Declive", description: "Terreno em descida" },
    { id: "encosta", label: "Encosta", description: "Terreno em encosta" },
    { id: "horizontal", label: "Horizontal", description: "Terreno plano" },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topografiaItems.map((item) => (
          <CheckboxField
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            checked={formData.terrenoTopografia[item.id as keyof typeof formData.terrenoTopografia]}
            onCheckedChange={(checked) => handleCheckboxChange("terrenoTopografia", item.id, checked)}
          />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar característica topográfica
      </Button>
    </>
  )
}
