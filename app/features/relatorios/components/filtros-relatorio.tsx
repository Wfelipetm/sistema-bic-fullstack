"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  X,
  Eye,
  Download,
  Printer,
  FileText,
} from "lucide-react";
import type { FiltrosRelatorio } from "@/app/types/relatorio";
import { buscarRelatorios } from "../services/relatorio-service";
import { gerarRelatorioPDF } from "../../../../hooks/use-relatorio-pdf";

interface Tecnico {
  id: number;
  nome: string;
}

interface Relatorio {
  id: number;
  inscricao: string;
  proprietario: string;
  endereco: string;
  lote: string;
  quadra: string;
  cpf: string;
  contato: string;
  cep?: string; // Adicionado para evitar erro de propriedade inexistente
  tecnico_id?: number;
  created_at: string;
  updated_at: string;
  tipo?: string; // Adicionado para evitar erro de propriedade inexistente
  status?: string; // Adicionado para evitar erro de propriedade inexistente
}

interface FiltrosRelatorioCardProps {
  filtros: FiltrosRelatorio;
  setFiltros: Dispatch<SetStateAction<FiltrosRelatorio>>;
}

// Componente independente (não recebe props)
export function FiltrosRelatorioCard({ filtros, setFiltros }: FiltrosRelatorioCardProps) {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loadingTecnicos, setLoadingTecnicos] = useState(false);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar técnicos da API
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

  // Buscar relatórios iniciais
  useEffect(() => {
    handleBuscar();
  }, []);

  const handleBuscar = async () => {
    setLoading(true);
    try {
      console.log("🔍 Buscando com filtros:", filtros);
      const dados = await buscarRelatorios(filtros);
      setRelatorios(dados);
      console.log("Relatórios encontrados:", dados.length);
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
      alert("Erro ao buscar relatórios. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  const handleLimparFiltros = () => {
    setFiltros({
      dataInicio: "",
      dataFim: "",
      status: "all",
      tecnico: "all",
    });
  };

  // Preview igual ao RelatorioItem
  const handlePreview = async (id: string) => {
    try {
      console.log("🔍 Gerando preview para relatório:", id);
      const blob = await gerarRelatorioPDF(Number(id));
      if (!blob) {
        alert("Erro ao gerar o PDF do relatório");
        return;
      }
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Erro ao gerar preview:", error);
      alert("Erro ao gerar preview do relatório");
    }
  };

  const handleDownload = async (id: string) => {
    try {
      console.log("Baixando relatório:", id);
      const blob = await gerarRelatorioPDF(Number(id));
      if (!blob) {
        alert("Erro ao gerar o PDF do relatório");
        return;
      }

      // Criar link para download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("Download concluído");
    } catch (error) {
      console.error("Erro ao baixar relatório:", error);
      alert("Erro ao baixar relatório");
    }
  };

  const handlePrint = (id: string) => {
    console.log("Imprimindo relatório:", id);
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Card de Filtros */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-lg">Filtros de Busca</CardTitle>
          </div>
          <CardDescription>
            Filtre os relatórios por data, status ou técnico responsável
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dataInicio" className="text-sm font-medium">
                Data Início
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataInicio: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dataFim" className="text-sm font-medium">
                Data Fim
              </Label>
              <Input
                id="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) =>
                  setFiltros({ ...filtros, dataFim: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={filtros.status}
                onValueChange={(value) =>
                  setFiltros({ ...filtros, status: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="revisao">Em Revisão</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tecnico" className="text-sm font-medium">
                Técnico
              </Label>
              <Select
                value={filtros.tecnico}
                onValueChange={(value) =>
                  setFiltros({ ...filtros, tecnico: value })
                }
                disabled={loadingTecnicos}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue
                    placeholder={
                      loadingTecnicos ? "Carregando..." : "Todos os técnicos"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os técnicos</SelectItem>
                  {tecnicos.map((tecnico) => (
                    <SelectItem key={tecnico.id} value={tecnico.id.toString()}>
                      {tecnico.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={handleBuscar}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar Relatórios
            </Button>
            <Button variant="outline" onClick={handleLimparFiltros}>
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card de Resultados */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Relatórios Encontrados</CardTitle>
          <CardDescription>
            {loading
              ? "Carregando relatórios..."
              : `${relatorios.length} relatório(s) encontrado(s)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-lg">🔄 Carregando relatórios...</div>
            </div>
          )}

          {!loading && relatorios.length > 0 && (
            <div className="space-y-2">
              {relatorios.map((relatorio) => (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Relatório técnico Nº.: {relatorio.inscricao}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">
                            Endereço: {relatorio.endereco}
                          </p>
                          <a
                            className="text-sm text-gray-500 cursor-pointer"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              relatorio.cep ?? ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            CEP: {relatorio.cep}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex mx-1.5 items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-x-5">
                        <span>📅</span>
                        <span>
                          {new Date(relatorio.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </span>
                      <span>
                        Proprietário: {relatorio.proprietario || "Proprietário não informado"}
                        <span className="mx-2"></span>
                        Contato: {relatorio.contato || "Contato não informado"}
                      </span>

                      {/* <Badge variant="outline" >
            {relatorio.tipo}
          </Badge>
          <Badge >
            {relatorio.status}
          </Badge> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(relatorio.id.toString())}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Button>
                  </div>
                </div>
                // <div
                //   key={relatorio.id}
                //   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                // >
                //   <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                //     <div className="flex flex-col items-center justify-between gap-2">
                //       <div>
                //         <div className="flex items-center gap-2 mb-1">
                //           <div className="p-2 bg-blue-50 rounded-lg">
                //             <FileText className="h-4 w-4 text-blue-600" />
                //           </div>
                //           <p className="font-medium text-lg text-black">
                //             Relatório Técnico -
                //           </p>
                //           <p>{relatorio.endereco}</p>
                //         </div>
                //         <div className="flex items-center gap-2 mt-1 px-10">
                //           <h3 className="text-sm text-gray-600">Inscrição:</h3>
                //           <div>{relatorio.inscricao}</div>
                //         </div>
                //       </div>
                //       <div className="flex items-center text-sm text-gray-600">
                //         <p className="text-sm text-gray-500">
                //           {new Date(relatorio.created_at).toLocaleDateString(
                //             "pt-BR"
                //           )}
                //         </p>
                //         <p>👤 {relatorio.proprietario}</p>
                //       </div>
                //     </div>

                //     <p>
                //       <strong>📞 Contato:</strong> {relatorio.contato}
                //     </p>

                //     <div>
                //       <p>
                //         <strong>🏠 Lote:</strong> {relatorio.lote}
                //       </p>
                //       <p>
                //         <strong>🏘️ Quadra:</strong> {relatorio.quadra}
                //       </p>
                //     </div>
                //     <div className="flex flex-col gap-2">
                //       {relatorio.tecnico_id && (
                //         <p className="text-sm">
                //           <strong>👨‍💼 Técnico:</strong> {relatorio.tecnico_id}
                //         </p>
                //       )}
                //       <div className="flex justify-end gap-2 mt-2"></div>
                //     </div>
                //     <div className="flex justify-end gap-2 mt-2">
                //       <Button
                //         onClick={() => handlePreview(relatorio.id.toString())}
                //         size="sm"
                //         variant="outline"
                //         className="text-black hover:text-blue-700 hover:bg-blue-50"
                //       >
                //         <Eye className="h-4 w-4 mr-1" />
                //         Visualizar
                //       </Button>
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          )}

          {!loading && relatorios.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">
                Nenhum relatório encontrado
              </h3>
              <p>
                Tente ajustar os filtros para encontrar os relatórios desejados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
