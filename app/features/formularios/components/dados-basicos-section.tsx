"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface Tecnico {
  id: number
  nome: string
}

interface DadosBasicosSectionProps {
  formData: FormularioData
  handleInputChange: (field: string, value: string) => void
}

// Função utilitária para datas no formato yyyy-mm-dd
function getPrimeiroDiaMes() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`
}

function getHoje() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

export function DadosBasicosSection({ formData, handleInputChange }: DadosBasicosSectionProps) {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [loadingTecnicos, setLoadingTecnicos] = useState(false)
  const [lancamentoNovo, setLancamentoNovo] = useState(getPrimeiroDiaMes())
  const [revisao, setRevisao] = useState(getHoje())

  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoadingTecnicos(true)
      try {
        const response = await fetch("http://10.200.200.187:5001/tecnicos")
        const data = await response.json()
        setTecnicos(data)
      } catch (error) {
        console.error("Erro ao buscar técnicos:", error)
      } finally {
        setLoadingTecnicos(false)
      }
    }

    fetchTecnicos()
  }, [])

  useEffect(() => {
    if (formData.cpf && formData.cpf.length === 11) {
      fetch(apiUrl(`/proprietario?cpf=${formData.cpf}`))
        .then((res) => res.json())
        .then((data) => {
          if (data?.nome) {
            handleInputChange("proprietario", data.nome)
          }
        })
        .catch(() => {})
    }
  }, [formData.cpf])

  // Classe padronizada para todos os inputs
  const inputClassName = `
    mt-2 h-12 w-full text-base rounded-xl 
    border border-slate-200 bg-white text-slate-700
    placeholder:text-slate-400
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    px-4
  `

  // Classe padronizada para todos os labels
  const labelClassName = "text-sm font-medium text-sky-600 mb-1 block"

  // Classe para o select
  const selectClassName = `
    mt-2 h-12 w-full text-base rounded-xl 
    border border-slate-200 bg-white text-slate-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    px-4 appearance-none cursor-pointer
    bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")] 
    bg-[length:1.5em_1.5em] bg-[right_0.5rem_center] bg-no-repeat
  `

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8">
      {/* Header da seção */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Dados Básicos</h2>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div>

      {/* Primeira linha - Dados principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-1">
          <Label htmlFor="inscricaoNumero" className={labelClassName}>
            Inscrição Nº *
          </Label>
          <Input
            id="inscricaoNumero"
            placeholder="Número da inscrição"
            value={formData.inscricaoNumero}
            onChange={(e) => handleInputChange("inscricaoNumero", e.target.value)}
            className={inputClassName}
            autoFocus
          />
        </div>

        <div className="space-y-1">
          <Label className={labelClassName}>Lançamento novo em:</Label>
          <Input
            type="date"
            value={lancamentoNovo}
            onChange={(e) => {
              setLancamentoNovo(e.target.value)
              handleInputChange("lancamentoNovo", e.target.value)
            }}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label className={labelClassName}>Revisão em:</Label>
          <Input
            type="date"
            value={revisao}
            onChange={(e) => {
              setRevisao(e.target.value)
              handleInputChange("revisao", e.target.value)
            }}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Segunda linha - Localização */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="space-y-1">
          <Label htmlFor="lote" className={labelClassName}>
            Lote *
          </Label>
          <Input
            id="lote"
            placeholder="Número do lote"
            value={formData.lote}
            onChange={(e) => handleInputChange("lote", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="quadra" className={labelClassName}>
            Quadra *
          </Label>
          <Input
            id="quadra"
            placeholder="Quadra"
            value={formData.quadra}
            onChange={(e) => handleInputChange("quadra", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="loteamento" className={labelClassName}>
            Loteamento
          </Label>
          <Input
            id="loteamento"
            placeholder="Nome do loteamento"
            value={formData.loteamento}
            onChange={(e) => handleInputChange("loteamento", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="distrito" className={labelClassName}>
            Distrito
          </Label>
          <Input
            id="distrito"
            placeholder="Nome do distrito"
            value={formData.distrito}
            onChange={(e) => handleInputChange("distrito", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Terceira linha - Endereço e Técnico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-1">
          <Label htmlFor="endereco" className={labelClassName}>
            Endereço *
          </Label>
          <Input
            id="endereco"
            placeholder="Endereço completo"
            value={formData.endereco}
            onChange={(e) => handleInputChange("endereco", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tecnicoId" className={labelClassName}>
            Técnico Responsável *
          </Label>
          <select
            id="tecnicoId"
            value={formData.tecnicoId || ""}
            onChange={(e) => {
              const numericValue = Number.parseInt(e.target.value, 10)
              handleInputChange("tecnicoId", isNaN(numericValue) ? "" : numericValue.toString())
            }}
            className={selectClassName}
            disabled={loadingTecnicos}
          >
            <option value="">{loadingTecnicos ? "Carregando técnicos..." : "Selecione um técnico"}</option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.id}>
                {tecnico.nome} (ID: {tecnico.id})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="cep" className={labelClassName}>
            CEP
          </Label>
          <Input
            id="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(e) => handleInputChange("cep", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Quarta linha - Proprietário */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1 md:col-span-2 lg:col-span-1">
          <Label htmlFor="proprietario" className={labelClassName}>
            Proprietário (Compromissário)
          </Label>
          <Input
            id="proprietario"
            placeholder="Nome completo do proprietário"
            value={formData.proprietario}
            onChange={(e) => handleInputChange("proprietario", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="responsavel_tributario" className={labelClassName}>
            Responsável Tributário
          </Label>
          <Input
            id="responsavel_tributario"
            placeholder="Nome do responsável tributário"
            value={formData.responsavel_tributario || ""}
            onChange={(e) => handleInputChange("responsavel_tributario", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="cpf" className={labelClassName}>
            CPF
          </Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="telefone" className={labelClassName}>
            Telefone de contato
          </Label>
          <Input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      {/* Indicador de campos obrigatórios */}
      <div className="mt-6 pt-4 border-t border-sky-200">
        <p className="text-xs text-sky-600 flex items-center gap-1">
          <span className="text-red-400">*</span>
          Campos obrigatórios
        </p>
      </div>
    </div>
  )
}
