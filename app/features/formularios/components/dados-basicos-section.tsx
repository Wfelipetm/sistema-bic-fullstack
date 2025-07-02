"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormularioData } from "@/app/types/formulario";
import { apiUrl } from "@/lib/api";

interface Tecnico {
  id: number;
  nome: string;
}

interface DadosBasicosSectionProps {
  formData: FormularioData;
  handleInputChange: (field: string, value: string) => void;
}

// Função utilitária para datas no formato yyyy-mm-dd
function getPrimeiroDiaMes() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
}
function getHoje() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function DadosBasicosSection({
  formData,
  handleInputChange,
}: DadosBasicosSectionProps) {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loadingTecnicos, setLoadingTecnicos] = useState(false);
  const [lancamentoNovo, setLancamentoNovo] = useState(getPrimeiroDiaMes());
  const [revisao, setRevisao] = useState(getHoje());

  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoadingTecnicos(true);
      try {
        const response = await fetch("http://10.200.200.187:5001/tecnicos");
        const data = await response.json();
        setTecnicos(data);
      } catch (error) {
        console.error("Erro ao buscar técnicos:", error);
      } finally {
        setLoadingTecnicos(false);
      }
    };
    fetchTecnicos();
  }, []);

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
    <div className="bg-blue-50 rounded-2xl shadow border border-blue-100 p-8 mb-8">
     
      {/* Primeira linha - Dados principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="inscricaoNumero" className="text-base font-semibold text-blue-900">
            Inscrição Nº *
          </Label>
          <Input
            id="inscricaoNumero"
            placeholder="Número da inscrição"
            value={formData.inscricaoNumero}
            onChange={(e) => handleInputChange("inscricaoNumero", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition placeholder:text-blue-300"
            autoFocus
          />
        </div>
        <div>
          <Label className="text-base font-semibold text-blue-900">Lançamento novo em:</Label>
          <Input
            type="date"
            value={lancamentoNovo}
            onChange={e => {
              setLancamentoNovo(e.target.value);
              handleInputChange("lancamentoNovo", e.target.value);
            }}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label className="text-base font-semibold text-blue-900">Revisão em:</Label>
          <Input
            type="date"
            value={revisao}
            onChange={e => {
              setRevisao(e.target.value);
              handleInputChange("revisao", e.target.value);
            }}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      </div>

      {/* Segunda linha - Localização */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div>
          <Label htmlFor="lote" className="text-base font-semibold text-blue-900">
            Lote *
          </Label>
          <Input
            id="lote"
            placeholder="Número do lote"
            value={formData.lote}
            onChange={(e) => handleInputChange("lote", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="quadra" className="text-base font-semibold text-blue-900">
            Quadra *
          </Label>
          <Input
            id="quadra"
            placeholder="Quadra"
            value={formData.quadra}
            onChange={(e) => handleInputChange("quadra", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
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
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
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
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      </div>

      {/* Terceira linha - Endereço e Técnico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div>
          <Label htmlFor="endereco" className="text-base font-semibold text-blue-900">
            Endereço *
          </Label>
          <Input
            id="endereco"
            placeholder="Endereço completo"
            value={formData.endereco}
            onChange={(e) => handleInputChange("endereco", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="tecnicoId" className="text-base font-semibold text-blue-900">
            Técnico Responsável *
          </Label>
          <select
            id="tecnicoId"
            value={formData.tecnicoId || ""}
            onChange={(e) => {
              const numericValue = parseInt(e.target.value, 10);
              handleInputChange("tecnicoId", isNaN(numericValue) ? "" : numericValue.toString());
            }}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition appearance-none px-4"
            disabled={loadingTecnicos}
          >
            <option value="">
              {loadingTecnicos ? "Carregando técnicos..." : "Selecione um técnico"}
            </option>
            {tecnicos.map((tecnico) => (
              <option key={tecnico.id} value={tecnico.id}>
                {tecnico.nome} (ID: {tecnico.id})
              </option>
            ))}
          </select>
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
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      </div>

      {/* Quarta linha - Proprietário */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-2">
          <Label htmlFor="proprietario" className="text-base font-semibold text-blue-900">
            Proprietário (Compromissário)
          </Label>
          <Input
            id="proprietario"
            placeholder="Nome completo do proprietário"
            value={formData.proprietario}
            onChange={(e) => handleInputChange("proprietario", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="responsavel_tributario" className="text-base font-semibold text-blue-900">
            Responsável Tributário
          </Label>
          <Input
            id="responsavel_tributario"
            placeholder="Nome do responsável tributário"
            value={formData.responsavel_tributario || ""}
            onChange={(e) => handleInputChange("responsavel_tributario", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="cpf" className="text-base font-semibold text-blue-900">
            CPF
          </Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
        <div>
          <Label htmlFor="telefone" className="text-base font-semibold text-blue-900">
            Tel.: p/Contato
          </Label>
          <Input
            id="telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => handleInputChange("telefone", e.target.value)}
            className="mt-2 h-12 text-lg rounded-xl border-blue-200 text-blue-800 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      </div>
    </div>
  );
}
