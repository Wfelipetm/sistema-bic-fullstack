import { useEffect, useState } from "react"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface ServentiasSectionProps {
  formData: FormularioData
  handleNestedInputChange: (section: keyof FormularioData, field: string, value: string) => void
}

const defaultServentias = [
  { id: "sala", label: "1- Sala" },
  { id: "quarto", label: "2- Quarto" },
  { id: "copa", label: "3- Copa" },
  { id: "cozinha", label: "4- Cozinha" },
  { id: "banheiro", label: "5- Banheiro" },
  { id: "garagem", label: "6- Garagem" },
  { id: "varanda", label: "7- Varanda" },
  { id: "corredor", label: "8- Corredor" },
  { id: "area", label: "9- Área" },
  { id: "porao_habital", label: "10- Porão Habital" },
]

export function ServentiasSection({ formData, handleNestedInputChange }: ServentiasSectionProps) {
  const [serventiasItems, setServentiasItems] = useState(defaultServentias)

  useEffect(() => {
    fetch(apiUrl("/serventias/"))
      .then(res => res.json())
      .then(data => {
        const serventiasObj = data.serventias || data[0]?.serventias || data[0] || {};
        const ignore = ["id", "created_at", "updated_at"];
        const keys = Object.keys(serventiasObj).filter(k => !ignore.includes(k));
        if (keys.length > 0) {
          setServentiasItems(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`
            }))
          );
        } else {
          setServentiasItems(defaultServentias);
        }
      })
      .catch(() => setServentiasItems(defaultServentias));
  }, [])

  return (
    <div>
      <h4 className="font-semibold text-lg mb-4 text-gray-800">Serventias:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {serventiasItems.map((item) => (
          <div key={item.id} className="flex flex-col">
            <label htmlFor={item.id} className="text-sm font-medium text-gray-700">{item.label}</label>
            <input
              type="number"
              id={item.id}
              min={0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value={
                formData.serventias[item.id as keyof typeof formData.serventias] === 0
                  ? ""
                  : formData.serventias[item.id as keyof typeof formData.serventias]
              }
              onChange={e => {
                // Sempre salva número no estado, vazio vira 0
                handleNestedInputChange(
                  "serventias",
                  item.id,
                  e.target.value === "" ? "0" : e.target.value
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
