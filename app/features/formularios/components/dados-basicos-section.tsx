"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
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

function getPrimeiroDiaMes() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`
}

function getHoje() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

export function DadosBasicosSection({ formData, handleInputChange }: DadosBasicosSectionProps) {
  // Validação dos campos obrigatórios
  function validateRequiredFields() {
    if (!formData.inscricaoNumero || formData.inscricaoNumero.trim() === "") {
      toast.warning("Preencha o campo Inscrição Nº.");
      return false;
    }
    if (!formData.lote || formData.lote.trim() === "") {
      toast.warning("Preencha o campo Lote.");
      return false;
    }
    if (!formData.quadra || formData.quadra.trim() === "") {
      toast.warning("Preencha o campo Quadra.");
      return false;
    }
    if (!formData.endereco || formData.endereco.trim() === "") {
      toast.warning("Preencha o campo Endereço.");
      return false;
    }
    return true;
  }
  // Removido: técnicos
  const [lancamentoNovo, setLancamentoNovo] = useState(getPrimeiroDiaMes())
  const [revisao, setRevisao] = useState(getHoje())

  // Removido: busca de técnicos

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
//tamanho dos inputs

  const inputClassName = `
    h-14 w-full text-base rounded-xl 
    border border-slate-200 bg-white text-sky-700
    placeholder:text-sky-400
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    px-6
  `

  const labelClassName = "text-sm font-medium text-sky-600 mb-1 block"

  const selectClassName = `
    h-10 w-full text-sm rounded-lg 
    border border-slate-200 bg-white text-sky-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    px-3 appearance-none cursor-pointer
    placeholder:text-sky-400
    bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")] 
    bg-[length:1.2em_1.2em] bg-[right_0.5rem_center] bg-no-repeat
  `

  return (
    <div
      className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-2xl border border-sky-100 px-3 py-8 min-h-[320px] md:min-h-[360px] xl:min-h-[400px] w-full max-w-full mx-auto select-none"
      style={{ boxShadow: '0 8px 32px 0 rgba(80, 150, 255, 0.18), 0 1.5px 8px 0 rgba(80, 150, 255, 0.10)' }}
    >
      {/*
        Para usar a validação, chame validateRequiredFields() ao tentar avançar para o próximo passo do formulário.
        Exemplo de uso:
        if (!validateRequiredFields()) return;
        // ...continua navegação
      */}
      <style>{`
        .dados-basicos-section-grid > div {
          display: flex;
          flex-direction: column;
          justify-content: stretch;
          height: 100%;
        }
      `}</style>
      {/* <div className="mb-3">
        <h2 className="text-xl font-semibold text-sky-800 mb-1">Dados Básicos</h2>
        <div className="w-12 h-1 bg-sky-300 rounded-full" />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-6 mb-8 dados-basicos-section-grid">
        <div>
          <Label htmlFor="inscricaoNumero" className={labelClassName}>Inscrição Nº *</Label>
          <Input
            id="inscricaoNumero"
            placeholder="Número da inscrição"
            value={formData.inscricaoNumero}
            onChange={(e) => handleInputChange("inscricaoNumero", e.target.value.toUpperCase())}
            className={inputClassName}
            autoFocus
          />
        </div>

        <div>
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

        <div>
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

        <div>
          <Label htmlFor="cep" className={labelClassName}>CEP</Label>
          <Input
            id="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(e) => handleInputChange("cep", e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="lote" className={labelClassName}>Lote *</Label>
          <Input
            id="lote"
            placeholder="Número do lote"
            value={formData.lote}
            onChange={(e) => handleInputChange("lote", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 mb-8 dados-basicos-section-grid">

        <div>
          <Label htmlFor="quadra" className={labelClassName}>Quadra *</Label>
          <Input
            id="quadra"
            placeholder="Quadra"
            value={formData.quadra}
            onChange={(e) => handleInputChange("quadra", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>

        <div>
          <Label htmlFor="loteamento" className={labelClassName}>Loteamento</Label>
          <Input
            id="loteamento"
            placeholder="Nome do loteamento"
            value={formData.loteamento}
            onChange={(e) => handleInputChange("loteamento", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>

        <div>
          <Label htmlFor="distrito" className={labelClassName}>Distrito</Label>
          <Input
            id="distrito"
            placeholder="Nome do distrito"
            value={formData.distrito}
            onChange={(e) => handleInputChange("distrito", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="endereco" className={labelClassName}>Endereço *</Label>
          <Input
            id="endereco"
            placeholder="Endereço completo"
            value={formData.endereco}
            onChange={(e) => handleInputChange("endereco", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 gap-6 mb-8 dados-basicos-section-grid">
        {/* Campo de técnico removido */}

        {/* Linha: proprietário | telefone | cpf */}
        <div className="md:col-span-2">
          <Label htmlFor="proprietario" className={labelClassName}>Proprietário (Compromissário)</Label>
          <Input
            id="proprietario"
            placeholder="Nome completo"
            value={formData.proprietario}
            onChange={(e) => handleInputChange("proprietario", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="telefone" className={labelClassName}>Telefone</Label>
          <Input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="cpf" className={labelClassName}>CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className={inputClassName}
          />
        </div>
        {/* Linha: responsável tributário | telefone resp. tributário | cpf resp. tributário */}
        <div className="md:col-span-2">
          <Label htmlFor="responsavel_tributario" className={labelClassName}>Responsável Tributário</Label>
          <Input
            id="responsavel_tributario"
            placeholder="Nome"
            value={formData.responsavel_tributario || ""}
            onChange={(e) => handleInputChange("responsavel_tributario", e.target.value.toUpperCase())}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="responsavel_tributario_telefone" className={labelClassName}>Telefone Resp. Tributário</Label>
          <Input
            id="responsavel_tributario_telefone"
            placeholder="(00) 00000-0000"
            value={formData.responsavel_tributario_telefone || ""}
            onChange={(e) => handleInputChange("responsavel_tributario_telefone", e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <Label htmlFor="responsavel_tributario_cpf" className={labelClassName}>CPF Resp. Tributário</Label>
          <Input
            id="responsavel_tributario_cpf"
            placeholder="000.000.000-00"
            value={formData.responsavel_tributario_cpf || ""}
            onChange={(e) => handleInputChange("responsavel_tributario_cpf", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-6 mb-8 dados-basicos-section-grid">



      </div>

      <div className="mt-2 pt-3 border-t border-sky-200">
        <p className="text-xs text-sky-600 flex items-center gap-1">
          <span className="text-red-400">*</span>
          Campos obrigatórios
        </p>
      </div>
    </div>
  )
}
