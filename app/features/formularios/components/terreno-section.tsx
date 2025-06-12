import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"

interface TerrenoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function TerrenoSection({ formData, handleNestedCheckboxChange }: TerrenoSectionProps) {
  return (
    <div className="space-y-8">
      {/* 1- Situação */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">1- Situação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: "encravado", label: "1- Encravado" },
            { id: "vila", label: "2- Vila" },
            { id: "meioQuadra", label: "3- Meio de Quadra" },
            { id: "esquina", label: "4- Esquina" },
            { id: "comTresFrente", label: "5- Com Três Frentes" },
            { id: "todaQuadra", label: "6- Toda a Quadra" },
          ].map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={item.label}
              description=""
              checked={formData.terreno.situacao[item.id as keyof typeof formData.terreno.situacao]}
              onCheckedChange={(checked) => handleNestedCheckboxChange("terreno", "situacao", item.id, checked)}
            />
          ))}
        </div>
      </div>

      {/* 2- Características do Solo */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">2- Características do Solo:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "alagadico", label: "1- Alagadiço" },
            { id: "arenoso", label: "2- Arenoso" },
            { id: "rochoso", label: "3- Rochoso" },
            { id: "normal", label: "4- Normal" },
          ].map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={item.label}
              description=""
              checked={
                formData.terreno.caracteristicasSolo[item.id as keyof typeof formData.terreno.caracteristicasSolo]
              }
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "caracteristicasSolo", item.id, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 3- Topografia */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">3- Topografia:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "aclive", label: "1- Aclive" },
            { id: "declive", label: "2- Declive" },
            { id: "encosta", label: "3- Encosta" },
            { id: "horizontal", label: "4- Horizontal" },
          ].map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={item.label}
              description=""
              checked={formData.terreno.topografia[item.id as keyof typeof formData.terreno.topografia]}
              onCheckedChange={(checked) => handleNestedCheckboxChange("terreno", "topografia", item.id, checked)}
            />
          ))}
        </div>
      </div>

      {/* 4- Nivelamento */}
      <div>
        <h4 className="font-semibold text-lg mb-4 text-gray-800">4- Nivelamento:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "abaixoNivel", label: "1- Abaixo do Nível" },
            { id: "aoNivel", label: "2- Ao Nível" },
            { id: "acimaNivel", label: "3- Acima do Nível" },
          ].map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={item.label}
              description=""
              checked={formData.terreno.nivelamento[item.id as keyof typeof formData.terreno.nivelamento]}
              onCheckedChange={(checked) => handleNestedCheckboxChange("terreno", "nivelamento", item.id, checked)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
