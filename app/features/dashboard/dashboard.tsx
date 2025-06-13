"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Building2,
  Users,
  Clock,
  CalendarClock,
} from "lucide-react"
import { RecentFormsList } from "./components/recent-forms-list"
import { QuickActions } from "./components/quick-actions"

// MOCK DATA - EDIFICAÇÕES
const stats = {
  edificacoes: [
    { id: "1", nome: "Edificação Central" },
    { id: "2", nome: "Edificação Norte" },
    { id: "3", nome: "Edificação Sul" },
    { id: "4", nome: "Edificação Leste" },
    { id: "5", nome: "Edificação Oeste" },
    { id: "6", nome: "Edificação Extra" },
  ],
  funcionarios: { edificacao_id: 1, total_funcionarios: "42" },
  registrosHoje: { edificacao_id: "1", total_registros_hoje: 17, nome: "Edificação Central" },
  registrosMes: { edificacao_id: "1", edificacao_nome: "Edificação Central", total_registros: 320 },
  registrosDiarios: [
    { data: "01/06/2024", registrototal: "10" },
    { data: "02/06/2024", registrototal: "12" },
    { data: "03/06/2024", registrototal: "15" },
    { data: "04/06/2024", registrototal: "8" },
    { data: "05/06/2024", registrototal: "20" },
    { data: "06/06/2024", registrototal: "17" },
    { data: "07/06/2024", registrototal: "25" },
  ],
  funcionariosRecentes: [
    { id: "1", nome: "Maria Silva", created_at: "01/06/2024" },
    { id: "2", nome: "João Souza", created_at: "02/06/2024" },
    { id: "3", nome: "Ana Lima", created_at: "03/06/2024" },
    { id: "4", nome: "Carlos Pinto", created_at: "04/06/2024" },
    { id: "5", nome: "Paula Dias", created_at: "05/06/2024" },
    { id: "6", nome: "Extra Func", created_at: "06/06/2024" },
  ],
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="shadow-lg rounded-xl bg-white/80 backdrop-blur-md p-6">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">Edificações</h1>
        <p className="text-blue-700">
          Aqui está um resumo da{" "}
          <span className="lowercase">
            <b>{stats.registrosHoje?.nome || "sua edificação"}</b>
          </span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-lg hover:border-yellow-300 hover:bg-yellow-50 ring-2 ring-yellow-100 border-yellow-200 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Edificações</CardTitle>
            <Building2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{stats.edificacoes.length}</div>
            <p className="text-xs text-yellow-700">
              Total de edificações cadastradas
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 ring-2 ring-blue-100 border-blue-200 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Funcionários</CardTitle>
            <Users className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {stats.funcionarios?.total_funcionarios ?? 0}
            </div>
            <p className="text-xs text-blue-700">
              Total de funcionários nas edificações
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg hover:border-green-300 hover:bg-green-50 ring-2 ring-green-100 border-green-200 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">Registros Hoje</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {stats.registrosHoje?.total_registros_hoje ?? 0}
            </div>
            <p className="text-xs text-green-700">
              Registros de ponto realizados hoje
            </p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-lg hover:border-red-300 hover:bg-red-50 ring-2 ring-red-100 border-red-200 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-900">Registros no Mês</CardTitle>
            <CalendarClock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {stats.registrosMes?.total_registros ?? 0}
            </div>
            <p className="text-xs text-red-700">
              Total de registros no mês atual
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 ring-2 ring-blue-100 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
         <RecentFormsList />
        </Card>

        <Card className="col-span-1 ring-2 ring-blue-100 shadow-lg rounded-xl bg-white/80 backdrop-blur-md">
         <QuickActions />
        </Card>
      </div>
    </div>
  )
}
