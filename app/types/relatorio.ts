import { ReactNode } from "react"

export interface FiltrosRelatorio {
  dataInicio: string
  dataFim: string
  status: string
  inscricao: string
}

export interface Relatorio {
  [x: string]: ReactNode
  id: number
  inscricao: string
  proprietario: string
  endereco: string
  tecnico_id?: number
  created_at: string
  updated_at: string
  foto?: string // Caminho para a foto do boletim
  // Adicione outros campos conforme necessário
}
