"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
// Adiciona tipagem global para a função de validação
declare global {
  interface Window {
    __validateRequiredMetragens?: () => boolean;
  }
}
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"
import { Ruler, Home, Mountain } from "lucide-react"

interface MetragensSectionProps {
  formData: FormularioData
  handleNestedInputChange: (section: string, field: string, value: string) => void
}

export function MetragensSection({ formData, handleNestedInputChange }: MetragensSectionProps) {
  // Função de validação obrigatória
  function validateRequiredMetragens() {
    const obrigatorios = [
      { id: "areaTerreno", label: "Área do Terreno" },
      { id: "testada", label: "Testada" },
      { id: "areaEdificada", label: "Área Edificada" },
    ];
    for (const campo of obrigatorios) {
      const valor = formData.metragens[campo.id as keyof typeof formData.metragens];
      if (!valor || valor.toString().trim() === "") {
        toast.warning(`Preencha o campo ${campo.label}.`);
        return false;
      }
    }
    return true;
  }

  // Exponha a função de validação para o componente pai via window (workaround para navegação)
  useEffect(() => {
    window.__validateRequiredMetragens = validateRequiredMetragens;
    return () => { delete window.__validateRequiredMetragens; };
  }, [formData]);
  const [metragensApi, setMetragensApi] = useState<any[]>([])

  useEffect(() => {
    fetch(apiUrl("/metragem/"))
      .then((res) => res.json())
      .then(setMetragensApi)
      .catch(() => setMetragensApi([]))
  }, [])

  const metragemItems = [
    {
      id: "areaTerreno",
      label: "Área do Terreno",
      placeholder: "0,00",
      unit: "m²",
      icon: <Mountain className="w-7 h-7" />,
      description: "Área total do terreno",
    },
    {
      id: "testada",
      label: "Testada",
      placeholder: "0,00",
      unit: "m",
      icon: <Ruler className="w-7 h-7" />,
      description: "Frente do terreno",
    },
    {
      id: "areaEdificada",
      label: "Área Edificada",
      placeholder: "0,00",
      unit: "m²",
      icon: <Home className="w-7 h-7" />,
      description: "Área construída",
    },
  ]

  const inputClassName = `
    text-center text-2xl font-bold pr-12 h-16
    text-sky-700 bg-white border-2 border-slate-200 rounded-xl 
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    placeholder:text-slate-400
  `

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8 select-none">
      {/* Header da seção */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Metragens</h2>
        <p className="text-sm text-sky-600 mb-4">Informe as medidas do imóvel</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metragemItems.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 
                       transition-all duration-300 ease-in-out
                       w-full max-w-full min-h-[220px] flex flex-col mx-auto mb-4
                       md:min-w-[260px] md:max-w-[340px]
                       lg:min-w-[300px] lg:max-w-[380px]
                       xl:min-w-[340px] xl:max-w-[420px]"
            style={{ boxShadow: '0 8px 32px 0 rgba(80, 150, 255, 0.18), 0 1.5px 8px 0 rgba(80, 150, 255, 0.10)' }}
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
            <div className="mb-4 text-center opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              {item.icon}
            </div>

            {/* Label */}
            <Label htmlFor={item.id} className="text-lg font-bold text-sky-800 mb-2 block text-center">
              {item.label}
            </Label>

            {/* Descrição */}
            <p className="text-xs text-sky-600 mb-4 text-center">{item.description}</p>

            {/* Input com unidade */}
            <div className="relative">
              <Input
                id={item.id}
                placeholder={item.placeholder}
                value={formData.metragens[item.id as keyof typeof formData.metragens] ?? ""}
                onChange={(e) => {
                  let val = e.target.value.replace(/,/g, ".");
                  // Permite zero, vazio ou número positivo
                  if (/^\d*(\.\d*)?$/.test(val)) {
                    handleNestedInputChange("metragens", item.id, val);
                  }
                }}
                className={inputClassName}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 font-bold text-lg select-none">
                {item.unit}
              </span>
            </div>

            {/* Indicador de preenchimento */}
            <div className="mt-3 text-center">
              <div
                className={`inline-block w-2 h-2 rounded-full transition-colors duration-200 ${
                  formData.metragens[item.id as keyof typeof formData.metragens] ? "bg-green-400" : "bg-slate-300"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-sky-200">
        <p className="text-sm text-sky-600 text-center">Informe as medidas em metros (m) ou metros quadrados (m²)</p>
      </div>
    </div>
  )
}
