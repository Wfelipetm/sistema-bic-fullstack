import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"

interface ConstrucaoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function ConstrucaoSection({ formData, handleNestedCheckboxChange }: ConstrucaoSectionProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1- Tipo */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">1- Tipo:</h4>
          <div className="space-y-3">
            {[
              { id: "casa", label: "1- Casa" },
              { id: "apartamento", label: "2- Apartamento" },
              { id: "sala", label: "3- Sala" },
              { id: "loja", label: "4- Loja" },
              { id: "galpao", label: "5- Galpão" },
              { id: "templo", label: "6- Templo" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.tipo[item.id as keyof typeof formData.construcao.tipo]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "tipo", item.id, checked)}
              />
            ))}
          </div>
        </div>

        {/* 2- Uso */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">2- Uso:</h4>
          <div className="space-y-3">
            {[
              { id: "residencial", label: "1- Residencial" },
              { id: "comercial", label: "2- Comercial" },
              { id: "servico", label: "3- Serviço" },
              { id: "industrial", label: "4- Industrial" },
              { id: "religioso", label: "5- Religioso" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.uso[item.id as keyof typeof formData.construcao.uso]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "uso", item.id, checked)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3- Tipo de Construção */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">3- Tipo de Construção:</h4>
          <div className="space-y-3">
            {[
              { id: "madeira", label: "1- Madeira" },
              { id: "alvenaria", label: "2- Alvenaria" },
              { id: "metalica", label: "3- Metálica" },
              { id: "concreto", label: "4- Concreto" },
              { id: "misto", label: "5- Misto" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.tipoConstrucao[item.id as keyof typeof formData.construcao.tipoConstrucao]}
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange("construcao", "tipoConstrucao", item.id, checked)
                }
              />
            ))}
          </div>
        </div>

        {/* 4- Esquadrias */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">4- Esquadrias:</h4>
          <div className="space-y-3">
            {[
              { id: "rustica", label: "1- Rústica" },
              { id: "madeira", label: "2- Madeira" },
              { id: "ferro", label: "3- Ferro" },
              { id: "aluminio", label: "4- Alumínio" },
              { id: "especial", label: "5- Especial" },
              { id: "blindex", label: "6- Blindex" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.esquadrias[item.id as keyof typeof formData.construcao.esquadrias]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "esquadrias", item.id, checked)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 5- Piso */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">5- Piso:</h4>
          <div className="space-y-3">
            {[
              { id: "tijolo", label: "1- Tijolo" },
              { id: "cimento", label: "2- Cimento" },
              { id: "tabua", label: "3- Tábua" },
              { id: "taco", label: "4- Taco" },
              { id: "ceramica", label: "5- Cerâmica" },
              { id: "especial", label: "6- Especial" },
              { id: "porcelanato", label: "7- Porcelanato" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.piso[item.id as keyof typeof formData.construcao.piso]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "piso", item.id, checked)}
              />
            ))}
          </div>
        </div>

        {/* 6- Forro */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">6- Forro:</h4>
          <div className="space-y-3">
            {[
              { id: "estaque", label: "1- Estaque" },
              { id: "placas", label: "2- Placas" },
              { id: "madeira", label: "3- Madeira" },
              { id: "laje", label: "4- Laje" },
              { id: "gesso", label: "5- Gesso" },
              { id: "especial", label: "6- Especial" },
              { id: "sem", label: "7- Sem" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.forro[item.id as keyof typeof formData.construcao.forro]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "forro", item.id, checked)}
              />
            ))}
          </div>
        </div>

        {/* 7- Cobertura */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">7- Cobertura:</h4>
          <div className="space-y-3">
            {[
              { id: "zinco", label: "1- Zinco" },
              { id: "aluminio", label: "2- Alumínio" },
              { id: "telha", label: "3- Telha" },
              { id: "amianto", label: "4- Amianto" },
              { id: "especial", label: "5- Especial" },
              { id: "sem", label: "6- Sem" },
              { id: "laje", label: "7- Laje" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={formData.construcao.cobertura[item.id as keyof typeof formData.construcao.cobertura]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", "cobertura", item.id, checked)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 8- Acabamento Interno */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">8- Acabamento Interno:</h4>
          <div className="space-y-3">
            {[
              { id: "caiacao", label: "1- Caiação" },
              { id: "pinturaSimples", label: "2- Pintura Simples" },
              { id: "pinturaLavavel", label: "3- Pintura Lavável" },
              { id: "especial", label: "4- Especial" },
              { id: "reboco", label: "5- Reboco" },
              { id: "sem", label: "6- Sem" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.acabamentoInterno[item.id as keyof typeof formData.construcao.acabamentoInterno]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange("construcao", "acabamentoInterno", item.id, checked)
                }
              />
            ))}
          </div>
        </div>

        {/* 9- Acabamento Externo */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">9- Acabamento Externo:</h4>
          <div className="space-y-3">
            {[
              { id: "caiacao", label: "1- Caiação" },
              { id: "pinturaSimples", label: "2- Pintura Simples" },
              { id: "pinturaLavavel", label: "3- Pintura Lavável" },
              { id: "especial", label: "4- Especial" },
              { id: "reboco", label: "5- Reboco" },
              { id: "sem", label: "6- Sem" },
            ].map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.acabamentoExterno[item.id as keyof typeof formData.construcao.acabamentoExterno]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange("construcao", "acabamentoExterno", item.id, checked)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
