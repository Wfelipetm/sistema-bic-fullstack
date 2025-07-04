"use client"

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
    {
      id: "pavimentacao",
      label: "Pavimentação",
      description: "Via pavimentada com asfalto ou concreto",
      icon: "🛣️",
    },
    {
      id: "iluminacaoPublica",
      label: "Iluminação Pública",
      description: "Sistema de iluminação adequado",
      icon: "💡",
    },
    {
      id: "redeEsgoto",
      label: "Rede de Esgoto",
      description: "Sistema de esgotamento sanitário",
      icon: "🚰",
    },
    {
      id: "redeAgua",
      label: "Rede de Água",
      description: "Abastecimento de água tratada",
      icon: "💧",
    },
    {
      id: "coletaLixo",
      label: "Coleta de Lixo",
      description: "Serviço regular de coleta",
      icon: "🗑️",
    },
  ])

  useEffect(() => {
    fetch(apiUrl("/info-logradouro/"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(
            (k) => k !== "id" && k !== "boletim_id" && k !== "created_at" && k !== "updated_at",
          )
          setLogradouroItems(
            keys.map((key, idx) => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
              description: "",
              icon: "📋",
            })),
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8">
      {/* Header da seção */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Infraestrutura do Logradouro</h2>
        <p className="text-sm text-sky-600 mb-4">Selecione os itens de infraestrutura disponíveis no local</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div>

      {/* Grid de itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {logradouroItems.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-6 
                       hover:shadow-md hover:border-sky-200 hover:-translate-y-1
                       transition-all duration-300 ease-in-out cursor-pointer
                       flex flex-col items-start h-full"
            onClick={() =>
              handleCheckboxChange(
                "logradouro",
                item.id,
                !formData.logradouro[item.id as keyof typeof formData.logradouro],
              )
            }
          >
            {/* Número do item */}
            <div
              className="absolute -top-3 -left-3 w-8 h-8 bg-sky-500 text-white rounded-full 
                           flex items-center justify-center text-sm font-bold shadow-md
                           group-hover:bg-sky-600 transition-colors duration-200"
            >
              {index + 1}
            </div>

            {/* Ícone */}
            <div className="text-2xl mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              {item.icon}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 w-full">
              <CheckboxField
                id={item.id}
                label={
                  <span className="font-semibold text-sky-700 group-hover:text-sky-800 transition-colors duration-200">
                    {item.label}
                  </span>
                }
                description={item.description}
                checked={formData.logradouro[item.id as keyof typeof formData.logradouro]}
                onCheckedChange={(checked) => handleCheckboxChange("logradouro", item.id, checked)}
              />
            </div>

            {/* Indicador visual de seleção */}
            <div
              className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-200 ${
                formData.logradouro[item.id as keyof typeof formData.logradouro]
                  ? "border-sky-400 bg-sky-50/30"
                  : "border-transparent"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-sky-200">
        <div className="flex items-center justify-between text-sm text-sky-600">
          <p>Clique nos cards para selecionar/deselecionar os itens</p>
          <p className="font-medium">
            {Object.values(formData.logradouro).filter(Boolean).length} de {logradouroItems.length} selecionados
          </p>
        </div>
      </div>
    </div>
  )
}
