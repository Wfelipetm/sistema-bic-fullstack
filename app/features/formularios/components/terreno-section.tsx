import { useEffect, useState } from "react";
import { CheckboxField } from "./checkbox-field";
import type { FormularioData } from "@/app/types/formulario";
import {
  situacaoAPI,
  caracterSoloAPI,
  topografiaAPI,
  nivelamentoAPI,
  createTerreno,
} from "@/lib/api-services";

interface TerrenoSectionProps {
  formData: FormularioData;
  handleNestedCheckboxChange: (
    section: string,
    subsection: string,
    field: string,
    checked: boolean
  ) => void;
}

export function TerrenoSection({
  formData,
  handleNestedCheckboxChange,
}: TerrenoSectionProps) {
  const [situacaoOptions, setSituacaoOptions] = useState([
  { id: "encravamento", label: "1 - Encravamento" },
  { id: "vila", label: "2 - Vila" },
  { id: "meio_quadra", label: "3 - Meio de Quadra" },
  { id: "esquina", label: "4 - Esquina" },
  { id: "tres_frentes", label: "5 - Três Frentes" },
  { id: "toda_quadra", label: "6 - Toda a Quadra" },
]);

  
// 2 - Características do Solo
const [soloOptions, setSoloOptions] = useState([
  { id: "alagadico", label: "1 - Alagadiço" },
  { id: "arenoso", label: "2 - Arenoso" },
  { id: "rochoso", label: "3 - Rochoso" },
  { id: "normal", label: "4 - Normal" },
]);

// 3 - Topografia
const [topografiaOptions, setTopografiaOptions] = useState([
  { id: "aclive", label: "1 - Aclive" },
  { id: "declive", label: "2 - Declive" },
  { id: "encosta", label: "3 - Encosta" },
  { id: "horizontal", label: "4 - Horizontal" },
]);

// 4 - Nivelamento
const [nivelamentoOptions, setNivelamentoOptions] = useState([
  { id: "abaixoNivel", label: "1 - Abaixo do Nível da Rua" },
  { id: "aoNivel", label: "2 - Ao Nível da Rua" },
  { id: "acimaNivel", label: "3 - Acima do Nível da Rua" },
]);


  useEffect(() => {
    situacaoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter(
          (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
        );
        setSituacaoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`,
          }))
        );
      }
    });
    caracterSoloAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter(
          (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
        );
        setSoloOptions(
          keys.map((key, idx) => ({
            id: key,
            label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`,
          }))
        );
      }
    });
    topografiaAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter(
          (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
        );
        setTopografiaOptions(
          keys.map((key, idx) => ({
            id: key,
            label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`,
          }))
        );
      }
    });
    nivelamentoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter(
          (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
        );
        setNivelamentoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: `${idx + 1}- ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}`,
          }))
        );
      }
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* 1- Situação */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">1- Situação</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {situacaoOptions.map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={<span className="font-semibold text-blue-800">{item.label}</span>}
              description=""
              checked={formData.terreno.situacao[item.id as keyof typeof formData.terreno.situacao]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "situacao", item.id, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 2- Características do Solo */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">2- Características do Solo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {soloOptions.map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={<span className="font-semibold text-blue-800">{item.label}</span>}
              description=""
              checked={formData.terreno.caracteristicasSolo[item.id as keyof typeof formData.terreno.caracteristicasSolo]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "caracteristicasSolo", item.id, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 3- Topografia */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">3- Topografia</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topografiaOptions.map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={<span className="font-semibold text-blue-800">{item.label}</span>}
              description=""
              checked={formData.terreno.topografia[item.id as keyof typeof formData.terreno.topografia]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "topografia", item.id, checked)
              }
            />
          ))}
        </div>
      </div>

      {/* 4- Nivelamento */}
      <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-6">
        <h4 className="font-bold text-lg mb-4 text-blue-900">4- Nivelamento</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nivelamentoOptions.map((item) => (
            <CheckboxField
              key={item.id}
              id={item.id}
              label={<span className="font-semibold text-blue-800">{item.label}</span>}
              description=""
              checked={formData.terreno.nivelamento[item.id as keyof typeof formData.terreno.nivelamento]}
              onCheckedChange={(checked) =>
                handleNestedCheckboxChange("terreno", "nivelamento", item.id, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
