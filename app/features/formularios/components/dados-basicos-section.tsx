"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import type { FormularioData } from "@/app/types/formulario"
import { apiUrl } from "@/lib/api"

interface Tecnico {
  id: number
  nome: string
}

interface DadosBasicosSectionProps {
  formData: FormularioData
  handleInputChange: (field: string, value: string) => void
  handleFileChange?: (field: string, file: File | null) => void
  handleNestedInputChange?: (section: string, field: string, value: string) => void
}

function getPrimeiroDiaMes() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`
}

function getHoje() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
}

export function DadosBasicosSection({ formData, handleInputChange, handleFileChange, handleNestedInputChange }: DadosBasicosSectionProps) {
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

  // Função para lidar com upload de foto
  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Apenas arquivos JPEG, JPG e PNG são permitidos.");
        return;
      }
      
      // Validar tamanho (5MB máximo)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("O arquivo deve ter no máximo 5MB.");
        return;
      }

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        handleInputChange("fotoPreview", preview);
      };
      reader.readAsDataURL(file);

      // Salvar o arquivo
      if (handleFileChange) {
        handleFileChange("foto", file);
      }
    }
  };

  // Função para remover foto
  const removeFoto = () => {
    if (handleFileChange) {
      handleFileChange("foto", null);
    }
    handleInputChange("fotoPreview", "");
  };

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
    h-12 sm:h-14 w-full text-sm sm:text-base rounded-xl 
    border border-slate-200 bg-white text-sky-700
    placeholder:text-sky-400
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 hover:shadow-sm
    transition-all duration-200 ease-in-out
    px-4 sm:px-6
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
      className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-2xl border border-sky-100 
                 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 
                 min-h-[320px] md:min-h-[360px] xl:min-h-[400px] 
                 w-full max-w-full mx-auto select-none"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8 dados-basicos-section-grid">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 dados-basicos-section-grid">

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8 dados-basicos-section-grid">
        {/* Campo de técnico removido */}

        {/* Linha: proprietário | telefone | cpf */}
        <div className="sm:col-span-2 lg:col-span-2">
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
        
        {/* Campo de Upload de Foto - Responsivo e Contido */}
        <div className="order-last sm:order-none sm:col-span-2 md:col-span-1 lg:row-span-2">
          <Label className={labelClassName}>Foto do Boletim</Label>
          <div className="space-y-2 w-full max-w-full">
            {/* Área de upload */}
            {!formData.fotoPreview && (
              <div className="relative border-2 border-dashed border-sky-300 rounded-xl p-3 text-center hover:border-sky-400 transition-colors cursor-pointer 
                            h-32 w-full max-w-[200px] sm:h-36 sm:max-w-[180px] md:h-40 md:max-w-full lg:max-w-[200px] mx-auto sm:mx-0">
                <Camera className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-sky-400 mb-2" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-sky-700">
                    Clique para adicionar foto
                  </p>
                  <p className="text-xs text-sky-500">
                    PNG, JPG até 5MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}

            {/* Preview da foto */}
            {formData.fotoPreview && (
              <div className="relative w-full max-w-[200px] sm:max-w-[180px] md:max-w-full lg:max-w-[200px] mx-auto sm:mx-0">
                <div className="border border-sky-200 rounded-xl overflow-hidden cursor-pointer hover:border-sky-400 transition-colors
                              h-32 w-full sm:h-36 md:h-40 aspect-[4/3]"
                     onClick={() => document.getElementById('foto-input')?.click()}>
                  <img
                    src={formData.fotoPreview}
                    alt="Preview do boletim"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white opacity-0 hover:opacity-80 transition-opacity" />
                  </div>
                </div>
                
                {/* Botão para remover foto */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFoto();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors z-10"
                  title="Remover foto"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <input
                  id="foto-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFotoChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* Linha: responsável tributário | telefone resp. tributário | cpf resp. tributário */}
        <div className="sm:col-span-2 lg:col-span-2">
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
