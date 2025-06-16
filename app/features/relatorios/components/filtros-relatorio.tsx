"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, Search } from "lucide-react"
import type { FiltrosRelatorio } from "../../../types/relatorio"

interface FiltrosRelatorioProps {
  filtros: FiltrosRelatorio
  setFiltros: (filtros: FiltrosRelatorio) => void
}

export function FiltrosRelatorioCard({ filtros, setFiltros }: FiltrosRelatorioProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Filtros de Busca</CardTitle>
        </div>
        <CardDescription>Filtre os relatórios por data, status ou técnico responsável</CardDescription>
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
              onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
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
              onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={filtros.status} onValueChange={(value) => setFiltros({ ...filtros, status: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="revisao">Em Revisão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tecnico" className="text-sm font-medium">
              Técnico
            </Label>
            <Select value={filtros.tecnico} onValueChange={(value) => setFiltros({ ...filtros, tecnico: value })}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Todos os técnicos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os técnicos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Costa</SelectItem>
                <SelectItem value="ana">Ana Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Buscar Relatórios
          </Button>
          <Button variant="outline">Limpar Filtros</Button>
        </div>
      </CardContent>
    </Card>
  )
}
