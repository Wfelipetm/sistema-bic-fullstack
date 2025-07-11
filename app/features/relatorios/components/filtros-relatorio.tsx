"use client"

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X, Eye, FileText, MapPin, Calendar, User, Phone, ExternalLink, Download, Image } from "lucide-react"
import { toast } from "sonner"
import { authService } from "@/lib/auth-service"

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" height="1em" width="1em" {...props}>
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.205A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.77 0-3.484-.463-4.98-1.34l-.355-.21-4.65 1.31 1.24-4.53-.23-.36C6.36 18.01 5.5 16.55 5.5 15c0-5.799 4.701-10.5 10.5-10.5S26.5 9.201 26.5 15 21.799 25 16 25zm5.07-7.75c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.14-.184.278-.71.899-.87 1.085-.16.185-.32.208-.597.07-.277-.139-1.17-.431-2.23-1.375-.823-.734-1.379-1.64-1.541-1.917-.161-.278-.017-.428.122-.566.125-.124.278-.323.417-.485.139-.162.185-.278.278-.463.093-.185.046-.347-.023-.485-.07-.139-.62-1.497-.85-2.05-.224-.539-.453-.466-.62-.475l-.528-.009c-.17 0-.446.064-.68.3-.232.236-.88.861-.88 2.099 0 1.238.902 2.434 1.028 2.603.125.17 1.775 2.71 4.3 3.692.602.207 1.07.33 1.436.422.603.153 1.153.132 1.588.08.484-.058 1.637-.668 1.87-1.312.232-.644.232-1.196.162-1.312-.07-.116-.253-.185-.53-.324z" />
  </svg>
);
import { buscarRelatorios } from "../services/relatorio-service"
import { gerarRelatorioPDF } from "../../../../hooks/use-relatorio-pdf"

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
  created_at: string
  updated_at: string
  tipo?: string
  status?: string
  foto?: string // Caminho para a foto do boletim
}

interface FiltrosRelatorio {
  dataInicio: string
  dataFim: string
  status: string
  inscricao: string
}

interface FiltrosRelatorioCardProps {
  filtros: FiltrosRelatorio
  setFiltros: Dispatch<SetStateAction<FiltrosRelatorio>>
}

