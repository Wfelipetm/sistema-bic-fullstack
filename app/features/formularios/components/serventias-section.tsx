"use client"

import { useEffect, useState } from "react"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"
import { Sofa, Bed, Utensils, ChefHat, ShowerHead, Car, Home, DoorOpen, Building2, Warehouse } from "lucide-react"

interface ServentiasSectionProps {
  formData: FormularioData
  handleNestedInputChange: (section: keyof FormularioData, field: string, value: string) => void
}

const defaultServentias = [
  { id: "sala", label: "Sala", icon: Sofa },
  { id: "quarto", label: "Quarto", icon: Bed },
  { id: "copa", label: "Copa", icon: Utensils },
  { id: "cozinha", label: "Cozinha", icon: ChefHat },
  { id: "banheiro", label: "Banheiro", icon: ShowerHead },
  { id: "garagem", label: "Garagem", icon: Car },
  { id: "varanda", label: "Varanda", icon: Home },
  { id: "corredor", label: "Corredor", icon: DoorOpen },
  { id: "area", label: "Área", icon: Building2 },
  { id: "porao_habital", label: "Porão Habital", icon: Warehouse },
]

export function ServentiasSection({ formData, handleNestedInputChange }: ServentiasSectionProps) {
  const [serventiasItems, setServentiasItems] = useState(defaultServentias)

  useEffect(() => {
    fetch(apiUrl("/serventias/"))
      .then((res) => res.json())
      .then((data) => {
        const serventiasObj = data.serventias || data[0]?.serventias || data[0] || {}
        const ignore = ["id", "created_at", "updated_at"]
        const keys = Object.keys(serventiasObj).filter((k) => !ignore.includes(k))
        if (keys.length > 0) {
          setServentiasItems(
            keys.map((key, idx) => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
              icon: Building2,
            })),
          )
        } else {
          setServentiasItems(defaultServentias)
        }
      })
      .catch(() => setServentiasItems(defaultServentias))
  }, [])

  const inputClassName = `
    w-20 h-16 text-center text-2xl font-bold rounded-xl 
    border-2 border-slate-200 bg-white text-sky-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    placeholder:text-slate-400
  `

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8">
      {/* Header da seção */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Serventias</h2>
        <p className="text-sm text-sky-600 mb-4">Informe a quantidade de cada cômodo</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {serventiasItems.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 p-6 
                       hover:shadow-md hover:border-sky-200 hover:-translate-y-1
                       transition-all duration-300 ease-in-out"
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
            <div className="text-3xl mb-4 text-center opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              {item.icon && typeof item.icon === 'function' ? (
                <item.icon className="w-8 h-8 mx-auto text-sky-500" />
              ) : null}
            </div>

            {/* Label */}
            <label htmlFor={item.id} className="text-lg font-bold text-sky-800 mb-4 block text-center cursor-pointer">
              {item.label}
            </label>

            {/* Input */}
            <div className="flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                id={item.id}
                className={inputClassName}
                value={formData.serventias[item.id as keyof typeof formData.serventias] || ""}
                onChange={(e) => {
                  handleNestedInputChange("serventias", item.id, e.target.value)
                }}
                autoComplete="off"
                placeholder="0"
              />
            </div>

            {/* Descrição */}
            <p className="mt-3 text-xs text-sky-600 text-center">Quantidade</p>

            {/* Indicador de preenchimento */}
            <div className="mt-2 text-center">
              <div
                className={`inline-block w-2 h-2 rounded-full transition-colors duration-200 ${
                  formData.serventias[item.id as keyof typeof formData.serventias] ? "bg-green-400" : "bg-slate-300"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-sky-200">
        <div className="flex items-center justify-between text-sm text-sky-600">
          <p>Informe apenas números inteiros</p>
          <p className="font-medium">
            {Object.values(formData.serventias).filter((value) => value && Number(value) !== 0).length} de{" "}
            {serventiasItems.length} preenchidos
          </p>
        </div>
      </div>
    </div>
  )
}
