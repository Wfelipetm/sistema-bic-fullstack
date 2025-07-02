"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FormularioData } from "../../../types/formulario"
import { apiUrl } from "@/lib/api"

interface BasicInfoSectionProps {
  formData: FormularioData
  handleInputChange: (field: string, value: string) => void
}

export function BasicInfoSection({ formData, handleInputChange }: BasicInfoSectionProps) {
  useEffect(() => {
    console.log("formData (BasicInfoSection):", formData)
  }, [formData])

  useEffect(() => {
    if (formData.cpf && formData.cpf.length === 11) {
      fetch(apiUrl(`/proprietario?cpf=${formData.cpf}`))
        .then(res => res.json())
        .then(data => {
          if (data?.nome) {
            handleInputChange("proprietario", data.nome)
          }
        })
        .catch(() => {})
    }
  }, [formData.cpf])

  return (
    <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-8 mb-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Informações Básicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="numeroInscricao" className="text-base font-semibold text-blue-900">
            Número de inscrição *
          </Label>
          <Input
            id="numeroInscricao"
            placeholder="Ex: 12345"
            value={formData.numeroInscricao}
            onChange={(e) => handleInputChange("numeroInscricao", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="loteamento" className="text-base font-semibold text-blue-900">
            Loteamento
          </Label>
          <Input
            id="loteamento"
            placeholder="Nome do loteamento"
            value={formData.loteamento}
            onChange={(e) => handleInputChange("loteamento", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="revisao" className="text-base font-semibold text-blue-900">
            Revisão
          </Label>
          <Input
            id="revisao"
            type="date"
            value={formData.revisao}
            onChange={(e) => handleInputChange("revisao", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="numeroBote" className="text-base font-semibold text-blue-900">
            Número de lote *
          </Label>
          <Input
            id="numeroBote"
            placeholder="Ex: 001"
            value={formData.numeroBote}
            onChange={(e) => handleInputChange("numeroBote", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="numeroQuadra" className="text-base font-semibold text-blue-900">
            Número da quadra *
          </Label>
          <Input
            id="numeroQuadra"
            placeholder="Ex: A"
            value={formData.numeroQuadra}
            onChange={(e) => handleInputChange("numeroQuadra", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="distrito" className="text-base font-semibold text-blue-900">
            Distrito
          </Label>
          <Input
            id="distrito"
            placeholder="Nome do distrito"
            value={formData.distrito}
            onChange={(e) => handleInputChange("distrito", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="nomeLogradouro" className="text-base font-semibold text-blue-900">
            Nome do logradouro *
          </Label>
          <Input
            id="nomeLogradouro"
            placeholder="Ex: Rua das Flores"
            value={formData.nomeLogradouro}
            onChange={(e) => handleInputChange("nomeLogradouro", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="cep" className="text-base font-semibold text-blue-900">
            CEP
          </Label>
          <Input
            id="cep"
            placeholder="00000-000"
            value={formData.cep}
            onChange={(e) => handleInputChange("cep", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="endereco" className="text-base font-semibold text-blue-900">
            Endereço completo
          </Label>
          <Input
            id="endereco"
            placeholder="Endereço completo do imóvel"
            value={formData.endereco}
            onChange={(e) => handleInputChange("endereco", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div>
          <Label htmlFor="cpf" className="text-base font-semibold text-blue-900">
            CPF do proprietário
          </Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="proprietario" className="text-base font-semibold text-blue-900">
            Nome do proprietário *
          </Label>
          <Input
            id="proprietario"
            placeholder="Nome completo do proprietário"
            value={formData.proprietario}
            onChange={(e) => handleInputChange("proprietario", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
          />
        </div>
        <div className="md:col-span-3">
          <Label htmlFor="observacoes" className="text-base font-semibold text-blue-900">
            Observações
          </Label>
          <Textarea
            id="observacoes"
            placeholder="Observações adicionais sobre o imóvel..."
            value={formData.observacoes}
            onChange={(e) => handleInputChange("observacoes", e.target.value)}
            className="mt-2 rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-lg transition placeholder:text-blue-300"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
