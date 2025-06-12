export interface Relatorio {
  id: string
  titulo: string
  data: string
  status: "Concluído" | "Pendente" | "Em Revisão"
  tecnico: string
  tipo: "Residencial" | "Comercial" | "Industrial" | "Público"
  tamanho: string
}

export interface FiltrosRelatorio {
  dataInicio: string
  dataFim: string
  status: string
  tecnico: string
}
