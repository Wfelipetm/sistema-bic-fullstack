import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "../../../types/formulario"
import { apiUrl } from "@/lib/api"

interface TerrenoCaracteristicasSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

export function TerrenoCaracteristicasSection({ formData, handleCheckboxChange }: TerrenoCaracteristicasSectionProps) {
  const [caracteristicasItems, setCaracteristicasItems] = useState([
    { id: "alagadico", label: "Alagadiço", description: "Solo com tendência ao alagamento" },
    { id: "arenoso", label: "Arenoso", description: "Solo com predominância de areia" },
    { id: "rochoso", label: "Rochoso", description: "Solo com presença de rochas" },
    { id: "normal", label: "Normal", description: "Solo normal" },
  ])

  useEffect(() => {
    fetch(apiUrl("/caracter-solo/"))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(k => k !== "id")
          setCaracteristicasItems(
            keys.map(key => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              description: "",
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {caracteristicasItems.map((item) => (
          <CheckboxField
            key={item.id}
            id={item.id}
            label={item.label}
            description={item.description}
            checked={formData.terrenoCaracteristicas[item.id as keyof typeof formData.terrenoCaracteristicas]}
            onCheckedChange={(checked) => handleCheckboxChange("terrenoCaracteristicas", item.id, checked)}
          />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar característica
      </Button>
    </>
  )
}
