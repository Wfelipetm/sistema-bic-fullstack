"use client"

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X, Eye, FileText, MapPin, Calendar, User, Phone } from "lucide-react"
import type { FiltrosRelatorio } from "@/app/types/relatorio"
import { buscarRelatorios } from "../services/relatorio-service"
import { gerarRelatorioPDF } from "../../../../hooks/use-relatorio-pdf"

interface Tecnico {
  id: number
  nome: string
}

interface Relatorio {
  id: number
  inscricao: string
  proprietario: string
  endereco: string
  lote: string
  quadra: string
  cpf: string
  contato: string
  cep?: string
  tecnico_id?: number
  created_at: string
  updated_at: string
  tipo?: string
  status?: string
}

interface FiltrosRelatorioCardProps {
  filtros: FiltrosRelatorio
  setFiltros: Dispatch<SetStateAction<FiltrosRelatorio>>
}

export function FiltrosRelatorioCard({ filtros, setFiltros }: FiltrosRelatorioCardProps) {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([])
  const [loadingTecnicos, setLoadingTecnicos] = useState(false)
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const [loading, setLoading] = useState(false)

  // Carregar técnicos da API
  useEffect(() => {
    const fetchTecnicos = async () => {
      setLoadingTecnicos(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tecnicos`)
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

  // Buscar relatórios iniciais
  useEffect(() => {
    handleBuscar()
  }, [])

  const handleBuscar = async () => {
    setLoading(true)
    try {
      const dados = await buscarRelatorios(filtros)
      setRelatorios(dados)
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error)
      alert("Erro ao buscar relatórios. Verifique o console.")
    } finally {
      setLoading(false)
    }
  }

  const handleLimparFiltros = () => {
    setFiltros({
      dataInicio: "",
      dataFim: "",
      status: "all",
      tecnico: "all",
    })
  }

  const handlePreview = async (id: string) => {
    try {
      const blob = await gerarRelatorioPDF(Number(id))
      if (!blob) {
        alert("Erro ao gerar o PDF do relatório")
        return
      }
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
    } catch (error) {
      console.error("Erro ao gerar preview:", error)
      alert("Erro ao gerar preview do relatório")
    }
  }

  // Classes padronizadas
  const inputClassName = `
    h-11 rounded-xl border-slate-200 bg-white text-slate-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 transition-all duration-200
    placeholder:text-slate-400
  `

  const selectClassName = `
    h-11 rounded-xl border-slate-200 bg-white text-slate-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 transition-all duration-200
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-6">
      <div className="w-full max-w-none space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Relatórios Técnicos</h1>
              <p className="text-sky-100">Consulta e visualização de boletins cadastrais</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sky-800 mb-2">Filtros de Busca</h2>
            <p className="text-sky-600">Filtre os relatórios por data, status ou técnico responsável</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="dataInicio" className="text-sm font-medium text-sky-700">
                Data Início
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataFim" className="text-sm font-medium text-sky-700">
                Data Fim
              </Label>
              <Input
                id="dataFim"
                type="date"
                value={filtros.dataFim}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-sky-700">
                Status
              </Label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros({ ...filtros, status: value })}>
                <SelectTrigger className={selectClassName}>
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

            <div className="space-y-2">
              <Label htmlFor="tecnico" className="text-sm font-medium text-sky-700">
                Técnico
              </Label>
              <Select
                value={filtros.tecnico}
                onValueChange={(value) => setFiltros({ ...filtros, tecnico: value })}
                disabled={loadingTecnicos}
              >
                <SelectTrigger className={selectClassName}>
                  <SelectValue placeholder={loadingTecnicos ? "Carregando..." : "Todos os técnicos"} />
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

          <div className="flex gap-4">
            <Button
              onClick={handleBuscar}
              disabled={loading}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Relatórios
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleLimparFiltros}
              className="border-sky-200 text-sky-700 hover:bg-sky-50 px-6 py-3 rounded-xl font-semibold bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sky-800 mb-2">Relatórios Encontrados</h2>
            <p className="text-sky-600">
              {loading ? "Carregando relatórios..." : `${relatorios.length} relatório(s) encontrado(s)`}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <p className="text-sky-600 text-lg">Carregando relatórios...</p>
              </div>
            </div>
          )}

          {!loading && relatorios.length > 0 && (
            <div className="space-y-4">
              {relatorios.map((relatorio) => (
                <div
                  key={relatorio.id ?? Math.random()}
                  className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl border border-sky-100 p-6 
                             hover:shadow-md hover:border-sky-200 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header do relatório */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-sky-500 rounded-xl">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-sky-800">Relatório Técnico Nº {relatorio.inscricao}</h3>
                          <div className="flex items-center gap-2 text-sky-600">
                            <MapPin className="h-4 w-4" />
                            <span>{relatorio.endereco}</span>
                            {relatorio.cep && (
                              <>
                                <span>•</span>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    relatorio.cep,
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-sky-800 transition-colors"
                                >
                                  CEP: {relatorio.cep}
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Informações do relatório */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="h-4 w-4 text-sky-500" />
                          <span className="font-medium">Data:</span>
                          <span>{new Date(relatorio.created_at).toLocaleDateString("pt-BR")}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <User className="h-4 w-4 text-sky-500" />
                          <span className="font-medium">Proprietário:</span>
                          <span>{relatorio.proprietario || "Não informado"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-sky-500" />
                          <span className="font-medium">Contato:</span>
                          <span>{relatorio.contato || "Não informado"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium">Lote/Quadra:</span>
                          <span>
                            {relatorio.lote}/{relatorio.quadra}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de ação */}
                    <div className="ml-6">
                      <Button
                        onClick={() => handlePreview(relatorio.id.toString())}
                        className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && relatorios.length === 0 && (
            <div className="text-center py-16">
              <div className="p-4 bg-sky-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-10 w-10 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-sky-800 mb-2">Nenhum relatório encontrado</h3>
              <p className="text-sky-600">Tente ajustar os filtros para encontrar os relatórios desejados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
