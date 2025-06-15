"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge" // Removido pois não será mais usado aqui
import { Building2, User, LogOut, Settings, Bell } from "lucide-react" // Search removido
// import { Input } from "@/components/ui/input" // Removido pois não será mais usado aqui
import type { ViewType } from "@/app/types/navigation"
import { currentUser } from "@/app/constants/mock-data"

interface AppHeaderProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  // A função getPageTitle não é mais necessária aqui se o título da página não for exibido no header
  // const getPageTitle = () => {
  //   switch (activeView) {
  //     case "dashboard":
  //       return "Dashboard"
  //     case "formulario":
  //       return "Formulário Técnico"
  //     case "relatorios":
  //       return "Relatórios"
  //     case "configuracoes":
  //       return "Configurações"
  //     default:
  //       return "Dashboard"
  //   }
  // }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        {/* Logo e Título */}
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Building2 className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BIC Sistema</h1>
            <p className="text-xs text-gray-500">Boletim de Informações Cadastrais</p>
          </div>
        </div>

        {/* Página Atual - REMOVIDO */}
        {/*
        <div className="hidden md:flex items-center gap-2 ml-8">
          <span className="text-gray-400">/</span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {getPageTitle()}
          </Badge>
        </div>
        */}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Busca - REMOVIDO */}
        {/*
        <div className="hidden lg:flex items-center gap-4 mr-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar formulários, relatórios..."
              className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
        */}

        {/* Notificações - REMOVIDO */}
        {/*
        <div className="flex items-center gap-3 mr-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
        */}

        {/* Perfil do usuário */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
            <span className="text-xs text-gray-500">{currentUser.role}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={currentUser.name} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {currentUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <div className="flex items-center justify-start gap-3 p-3 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt={currentUser.name} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {currentUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  {currentUser.crea && <p className="text-xs text-muted-foreground">CREA: {currentUser.crea}</p>}
                </div>
              </div>
              <div className="p-1">
                <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveView("configuracoes")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveView("configuracoes")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" /> {/* Mantido no dropdown, mas removido do header principal */}
                  <span>Notificações</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 mt-2 border-t pt-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair do Sistema</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
