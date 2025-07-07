// Exponha função global para validação obrigatória
declare global {
  interface Window {
    __validateRequiredAvaliacaoUrbanistica?: () => boolean;
  }
}
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Star, Sparkles, Zap, AlertTriangle, X, BarChart, Ban, Clock, Ruler, Square, Signpost, Pencil, Car, History, Divide, CheckSquare, GripHorizontal, LayoutGrid } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"
import { toast } from "sonner"

interface AvaliacaoUrbanisticaSectionProps {
  formData: FormularioData
  handleCheckboxChange: (section: string, field: string, checked: boolean) => void
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
  handleInputChange: (field: string, value: string | boolean) => void
}

export function AvaliacaoUrbanisticaSection({
  formData,
  handleCheckboxChange,
  handleNestedCheckboxChange,
  handleInputChange,
}: AvaliacaoUrbanisticaSectionProps) {
  // Validação obrigatória dos campos/grupos
  // Validação obrigatória: só permite salvar se pelo menos uma opção de calçamento estiver marcada
  function validateRequiredAvaliacaoUrbanistica() {
    // Força a validação: só permite salvar se pelo menos uma opção de calçamento estiver marcada
    if (!formData.calcamento || Object.values(formData.calcamento).filter(Boolean).length === 0) {
      toast.error("Selecione pelo menos uma opção em Calçamento.");
      return false;
    }
    // Força a validação: só permite salvar se uma opção de avaliação urbanística estiver marcada
    if (!formData.avaliacaoUrbanistica || String(formData.avaliacaoUrbanistica).trim() === "") {
      toast.error("Selecione pelo menos uma opção em Avaliação Urbanística do Logradouro.");
      return false;
    }
    return true;
  }

  // Exponha a função para navegação externa (como em terreno-section)
  useEffect(() => {
    window.__validateRequiredAvaliacaoUrbanistica = validateRequiredAvaliacaoUrbanistica;
    return () => { delete window.__validateRequiredAvaliacaoUrbanistica; };
  }, [formData]);
  const [avaliacaoOptions, setAvaliacaoOptions] = useState([
    { value: "alta", label: "Alta", description: "Excelente infraestrutura", icon: <Star className="w-6 h-6 text-yellow-400" /> },
    { value: "media", label: "Média", description: "Boa infraestrutura", icon: <Sparkles className="w-6 h-6 text-yellow-300" /> },
    { value: "mediaBaixa", label: "Média Baixa", description: "Infraestrutura regular", icon: <Zap className="w-6 h-6 text-sky-400" /> },
    { value: "baixa", label: "Baixa", description: "Infraestrutura limitada", icon: <AlertTriangle className="w-6 h-6 text-orange-400" /> },
    { value: "muitoBaixa", label: "Muito Baixa", description: "Infraestrutura precária", icon: <X className="w-6 h-6 text-red-400" /> },
  ])

  useEffect(() => {
    fetch(apiUrl("/avali-urba-logradouro/"))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter(
            (k) => k !== "id" && k !== "created_at" && k !== "updated_at"
          )
          setAvaliacaoOptions(
            keys.map((key) => ({
              value: key,
              label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
              description: "",
              icon: <BarChart className="w-6 h-6 text-sky-500" />,
            })),
          )
        }
      })
      .catch(() => {})
  }, [])

  const handleObservacoesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 400) {
      toast.warning("Limite de 400 caracteres atingido!")
      return
    }
    handleInputChange("observacoes", e.target.value)
  }



  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8 select-none">
      <div className="space-y-8">
        {/* Avaliação Urbanística do Logradouro */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl"><BarChart className="w-7 h-7 text-sky-500" /></div>
            <h4 className="text-xl font-bold text-sky-800">Avaliação Urbanística do Logradouro</h4>
            <div className="flex-1 h-px bg-sky-200"></div>
          </div>

          <RadioGroup
            value={formData.avaliacaoUrbanistica}
            onValueChange={(value) => handleInputChange("avaliacaoUrbanistica", value)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {avaliacaoOptions.map((item, index) => (
              <div
                key={item.value}
                className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  formData.avaliacaoUrbanistica === item.value
                    ? "border-sky-400 bg-sky-50 shadow-md"
                    : "border-slate-200 hover:border-sky-200 hover:bg-sky-50/50 hover:shadow-sm"
                }`}
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md group-hover:bg-sky-600 transition-colors duration-200">
                  {index + 1}
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={item.value}
                    id={item.value}
                    className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500
                               border-slate-300 hover:border-sky-400 transition-colors duration-200
                               focus:ring-2 focus:ring-sky-200 focus:ring-offset-2"
                  />
                  <div className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={item.value} className="font-bold text-sky-800 cursor-pointer block">
                      {item.label}
                    </Label>
                    {item.description && (
                      <p className="text-xs text-sky-600 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Calçamento */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl"><Square className="w-7 h-7" /></div>
            <h4 className="text-xl font-bold text-sky-800">Calçamento</h4>
            <div className="flex-1 h-px bg-sky-200"></div>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Ícones com tons de azul e checkbox de volta */}
          {/* Ícones com tons de azul e checkbox de volta */}
          {[
            { id: "sem_asfalto", label: "S/Asfalto", icon: Ban, description: "Sem asfalto" },
            { id: "asfaltada", label: "Asfaltada", icon: Car, description: "Rua asfaltada" },
            { id: "novo", label: "Novo", icon: Sparkles, description: "Asfalto novo" },
            { id: "antigo", label: "Antigo", icon: History, description: "Asfalto antigo" },
            { id: "parte", label: "Parte", icon: Divide, description: "Parcialmente asfaltada" },
            { id: "toda", label: "Toda", icon: CheckSquare, description: "Toda asfaltada" },
            { id: "paralelo", label: "Paralelo", icon: GripHorizontal, description: "Paralelepípedo" },
            { id: "bloco", label: "Bloco", icon: LayoutGrid, description: "Bloco intertravado" },
          ].map((item, idx) => {
            const checked = formData.calcamento[item.id as keyof typeof formData.calcamento];
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col items-center min-h-[140px] transition-all duration-200"
                style={{ userSelect: 'none' }}
              >
                <span className="mb-2 grow-effect text-blue-300">
                  <Icon className="w-8 h-8" />
                </span>
                <label htmlFor={item.id} className="text-base font-bold text-sky-800 text-center mb-2">
                  {item.label}
                </label>
                <input
                  type="checkbox"
                  id={item.id}
                  checked={!!checked}
                  onChange={e => handleCheckboxChange('calcamento', item.id, e.target.checked)}
                  className="w-5 h-5 accent-sky-600 border-slate-300 rounded focus:ring-2 focus:ring-sky-200"
                />
                {/* Indicador visual */}
                <div className={`mt-2 inline-block w-2 h-2 rounded-full transition-colors duration-200 ${checked ? 'bg-green-400' : 'bg-slate-300'}`} />
                {item.description && (
                  <span className="text-xs text-sky-500 mt-2 text-center block">{item.description}</span>
                )}
              </div>
            )
          })}
        </div>
        </div>
        <style>{`
          @keyframes grow-effect {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.12); }
          }
          .grow-effect {
            animation: grow-effect 2.2s infinite;
            display: inline-block;
          }
        `}</style>

        {/* Logradouro com Placa */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-6">
            <div className="text-3xl"><Signpost className="w-8 h-8 text-sky-500" /></div>
            <div className="flex-1">
              <CheckboxField
                id="logradouroComPlaca"
                label={<span className="font-bold text-sky-800 text-lg">Logradouro com Placa?</span>}
                checked={formData.logradouroComPlaca}
                onCheckedChange={(checked) => handleInputChange("logradouroComPlaca", !!checked)}
              />
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl"><Pencil className="w-7 h-7 text-sky-500" /></div>
            <h4 className="text-xl font-bold text-sky-800">Observações</h4>
            <div className="flex-1 h-px bg-sky-200"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes" className="text-sm font-medium text-sky-600">
              Observações adicionais sobre o imóvel, construção ou logradouro
            </Label>
            <Textarea
              id="observacoes"
              placeholder="Digite suas observações aqui..."
              value={formData.observacoes}
              onChange={handleObservacoesChange}
              className="rounded-xl border-slate-200 text-sky-800 bg-white 
                         focus:border-sky-300 focus:ring-2 focus:ring-sky-100 
                         hover:border-sky-200 transition-all duration-200
                         placeholder:text-slate-400 resize-none"
              rows={6}
              maxLength={400}
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-sky-600">Máximo 400 caracteres</span>
              <span
                className={`font-medium ${
                  String(formData.observacoes).length > 350 ? "text-orange-500" : "text-sky-500"
                }`}
              >
                {String(formData.observacoes).length}/400
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer informativo */}
      <div className="mt-8 pt-6 border-t border-sky-200 flex flex-col items-center gap-4">
        <p className="text-sm text-sky-600 text-center">
          Complete todos os campos para finalizar a avaliação urbanística
        </p>
      </div>
    </div>
  );
}

