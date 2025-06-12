import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/types/formulario"

interface TerrenoNivelamentoSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

export function TerrenoNivelamentoSection({ formData, handleCheckboxChange }: TerrenoNivelamentoSectionProps) {
  const nivelamentoItems = [
    { id: "abaixoNivel", label: "Abaixo do nível", description: "Terreno abaixo do nível da rua" },
    { id: "aoNivel", label: "Ao nível", description: "Terreno no mesmo nível da rua" },
    { id: "acimaNivel", label: "Acima do nível", description: "Terreno acima do nível da rua" },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nivelamentoItems.map((item) => (
          <CheckboxField
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            checked={formData.terrenoNivelamento[item.id as keyof typeof formData.terrenoNivelamento]}
            onCheckedChange={(checked) => handleCheckboxChange("terrenoNivelamento", item.id, checked)}
          />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar informação de nivelamento
      </Button>
    </>
  )
}
