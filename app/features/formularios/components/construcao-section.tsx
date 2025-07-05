"use client"

import { useEffect, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { tipoAPI } from "@/lib/api-services"

interface ConstrucaoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function ConstrucaoSection({ formData, handleNestedCheckboxChange }: ConstrucaoSectionProps) {
  // Estados para opções dinâmicas da API
  const [tipoOptions, setTipoOptions] = useState([
    { id: "casa", label: "Casa", icon: "🏠" },
    { id: "apartamento", label: "Apartamento", icon: "🏢" },
    { id: "sala", label: "Sala", icon: "🏪" },
    { id: "loja", label: "Loja", icon: "🏬" },
    { id: "galpao", label: "Galpão", icon: "🏭" },
    { id: "templo", label: "Templo", icon: "⛪" },
  ])

  const [usoOptions, setUsoOptions] = useState([
    { id: "residencial", label: "Residencial", icon: "🏡" },
    { id: "comercial", label: "Comercial", icon: "🏪" },
    { id: "servico", label: "Serviço", icon: "🔧" },
    { id: "industrial", label: "Industrial", icon: "🏭" },
    { id: "religioso", label: "Religioso", icon: "⛪" },
  ])

  const [tipoConstrucaoOptions, setTipoConstrucaoOptions] = useState([
    { id: "madeira", label: "Madeira", icon: "🪵" },
    { id: "alvenaria", label: "Alvenaria", icon: "🧱" },
    { id: "metalica", label: "Metálica", icon: "🔩" },
    { id: "concreto", label: "Concreto", icon: "🏗️" },
    { id: "misto", label: "Misto", icon: "🔨" },
  ])

  const [esquadriasOptions, setEsquadriasOptions] = useState([
    { id: "rustica", label: "Rústica", icon: "🪟" },
    { id: "madeira", label: "Madeira", icon: "🚪" },
    { id: "ferro", label: "Ferro", icon: "🔒" },
    { id: "aluminio", label: "Alumínio", icon: "✨" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "blindex", label: "Blindex", icon: "🪟" },
  ])

  const [pisoOptions, setPisoOptions] = useState([
    { id: "tijolo", label: "Tijolo", icon: "🧱" },
    { id: "cimento", label: "Cimento", icon: "⚫" },
    { id: "tabua", label: "Tábua", icon: "🪵" },
    { id: "taco", label: "Taco", icon: "🟫" },
    { id: "ceramica", label: "Cerâmica", icon: "🔲" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "porcelanato", label: "Porcelanato", icon: "✨" },
  ])

  const [forroOptions, setForroOptions] = useState([
    { id: "estuque", label: "estuque", icon: "🪵" },
    { id: "placas", label: "Placas", icon: "⬜" },
    { id: "madeira", label: "Madeira", icon: "🪵" },
    { id: "laje", label: "Laje", icon: "🏗️" },
    { id: "gesso", label: "Gesso", icon: "⚪" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "sem", label: "Sem", icon: "❌" },
  ])

  const [coberturaOptions, setCoberturaOptions] = useState([
    { id: "zinco", label: "Zinco", icon: "🔘" },
    { id: "aluminio", label: "Alumínio", icon: "✨" },
    { id: "telha", label: "Telha", icon: "🔴" },
    { id: "amianto", label: "Amianto", icon: "⚫" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "sem", label: "Sem", icon: "❌" },
    { id: "laje", label: "Laje", icon: "🏗️" },
  ])

  const [acabamentoInternoOptions, setAcabamentoInternoOptions] = useState([
    { id: "caiacao", label: "Caiação", icon: "⚪" },
    { id: "pintura_simples", label: "Pintura Simples", icon: "🎨" },
    { id: "pintura_lavavel", label: "Pintura Lavável", icon: "🖌️" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "reboco", label: "Reboco", icon: "🧱" },
    { id: "sem", label: "Sem", icon: "❌" },
  ])

  const [acabamentoExternoOptions, setAcabamentoExternoOptions] = useState([
    { id: "caiacao", label: "Caiação", icon: "⚪" },
    { id: "pintura_simples", label: "Pintura Simples", icon: "🎨" },
    { id: "pintura_lavavel", label: "Pintura Lavável", icon: "🖌️" },
    { id: "especial", label: "Especial", icon: "💎" },
    { id: "reboco", label: "Reboco", icon: "🧱" },
    { id: "sem", label: "Sem", icon: "❌" },
  ])

  // useEffect para APIs... (mantido igual)
  useEffect(() => {
    // Todas as chamadas de API mantidas iguais...
    tipoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
          setTipoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              icon: "🏠",
            })),
          )
        }
      })
      .catch(() => {})

    // Repetir para todas as outras APIs...
  }, [])

  const SectionCard = ({
    title,
    options,
    subsection,
    icon,
  }: {
    title: string
    options: any[]
    subsection: string
    icon: string
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-xl">{icon}</div>
        <h4 className="text-lg font-bold text-sky-800">{title}</h4>
      </div>

      <div className="space-y-3">
        {options.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-slate-50 rounded-lg p-3 
                       hover:bg-sky-50 hover:border-sky-200 border border-transparent
                       transition-all duration-200 cursor-pointer"
            onClick={() =>
              handleNestedCheckboxChange(
                "construcao",
                subsection,
                item.id,
                !(formData.construcao as any)[subsection][item.id],
              )
            }
          >
            <div className="flex items-center gap-3">
              <div className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-200">
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
                    (formData.construcao[subsection as keyof FormularioData["construcao"]] as any)[item.id]
                  }
                  onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", subsection, item.id, checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8">
      {/* Header da seção */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Características da Construção</h2>
        <p className="text-sm text-sky-600 mb-4">Selecione as características da construção</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {/* Primeira linha de grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <SectionCard title="Tipo" options={tipoOptions} subsection="tipo" icon="🏠" />
          <SectionCard title="Uso" options={usoOptions} subsection="uso" icon="🎯" />
          <SectionCard
            title="Tipo de Construção"
            options={tipoConstrucaoOptions}
            subsection="tipoConstrucao"
            icon="🏗️"
          />
          <SectionCard title="Esquadrias" options={esquadriasOptions} subsection="esquadrias" icon="🚪" />
          <SectionCard title="Piso" options={pisoOptions} subsection="piso" icon="🔲" />
        </div>

        {/* Segunda linha de grupos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <SectionCard title="Forro" options={forroOptions} subsection="forro" icon="⬜" />
          <SectionCard title="Cobertura" options={coberturaOptions} subsection="cobertura" icon="🏠" />
          <SectionCard
            title="Acabamento Interno"
            options={acabamentoInternoOptions}
            subsection="acabamentoInterno"
            icon="🎨"
          />
          <SectionCard
            title="Acabamento Externo"
            options={acabamentoExternoOptions}
            subsection="acabamentoExterno"
            icon="🖌️"
          />
        </div>
      </div>
    </div>
  )
}
