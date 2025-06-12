"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FormularioData } from "@/types/formulario"

interface BasicInfoSectionProps {
  formData: FormularioData
  handleInputChange: (field: string, value: string) => void
}

export function BasicInfoSection({ formData, handleInputChange }: BasicInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="numeroInscricao" className="text-sm font-medium">
          Número de inscrição *
        </Label>
        <Input
          id="numeroInscricao"
          placeholder="Ex: 12345"
          value={formData.numeroInscricao}
          onChange={(e) => handleInputChange("numeroInscricao", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="loteamento" className="text-sm font-medium">
          Loteamento
        </Label>
        <Input
          id="loteamento"
          placeholder="Nome do loteamento"
          value={formData.loteamento}
          onChange={(e) => handleInputChange("loteamento", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="revisao" className="text-sm font-medium">
          Revisão
        </Label>
        <Input
          id="revisao"
          placeholder="Número da revisão"
          value={formData.revisao}
          onChange={(e) => handleInputChange("revisao", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="numeroBote" className="text-sm font-medium">
          Número de lote *
        </Label>
        <Input
          id="numeroBote"
          placeholder="Ex: 001"
          value={formData.numeroBote}
          onChange={(e) => handleInputChange("numeroBote", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="numeroQuadra" className="text-sm font-medium">
          Número da quadra *
        </Label>
        <Input
          id="numeroQuadra"
          placeholder="Ex: A"
          value={formData.numeroQuadra}
          onChange={(e) => handleInputChange("numeroQuadra", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="distrito" className="text-sm font-medium">
          Distrito
        </Label>
        <Input
          id="distrito"
          placeholder="Nome do distrito"
          value={formData.distrito}
          onChange={(e) => handleInputChange("distrito", e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="nomeLogradouro" className="text-sm font-medium">
          Nome do logradouro *
        </Label>
        <Input
          id="nomeLogradouro"
          placeholder="Ex: Rua das Flores"
          value={formData.nomeLogradouro}
          onChange={(e) => handleInputChange("nomeLogradouro", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="cep" className="text-sm font-medium">
          CEP
        </Label>
        <Input
          id="cep"
          placeholder="00000-000"
          value={formData.cep}
          onChange={(e) => handleInputChange("cep", e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="endereco" className="text-sm font-medium">
          Endereço completo
        </Label>
        <Input
          id="endereco"
          placeholder="Endereço completo do imóvel"
          value={formData.endereco}
          onChange={(e) => handleInputChange("endereco", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="cpf" className="text-sm font-medium">
          CPF do proprietário
        </Label>
        <Input
          id="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={(e) => handleInputChange("cpf", e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="proprietario" className="text-sm font-medium">
          Nome do proprietário *
        </Label>
        <Input
          id="proprietario"
          placeholder="Nome completo do proprietário"
          value={formData.proprietario}
          onChange={(e) => handleInputChange("proprietario", e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="md:col-span-3">
        <Label htmlFor="observacoes" className="text-sm font-medium">
          Observações
        </Label>
        <Textarea
          id="observacoes"
          placeholder="Observações adicionais sobre o imóvel..."
          value={formData.observacoes}
          onChange={(e) => handleInputChange("observacoes", e.target.value)}
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  )
}
