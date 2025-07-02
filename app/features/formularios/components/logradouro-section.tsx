import { useEffect, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface LogradouroSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

export function LogradouroSection({ formData, handleCheckboxChange }: LogradouroSectionProps) {
  // Depuração: veja o estado do formulário sempre que ele mudar
  useEffect(() => {
    console.log("formData (LogradouroSection):", formData)
  }, [formData])

  const [logradouroItems, setLogradouroItems] = useState([
    { id: "pavimentacao", label: "1- Pavimentação", description: "Via pavimentada" },
    { id: "iluminacaoPublica", label: "2- Iluminação Pública", description: "Iluminação adequada" },
    { id: "redeEsgoto", label: "3- Rede de Esgoto", description: "Sistema de esgotamento" },
    { id: "redeAgua", label: "4- Rede de Água", description: "Abastecimento de água" },
    { id: "coletaLixo", label: "5- Coleta de Lixo", description: "Serviço de coleta" },
  ])

  useEffect(() => {
    fetch(apiUrl("/info-logradouro/"))
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(
            k => k !== "id" && k !== "boletim_id" && k !== "created_at" && k !== "updated_at"
          )
          setLogradouroItems(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}`,
              description: "",
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {logradouroItems.map((item) => (
        <div
          key={item.id}
          className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6 flex flex-col items-start transition hover:shadow-lg"
        >
          <CheckboxField
            id={item.id}
            label={<span className="font-semibold text-blue-800">{item.label}</span>}
            description={item.description || ""}
            checked={formData.logradouro[item.id as keyof typeof formData.logradouro]}
            onCheckedChange={(checked) => handleCheckboxChange("logradouro", item.id, checked)}
          />
        </div>
      ))}
    </div>
  )
}
