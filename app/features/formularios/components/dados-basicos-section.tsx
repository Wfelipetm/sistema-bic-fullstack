"use client";

import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormularioData } from "@/app/types/formulario";
import { apiUrl } from "@/lib/api";

interface DadosBasicosSectionProps {
  formData: FormularioData;
  handleInputChange: (field: string, value: string) => void;
}

export function DadosBasicosSection({
  formData,
  handleInputChange,
}: DadosBasicosSectionProps) {
  // Exemplo: buscar dados do proprietário ao digitar o CPF
  useEffect(() => {
    if (formData.cpf && formData.cpf.length === 11) {
      fetch(apiUrl(`/proprietario?cpf=${formData.cpf}`))
        .then((res) => res.json())
        .then((data) => {
          if (data?.nome) {
            handleInputChange("proprietario", data.nome);
          }
        })
        .catch(() => {});
    }
  }, [formData.cpf]);

  return (
    <div className="space-y-6">
      {/* Primeira linha - Dados principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="inscricaoNumero" className="text-sm font-medium">
            Inscrição Nº *
          </Label>
          <Input
            id="inscricaoNumero"
            placeholder="Número da inscrição"
            value={formData.inscricaoNumero}
            onChange={(e) =>
              handleInputChange("inscricaoNumero", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Lançamento novo em:</Label>
          <Input
            type="date"
            value={formData.lancamentoNovo}
            onChange={(e) =>
              handleInputChange("lancamentoNovo", e.target.value)
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Revisão em:</Label>
          <Input
            type="date"
            value={formData.revisao}
            onChange={(e) => handleInputChange("revisao", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Segunda linha - Localização */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="lote" className="text-sm font-medium">
            Lote *
          </Label>
          <Input
            id="lote"
            placeholder="Número do lote"
            value={formData.lote}
            onChange={(e) => handleInputChange("lote", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="quadra" className="text-sm font-medium">
            Quadra *
          </Label>
          <Input
            id="quadra"
            placeholder="Quadra"
            value={formData.quadra}
            onChange={(e) => handleInputChange("quadra", e.target.value)}
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
      </div>

      {/* Terceira linha - Endereço */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="endereco" className="text-sm font-medium">
            Endereço *
          </Label>
          <Input
            id="endereco"
            placeholder="Endereço completo"
            value={formData.endereco}
            onChange={(e) => handleInputChange("endereco", e.target.value)}
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
      </div>

      {/* Quarta linha - Proprietário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="proprietario" className="text-sm font-medium">
            Proprietário (Compromissário)
          </Label>
          <Input
            id="proprietario"
            placeholder="Nome completo do proprietário"
            value={formData.proprietario}
            onChange={(e) => handleInputChange("proprietario", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="cpf" className="text-sm font-medium">
            CPF
          </Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="telefone" className="text-sm font-medium">
            Tel.: p/Contato
          </Label>
          <Input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
}