export function FiltrosRelatorioCard({ filtros, setFiltros }: FiltrosRelatorioCardProps) {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const relatoriosPorPagina = 1
  const totalPaginas = Math.ceil(relatorios.length / relatoriosPorPagina)

  // Verificar autenticação ao carregar o componente
  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.checkAuthAndRedirect();
      if (!isAuthenticated) {
        toast.error("Sessão expirada. Redirecionando para login...");
      }
    };
    checkAuth();
  }, []);

  // Novo: salvar último relatório em cache localStorage
  useEffect(() => {
    if (relatorios.length > 0) {
      localStorage.setItem("ultimoRelatorioExemplo", JSON.stringify(relatorios[0]))
    }
  }, [relatorios])

  // Não buscar relatórios iniciais automaticamente

  // Permitir buscar pelo Enter no campo de inscrição
  const handleInscricaoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  }

  const handleBuscar = async () => {
    if (!filtros.inscricao || filtros.inscricao.trim() === "") {
      setRelatorios([])
      setTimeout(() => {
        toast.error("Nenhum relatório foi encontrado para o número de inscrição informado.");
      }, 0)
      return;
    }
    setLoading(true)
    try {
      const dados = await buscarRelatorios(filtros)
      const existe = dados.some((r: Relatorio) => String(r.inscricao).trim() === String(filtros.inscricao).trim())
      if (!existe) {
        setRelatorios([])
        setTimeout(() => {
          toast.error("Nenhum relatório foi encontrado para o número de inscrição informado.");
        }, 0)
      } else {
        const exatos = dados.filter((r: Relatorio) => String(r.inscricao).trim() === String(filtros.inscricao).trim())
        setRelatorios(exatos)
      }
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error)
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar relatórios"
      
      // Se for erro de autenticação, redirecionar para login
      if (errorMessage.includes('Token não encontrado') || 
          errorMessage.includes('Sessão expirada') ||
          errorMessage.includes('401')) {
        toast.error("Sessão expirada. Redirecionando para login...")
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else {
        toast.error(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLimparFiltros = () => {
    setFiltros({
      dataInicio: "",
      dataFim: "",
      status: "all",
      inscricao: "",
    })
    setRelatorios([])
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

  const handleDownloadFoto = async (foto: string, inscricao: string) => {
    try {
      toast.info("Iniciando download da foto...");
      
      // Montar a URL da foto baseada no backend
      // Se já for uma URL completa, usar como está; senão, construir a URL
      const fotoUrl = foto.startsWith('http') 
        ? foto 
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/uploads/${foto}`;
      
      const response = await fetch(fotoUrl)
      
      if (!response.ok) {
        throw new Error(`Erro ao baixar foto: ${response.status} ${response.statusText}`)
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // Obter a extensão do arquivo da URL ou usar jpg como padrão
      const extension = foto.split('.').pop()?.toLowerCase() || 'jpg'
      
      // Criar link para download
      const link = document.createElement('a')
      link.href = url
      link.download = `foto-boletim-${inscricao}.${extension}`
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      
      // Aguardar um pouco antes de remover o link
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100);
      
      toast.success("Foto baixada com sucesso!")
    } catch (error) {
      console.error("Erro ao baixar foto:", error)
      toast.error(`Erro ao baixar a foto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  // Classes padronizadas
  const inputClassName = `
    h-11 rounded-xl border-sky-300 bg-white text-sky-700
    focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none
    hover:border-sky-400 transition-all duration-200
    placeholder:text-sky-400
    ring-1 ring-inset ring-sky-200
  `

  const selectClassName = `
    h-11 rounded-xl border-slate-200 bg-white text-sky-700
    focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:outline-none
    hover:border-sky-200 transition-all duration-200
    placeholder:text-sky-400
  `

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-none space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Relatórios Técnicos</h1>
              <p className="text-sky-100 text-sm sm:text-base">Consulta e visualização de boletins cadastrais</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-sky-800 mb-2">Filtros de Busca</h2>
            <p className="text-sky-600">Filtre os relatórios por data, status ou número de inscrição</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="dataInicio" className="text-sm font-medium text-sky-700">
                Data Início
              </Label>
              <Input
                id="dataInicio"
                type="date"
                value={filtros.dataInicio || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10)}
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
                value={filtros.dataFim || new Date().toISOString().slice(0, 10)}
                onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inscricao" className="text-sm font-medium text-sky-700">
                Nº Inscrição
              </Label>
              <Input
                id="inscricao"
                type="text"
                placeholder="Digite o número da inscrição"
                value={filtros.inscricao || ""}
                onChange={(e) => setFiltros({ ...filtros, inscricao: e.target.value })}
                onKeyDown={handleInscricaoKeyDown}
                className={inputClassName}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-4 sm:p-6 md:p-8">
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

          {/* Mostra relatório(s) ou exemplo em cache */}
          {!loading && (relatorios.length > 0 || localStorage.getItem("ultimoRelatorioExemplo")) && (
            <div className="space-y-4">
              {(relatorios.length > 0
                ? relatorios.slice((currentPage - 1) * relatoriosPorPagina, currentPage * relatoriosPorPagina)
                : [JSON.parse(localStorage.getItem("ultimoRelatorioExemplo") || "{}")]
              ).map((relatorio, idx) =>
                relatorio && relatorio.id ? (
                  <div
                    key={relatorio.id ?? idx}
                    className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl border border-sky-100 p-6 
                               hover:shadow-md hover:border-sky-200 transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Área da foto (se existir) */}
                      {relatorio.foto && (
                        <div className="w-full md:w-32 lg:w-40 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                          <div className="relative group">
                            <img
                              src={relatorio.foto.startsWith('http') 
                                ? relatorio.foto 
                                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/uploads/${relatorio.foto}`}
                              alt={`Foto do boletim ${relatorio.inscricao}`}
                              className="w-full h-24 md:h-32 lg:h-40 object-cover rounded-xl border-2 border-sky-200 
                                       hover:border-sky-400 transition-all duration-200 hover:shadow-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = 'none'
                                target.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                            {/* Botão transparente para download */}
                            <button
                              onClick={() => handleDownloadFoto(relatorio.foto!, relatorio.inscricao)}
                              className="absolute inset-0 bg-transparent hover:bg-black/20 rounded-xl transition-all duration-200
                                       flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer group"
                              title="Clique para baixar a foto"
                            >
                              <div className="bg-white/90 rounded-full p-3 transform group-hover:scale-110 transition-transform duration-200">
                                <Download className="h-6 w-6 text-sky-700" />
                              </div>
                            </button>
                            {/* Indicador de foto no canto */}
                            <div className="absolute top-2 right-2 bg-sky-600 text-white rounded-full p-1">
                              <Image className="h-3 w-3" />
                            </div>
                          </div>
                          {/* Fallback se a imagem não carregar */}
                          <div className="hidden w-full h-24 md:h-32 lg:h-40 bg-sky-100 rounded-xl border-2 border-sky-200 
                                        items-center justify-center text-sky-600">
                            <div className="text-center">
                              <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <span className="text-xs">Foto não disponível</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex-1">
                        {/* Header do relatório */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-4">
                          <div className="p-3 bg-sky-500 rounded-xl">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-sky-800">Relatório Nº {relatorio.inscricao}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-sky-600 text-xs sm:text-sm">
                              <span>{relatorio.endereco}</span>
                              {relatorio.cep && (
                                <>
                                  <span>•</span>
                                  <span
                                    className="inline-flex items-center gap-1 cursor-pointer group hover:text-sky-800 transition-colors font-semibold"
                                    tabIndex={0}
                                    onClick={() => {
                                      if (relatorio.cep) {
                                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(relatorio.cep)}`, '_blank');
                                      }
                                    }}
                                    onKeyDown={e => {
                                      if ((e.key === 'Enter' || e.key === ' ') && relatorio.cep) {
                                        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(relatorio.cep)}`, '_blank');
                                      }
                                    }}
                                    onMouseEnter={() => {
                                      // Mostra o toast correto para cada caso
                                      if (relatorio && relatorio.contato && relatorio.contato.trim().length > 0) {
                                        toast.info("Clique para ver o endereço no mapa.", {
                                          duration: 2000,
                                        });
                                      } else {
                                        toast.info("Clique para ver o endereço no mapa.", {
                                          duration: 2000,
                                        });
                                      }
                                    }}
                                  >
                                    Ver no Maps
                                    <MapPin className="h-4 w-4 text-red-500 group-hover:text-red-700 transition-colors" />
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Informações do relatório */}
                        <div className="flex flex-col gap-1 text-slate-600 text-xs sm:text-sm mt-4 md:mt-0 md:ml-12 xl:ml-16">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">Data:</span>
                            <span>{relatorio.created_at ? new Date(relatorio.created_at).toLocaleDateString("pt-BR") : "-"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">Proprietário:</span>
                            <span>{relatorio.proprietario || "Não informado"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">Contato:</span>
                            {relatorio.contato ? (
                              <a
                                href={`https://wa.me/55${relatorio.contato.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-700 hover:text-green-600 font-semibold transition-colors flex items-center gap-1 group"
                                title="Conversar no WhatsApp"
                                tabIndex={0}
                                onClick={() => {
                                  window.open(`https://wa.me/55${relatorio.contato.replace(/\D/g, "")}`, "_blank");
                                }}
                                onKeyDown={e => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    window.open(`https://wa.me/55${relatorio.contato.replace(/\D/g, "")}`, "_blank");
                                  }
                                }}
                                onMouseEnter={() => {
                                  toast.info("Clique para conversar no WhatsApp.", {
                                    duration: 2000,
                                  });
                                }}
                              >
                                {relatorio.contato}
                                <WhatsappIcon className="h-4 w-4 text-green-500 group-hover:text-green-700 transition-colors" />
                              </a>
                            ) : (
                              <span>Não informado</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-sky-500" />
                            <span className="font-medium">Lote/Quadra:</span>
                            <span>{relatorio.lote}/{relatorio.quadra}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botão de ação */}
                      <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-auto">
                        <Button
                          onClick={() => handlePreview(relatorio.id.toString())}
                          className="bg-sky-600 hover:bg-sky-700 text-white w-full md:w-auto px-6 py-3 rounded-xl font-semibold"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
              {/* Paginação só se houver mais de 1 resultado */}
              {relatorios.length > 1 && totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    className="p-2 rounded-full hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-lg font-semibold text-sm ${currentPage === i + 1 ? "bg-sky-600 text-white" : "bg-sky-100 text-sky-700 hover:bg-sky-200"}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="p-2 rounded-full hover:bg-sky-100 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(totalPaginas, p + 1))}
                    disabled={currentPage === totalPaginas}
                    aria-label="Próxima página"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mensagem padrão só se não houver nada nem em cache */}
          {!loading && relatorios.length === 0 && !localStorage.getItem("ultimoRelatorioExemplo") && (
            <div className="text-center py-10 sm:py-16">
              <div className="p-4 bg-sky-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-sky-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-sky-800 mb-2">Nenhum relatório encontrado</h3>
              <p className="text-sky-600 text-xs sm:text-base">Tente ajustar os filtros para encontrar os relatórios desejados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
