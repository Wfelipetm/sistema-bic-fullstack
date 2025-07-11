"use client"

import { useEffect, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"
import { Car, Lightbulb, Droplet, Trash2, Clipboard, Trash, Lamp } from "lucide-react"

interface LogradouroSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
}

import { toast } from "sonner"

// Adiciona tipagem global para a função de validação
declare global {
  interface Window {
    __validateRequiredLogradouro?: () => boolean;
  }
}

export function LogradouroSection({ formData, handleCheckboxChange }: LogradouroSectionProps) {
  // Depuração: veja o estado do formulário sempre que ele mudar
  useEffect(() => {}, [formData])

  // Função de validação obrigatória
  function validateRequiredLogradouro() {
    // Pelo menos um item de logradouro deve ser selecionado
    const algumSelecionado = Object.values(formData.logradouro).some(Boolean);
    if (!algumSelecionado) {
      toast.warning("Selecione pelo menos uma opção em Infraestrutura do Logradouro.");
      return false;
    }
    return true;
  }

  // Exponha a função de validação para o componente pai via window (workaround para navegação)
  useEffect(() => {
    window.__validateRequiredLogradouro = validateRequiredLogradouro;
    return () => { delete window.__validateRequiredLogradouro; };
  }, [formData]);

  const [logradouroItems, setLogradouroItems] = useState([
    {
      id: "pavimentacao",
      label: "Pavimentação",
      description: "Via pavimentada com asfalto.",
      icon: <Car className="w-8 h-8 text-sky-400 animate-pulse" />, // Carro para pavimentação
    },
    {
      id: "iluminacaoPublica",
      label: "Iluminação Pública",
      description: "Sistema de iluminação adequado.",
      icon: <Lamp className="w-8 h-8 text-sky-400 animate-pulse" />,
    },
    {
      id: "redeEsgoto",
      label: "Rede de Esgoto",
      description: "Sistema de esgotamento sanitário.",
      icon: <Droplet className="w-8 h-8 text-sky-400 animate-pulse" />,
    },
    {
      id: "redeAgua",
      label: "Rede de Água",
      description: "Abastecimento de água tratada.",
      icon: <Droplet className="w-8 h-8 text-sky-400 animate-pulse" />,
    },
    {
      id: "coletaLixo",
      label: "Coleta de Lixo",
      description: "Serviço regular de coleta.",
      icon: <Trash className="w-8 h-8 text-sky-400 animate-pulse" />,
    },
  ])

  useEffect(() => {
    fetch(apiUrl("/info-logradouro/"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(
            (k) => k !== "id" && k !== "boletim_id" && k !== "created_at" && k !== "updated_at",
          )
          setLogradouroItems(
            keys.map((key, idx) => {
              // Remove underscores e capitaliza corretamente
              const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              // Seleciona ícone adequado
              let icon = <Clipboard className="w-8 h-8 text-sky-400 animate-pulse" />;
              if (key.toLowerCase().includes('pav')) icon = <Car className="w-8 h-8 text-sky-400 animate-pulse" />;
              else if (key.toLowerCase().includes('ilum')) icon = <Lamp className="w-8 h-8 text-sky-400 animate-pulse" />;
              else if (key.toLowerCase().includes('esgoto')) icon = <Droplet className="w-8 h-8 text-sky-400 animate-pulse" />;
              else if (key.toLowerCase().includes('agua')) icon = <Droplet className="w-8 h-8 text-sky-400 animate-pulse" />;
              else if (key.toLowerCase().includes('lixo')) icon = <Trash className="w-8 h-8 text-sky-400 animate-pulse" />;
              return {
                id: key,
                label,
                description: '',
                icon,
              };
            })
          )
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8 select-none">
      {/* Header da seção */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Infraestrutura do Logradouro</h2>
        <p className="text-sm text-sky-600 mb-4">Selecione os itens de infraestrutura disponíveis no local</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div> */}

      {/* Grid de itens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {logradouroItems.map((item, index) => (
          <div
        key={item.id}
        className="group relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 
               transition-all duration-300 ease-in-out cursor-pointer
               flex flex-col items-center h-full w-full min-h-[180px] mx-auto
               hover:shadow-3xl hover:scale-105 hover:bg-sky-50/20"
        style={{ boxShadow: '0 8px 32px 0 rgba(80, 150, 255, 0.18), 0 1.5px 8px 0 rgba(80, 150, 255, 0.10)' }}
        onClick={() =>
          handleCheckboxChange(
            "logradouro",
            item.id,
            !formData.logradouro[item.id as keyof typeof formData.logradouro],
          )
        }
          >
        {/* Ícone */}
        <div className="mb-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
          {item.icon}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 w-full text-center">
          <span className="font-semibold text-sky-700 group-hover:text-sky-800 transition-colors duration-200 block text-lg mb-1">
            {item.label}
          </span>
          <span className="text-xs text-sky-600 block mb-2">{item.description}</span>
          <CheckboxField
            id={item.id}
            label={null}
            description={item.description}
            checked={formData.logradouro[item.id as keyof typeof formData.logradouro]}
            onCheckedChange={(checked) => handleCheckboxChange("logradouro", item.id, checked)}
          />
        </div>

        {/* Indicador visual de seleção */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 pointer-events-none transition-all duration-200 ${
            formData.logradouro[item.id as keyof typeof formData.logradouro]
          ? "border-sky-400 bg-sky-50/30"
          : "border-transparent"
          }`}
        />
          </div>
        ))}
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-sky-200">
        <div className="flex items-center justify-between text-sm text-sky-600">
          <p>Clique nos cards para selecionar/deselecionar os itens</p>
          <p className="font-medium">
            {Object.values(formData.logradouro).filter(Boolean).length} de {logradouroItems.length} selecionados
          </p>
        </div>
      </div>
    </div>
  )
}
