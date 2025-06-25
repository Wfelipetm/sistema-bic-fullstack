import { useEffect, useState } from "react";
import { CheckboxField } from "./checkbox-field";
import type { FormularioData } from "@/app/types/formulario";
import {
  tipoAPI,
  usoAPI,
  tipoConstrucaoAPI,
  esquadrilhaAPI,
  pisoAPI,
  forroAPI,
  coberturaAPI,
  acabamentoInternoAPI,
  acabamentoExternoAPI,
} from "@/lib/api-services";

interface ConstrucaoSectionProps {
  formData: FormularioData;
  handleNestedCheckboxChange: (
    section: string,
    subsection: string,
    field: string,
    checked: boolean
  ) => void;
}

export function ConstrucaoSection({
  formData,
  handleNestedCheckboxChange,
}: ConstrucaoSectionProps) {
  // Estados para opções dinâmicas da API
  const [tipoOptions, setTipoOptions] = useState([
    { id: "casa", label: "1- Casa" },
    { id: "apartamento", label: "2- Apartamento" },
    { id: "sala", label: "3- Sala" },
    { id: "loja", label: "4- Loja" },
    { id: "galpao", label: "5- Galpão" },
    { id: "templo", label: "6- Templo" },
  ]);
  const [usoOptions, setUsoOptions] = useState([
    { id: "residencial", label: "1- Residencial" },
    { id: "comercial", label: "2- Comercial" },
    { id: "servico", label: "3- Serviço" },
    { id: "industrial", label: "4- Industrial" },
    { id: "religioso", label: "5- Religioso" },
  ]);
  const [tipoConstrucaoOptions, setTipoConstrucaoOptions] = useState([
    { id: "madeira", label: "1- Madeira" },
    { id: "alvenaria", label: "2- Alvenaria" },
    { id: "metalica", label: "3- Metálica" },
    { id: "concreto", label: "4- Concreto" },
    { id: "misto", label: "5- Misto" },
  ]);
  const [esquadriasOptions, setEsquadriasOptions] = useState([
    { id: "rustica", label: "1- Rústica" },
    { id: "madeira", label: "2- Madeira" },
    { id: "ferro", label: "3- Ferro" },
    { id: "aluminio", label: "4- Alumínio" },
    { id: "especial", label: "5- Especial" },
    { id: "blindex", label: "6- Blindex" },
  ]);
  const [pisoOptions, setPisoOptions] = useState([
    { id: "tijolo", label: "1- Tijolo" },
    { id: "cimento", label: "2- Cimento" },
    { id: "tabua", label: "3- Tábua" },
    { id: "taco", label: "4- Taco" },
    { id: "ceramica", label: "5- Cerâmica" },
    { id: "especial", label: "6- Especial" },
    { id: "porcelanato", label: "7- Porcelanato" },
  ]);
  const [forroOptions, setForroOptions] = useState([
    { id: "estaque", label: "1- Estaque" },
    { id: "placas", label: "2- Placas" },
    { id: "madeira", label: "3- Madeira" },
    { id: "laje", label: "4- Laje" },
    { id: "gesso", label: "5- Gesso" },
    { id: "especial", label: "6- Especial" },
    { id: "sem", label: "7- Sem" },
  ]);
  const [coberturaOptions, setCoberturaOptions] = useState([
    { id: "zinco", label: "1- Zinco" },
    { id: "aluminio", label: "2- Alumínio" },
    { id: "telha", label: "3- Telha" },
    { id: "amianto", label: "4- Amianto" },
    { id: "especial", label: "5- Especial" },
    { id: "sem", label: "6- Sem" },
    { id: "laje", label: "7- Laje" },
  ]);
  const [acabamentoInternoOptions, setAcabamentoInternoOptions] = useState([
    { id: "caiacao", label: "1- Caiação" },
    { id: "pinturaSimples", label: "2- Pintura Simples" },
    { id: "pinturaLavavel", label: "3- Pintura Lavável" },
    { id: "especial", label: "4- Especial" },
    { id: "reboco", label: "5- Reboco" },
    { id: "sem", label: "6- Sem" },
  ]);
  const [acabamentoExternoOptions, setAcabamentoExternoOptions] = useState([
    { id: "caiacao", label: "1- Caiação" },
    { id: "pinturaSimples", label: "2- Pintura Simples" },
    { id: "pinturaLavavel", label: "3- Pintura Lavável" },
    { id: "especial", label: "4- Especial" },
    { id: "reboco", label: "5- Reboco" },
    { id: "sem", label: "6- Sem" },
  ]);

  useEffect(() => {
    tipoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setTipoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    usoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setUsoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    tipoConstrucaoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setTipoConstrucaoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    esquadrilhaAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setEsquadriasOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    pisoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setPisoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    forroAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setForroOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    coberturaAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setCoberturaOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    acabamentoInternoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setAcabamentoInternoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
    acabamentoExternoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id");
          setAcabamentoExternoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: `${idx + 1}- ${
                key.charAt(0).toUpperCase() + key.slice(1)
              }`,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 1- Tipo */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">1- Tipo:</h4>
          <div className="space-y-3">
            {tipoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.tipo[
                    item.id as keyof typeof formData.construcao.tipo
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "tipo",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* 2- Uso */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">2- Uso:</h4>
          <div className="space-y-3">
            {usoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.uso[
                    item.id as keyof typeof formData.construcao.uso
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "uso",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
        {/* 3- Tipo de Construção */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            3- Tipo de Construção:
          </h4>
          <div className="space-y-3">
            {tipoConstrucaoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.tipoConstrucao[
                    item.id as keyof typeof formData.construcao.tipoConstrucao
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "tipoConstrucao",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
        {/* 4- Esquadrias */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            4- Esquadrias:
          </h4>
          <div className="space-y-3">
            {esquadriasOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.esquadrias[
                    item.id as keyof typeof formData.construcao.esquadrias
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "esquadrias",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
        {/* 5- Piso */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">5- Piso:</h4>
          <div className="space-y-3">
            {pisoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.piso[
                    item.id as keyof typeof formData.construcao.piso
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "piso",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* 6- Forro */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            6- Forro:
          </h4>
          <div className="space-y-3">
            {forroOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.forro[
                    item.id as keyof typeof formData.construcao.forro
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "forro",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
        {/* 7- Cobertura */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            7- Cobertura:
          </h4>
          <div className="space-y-3">
            {coberturaOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.cobertura[
                    item.id as keyof typeof formData.construcao.cobertura
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "cobertura",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
        {/* 8- Acabamento Interno */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            8- Acabamento Interno:
          </h4>
          <div className="space-y-3">
            {acabamentoInternoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.acabamentoInterno[
                    item.id as keyof typeof formData.construcao.acabamentoInterno
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "acabamentoInterno",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* 9- Acabamento Externo */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            9- Acabamento Externo:
          </h4>
          <div className="space-y-3">
            {acabamentoExternoOptions.map((item) => (
              <CheckboxField
                key={item.id}
                id={item.id}
                label={item.label}
                description=""
                checked={
                  formData.construcao.acabamentoExterno[
                    item.id as keyof typeof formData.construcao.acabamentoExterno
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedCheckboxChange(
                    "construcao",
                    "acabamentoExterno",
                    item.id,
                    checked
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
      </div>
    </div>
  );
}
