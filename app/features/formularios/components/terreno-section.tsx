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
  const [situacaoOptions, setSituacaoOptions] = useState<any[]>([])
  const [soloOptions, setSoloOptions] = useState<any[]>([])
  const [topografiaOptions, setTopografiaOptions] = useState<any[]>([])
  const [nivelamentoOptions, setNivelamentoOptions] = useState<any[]>([])

  useEffect(() => {
    fetch(apiUrl("/situacao/")).then(r => r.json()).then(setSituacaoOptions)
    fetch(apiUrl("/caracter-solo/")).then(r => r.json()).then(setSoloOptions)
    fetch(apiUrl("/topografia/")).then(r => r.json()).then(setTopografiaOptions)
    fetch(apiUrl("/nivelamento/")).then(r => r.json()).then(setNivelamentoOptions)
  }, [])

  return (
    <div className="space-y-8">
      {/* 1- Situação */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">1- Situação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {situacaoOptions.length > 0
            ? situacaoOptions.map((item, idx) => (
                <CheckboxField
                  key={idx}
                  id={Object.keys(item)[0]}
                  label={Object.keys(item)[0]}
                  description=""
                  checked={formData.terreno.situacao[Object.keys(item)[0] as keyof typeof formData.terreno.situacao]}
                  onCheckedChange={(checked) =>
                    handleNestedCheckboxChange("terreno", "situacao", Object.keys(item)[0], checked)
                  }
                />
              ))
            : null}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.terreno.situacao.encravado}
              onChange={e => handleNestedCheckboxChange("terreno", "situacao", "encravado", e.target.checked)}
            />
            Encravado
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.terreno.situacao.vila}
              onChange={e => handleNestedCheckboxChange("terreno", "situacao", "vila", e.target.checked)}
            />
            Vila
          </label>
          {/* Repita para as demais opções */}
        </div>
      </div>

      {/* 2- Características do Solo */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">2- Características do Solo:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {soloOptions.length > 0
            ? soloOptions.map((item, idx) => (
                <CheckboxField
                  key={idx}
                  id={Object.keys(item)[0]}
                  label={Object.keys(item)[0]}
                  description=""
                  checked={
                    formData.terreno.caracteristicasSolo[Object.keys(item)[0] as keyof typeof formData.terreno.caracteristicasSolo]
                  }
                  onCheckedChange={(checked) =>
                    handleNestedCheckboxChange("terreno", "caracteristicasSolo", Object.keys(item)[0], checked)
                  }
                />
              ))
            : null}
        </div>
      </div>

      {/* 3- Topografia */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">3- Topografia:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topografiaOptions.length > 0
            ? topografiaOptions.map((item, idx) => (
                <CheckboxField
                  key={idx}
                  id={Object.keys(item)[0]}
                  label={Object.keys(item)[0]}
                  description=""
                  checked={formData.terreno.topografia[Object.keys(item)[0] as keyof typeof formData.terreno.topografia]}
                  onCheckedChange={(checked) =>
                    handleNestedCheckboxChange("terreno", "topografia", Object.keys(item)[0], checked)
                  }
                />
              ))
            : null}
        </div>
      </div>

      {/* 4- Nivelamento */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">4- Nivelamento:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nivelamentoOptions.length > 0
            ? nivelamentoOptions.map((item, idx) => (
                <CheckboxField
                  key={idx}
                  id={Object.keys(item)[0]}
                  label={Object.keys(item)[0]}
                  description=""
                  checked={formData.terreno.nivelamento[Object.keys(item)[0] as keyof typeof formData.terreno.nivelamento]}
                  onCheckedChange={(checked) =>
                    handleNestedCheckboxChange("terreno", "nivelamento", Object.keys(item)[0], checked)
                  }
                />
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
