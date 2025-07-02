import { useEffect, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface TerrenoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function TerrenoSection({ formData, handleNestedCheckboxChange }: TerrenoSectionProps) {
  // Estados para dados dinâmicos da API
  const [situationOptions, setSituationOptions] = useState<any[]>([])
  const [soilOptions, setSoilOptions] = useState<any[]>([])
  const [topographyOptions, setTopographyOptions] = useState<any[]>([])
  const [levelingOptions, setLevelingOptions] = useState<any[]>([])

  useEffect(() => {
    fetch(apiUrl("/situacao/")).then(r => r.json()).then(setSituationOptions)
    fetch(apiUrl("/caracter-solo/")).then(r => r.json()).then(setSoilOptions)
    fetch(apiUrl("/topografia/")).then(r => r.json()).then(setTopographyOptions)
    fetch(apiUrl("/nivelamento/")).then(r => r.json()).then(setLevelingOptions)
  }, [])

  const situacaoOptions = [
    { encravado: "Encravado" },
    { vila: "Vila" },
    { meioQuadra: "Meio Quadra" },
    { esquina: "Esquina" },
    { comTresFrente: "Com Três Frentes" },
    { todaQuadra: "Toda a Quadra" },
  ]

  const soloOptions = [
    { alagadico: "Alagadiço" },
    { arenoso: "Arenoso" },
    { rochoso: "Rochoso" },
    { normal: "Normal" },
  ]

  const topografiaOptions = [
    { Aclive: "Aclive" },
    { Declive: "Declive" },
    { Encosta: "Encosta" },
    { Horizontal: "Horizontal" },
  ]

  const nivelamentoOptions = [
  { "Abaixo do Nível": "Abaixo do Nível" },
  { "Ao Nível": "Ao Nível" },
  { "Acima do Nível": "Acima do Nível" },
];


  return (
    <div className="space-y-8">
      {/* 1- Situação */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">1- Situação</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {["encravado", "vila", "meioQuadra", "esquina", "comTresFrente", "todaQuadra"].map((key) => (
            <CheckboxField
              key={key}
              id={key}
              label={<span className="font-semibold text-blue-800">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}</span>}
              description=""
              checked={formData.terreno.situacao[key as keyof typeof formData.terreno.situacao]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "situacao", key, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 2- Características do Solo */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">2- Características do Solo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {["alagadico", "arenoso", "rochoso", "normal"].map((key) => (
            <CheckboxField
              key={key}
              id={key}
              label={<span className="font-semibold text-blue-800">{key.charAt(0).toUpperCase() + key.slice(1)}</span>}
              description=""
              checked={formData.terreno.caracteristicasSolo[key as keyof typeof formData.terreno.caracteristicasSolo]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "caracteristicasSolo", key, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 3- Topografia */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">3- Topografia</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {["Aclive", "Declive", "Encosta", "Horizontal"].map((key) => (
            <CheckboxField
              key={key}
              id={key}
              label={<span className="font-semibold text-blue-800">{key}</span>}
              description=""
              checked={formData.terreno.topografia[key as keyof typeof formData.terreno.topografia]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "topografia", key, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 4- Nivelamento */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">4- Nivelamento</h4>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {["abaixoNivel", "aoNivel", "acimaNivel"].map((key) => (
            <CheckboxField
              key={key}
              id={key}
              label={<span className="font-semibold text-blue-800">{key.replace("Nivel", " Nível").replace("ao", "Ao").replace("acima", "Acima").replace("abaixo", "Abaixo")}</span>}
              description=""
              checked={formData.terreno.nivelamento[key as keyof typeof formData.terreno.nivelamento]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "nivelamento", key, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
