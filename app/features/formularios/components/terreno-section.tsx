"use client"

import { useEffect, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { situacaoAPI, caracterSoloAPI, topografiaAPI, nivelamentoAPI } from "@/lib/api-services"

interface TerrenoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function TerrenoSection({ formData, handleNestedCheckboxChange }: TerrenoSectionProps) {
  const [situacaoOptions, setSituacaoOptions] = useState([
    { id: "encravamento", label: "Encravamento", icon: "🏘️" },
    { id: "vila", label: "Vila", icon: "🏡" },
    { id: "meio_quadra", label: "Meio de Quadra", icon: "🏠" },
    { id: "esquina", label: "Esquina", icon: "🔄" },
    { id: "tres_frentes", label: "Três Frentes", icon: "🏢" },
    { id: "toda_quadra", label: "Toda a Quadra", icon: "🏬" },
  ])

  const [soloOptions, setSoloOptions] = useState([
    { id: "alagadico", label: "Alagadiço", icon: "💧" },
    { id: "arenoso", label: "Arenoso", icon: "🏖️" },
    { id: "rochoso", label: "Rochoso", icon: "🪨" },
    { id: "normal", label: "Normal", icon: "🌱" },
  ])

  const [topografiaOptions, setTopografiaOptions] = useState([
    { id: "aclive", label: "Aclive", icon: "⬆️" },
    { id: "declive", label: "Declive", icon: "⬇️" },
    { id: "encosta", label: "Encosta", icon: "🏔️" },
    { id: "horizontal", label: "Horizontal", icon: "➡️" },
  ])

  const [nivelamentoOptions, setNivelamentoOptions] = useState([
    { id: "abaixoNivel", label: "Abaixo do Nível da Rua", icon: "⬇️" },
    { id: "aoNivel", label: "Ao Nível da Rua", icon: "➡️" },
    { id: "acimaNivel", label: "Acima do Nível da Rua", icon: "⬆️" },
  ])

  useEffect(() => {
    situacaoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setSituacaoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: "📍",
          })),
        )
      }
    })

    caracterSoloAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setSoloOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: "🌍",
          })),
        )
      }
    })

    topografiaAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setTopografiaOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: "🗻",
          })),
        )
      }
    })

    nivelamentoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setNivelamentoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: "📏",
          })),
        )
      }
    })
  }, [])

  const SectionCard = ({
    title,
    options,
    subsection,
    gridCols = "lg:grid-cols-3",
    icon,
  }: {
    title: string
    options: any[]
    subsection: string
    gridCols?: string
    icon: string
  }) => (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">{icon}</div>
        <h4 className="text-xl font-bold text-sky-800">{title}</h4>
        <div className="flex-1 h-px bg-sky-200"></div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4`}>
        {options.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-4 
                       hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5
                       transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() =>
              handleNestedCheckboxChange(
                "terreno",
                subsection,
                item.id,
                !(formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id],
              )
            }
          >
            <div
              className="absolute -top-2 -left-2 w-6 h-6 bg-sky-500 text-white rounded-full 
                         flex items-center justify-center text-xs font-bold shadow-md
                         group-hover:bg-sky-600 transition-colors duration-200"
            >
              {index + 1}
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {item.icon}
              </div>
              <div className="flex-1">
                <CheckboxField
                  id={item.id}
                  label={
                    <span className="font-medium text-sky-700 group-hover:text-sky-800 transition-colors duration-200">
                      {item.label}
                    </span>
                  }
                  description=""
                  checked={
                    (formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id]
                  }
                  onCheckedChange={(checked) => handleNestedCheckboxChange("terreno", subsection, item.id, checked)}
                />
              </div>
            </div>

            <div
              className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-200 ${
                (formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id]
                  ? "border-sky-400 bg-sky-50/30"
                  : "border-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header da seção */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Características do Terreno</h2>
        <p className="text-sm text-sky-600 mb-4">Selecione as características que descrevem o terreno</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div>

      <SectionCard
        title="Situação"
        options={situacaoOptions}
        subsection="situacao"
        gridCols="lg:grid-cols-3 xl:grid-cols-6"
        icon="📍"
      />

      <SectionCard
        title="Características do Solo"
        options={soloOptions}
        subsection="caracteristicasSolo"
        gridCols="lg:grid-cols-4"
        icon="🌍"
      />

      <SectionCard
        title="Topografia"
        options={topografiaOptions}
        subsection="topografia"
        gridCols="lg:grid-cols-4"
        icon="🗻"
      />

      <SectionCard
        title="Nivelamento"
        options={nivelamentoOptions}
        subsection="nivelamento"
        gridCols="lg:grid-cols-3"
        icon="📏"
      />
    </div>
  )
}
