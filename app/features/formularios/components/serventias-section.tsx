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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {serventiasItems.map((item) => (
          <div
            key={item.id}
            className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex flex-col items-center transition hover:shadow-lg"
          >
            <label htmlFor={item.id} className="text-lg font-bold text-blue-900 mb-3 tracking-wide">{item.label}</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id={item.id}
              className="mt-1 block w-24 rounded-xl border-blue-200 shadow text-center text-xl font-bold text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
              value={formData.serventias[item.id as keyof typeof formData.serventias] || ""}
              onChange={e => {
                handleNestedInputChange(
                  "serventias",
                  item.id,
                  e.target.value
                );
              }}
              autoComplete="off"
            />
            <span className="mt-2 text-xs text-blue-700 opacity-80">Informe a quantidade</span>
          </div>
        ))}
      </div>
    </div>
  );
}
