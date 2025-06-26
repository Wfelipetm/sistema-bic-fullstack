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
      <div className="flex h-24 items-center px-6">
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

        {/* Imagem centralizada */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/regua-logo-itaguai_light3.png"
            alt="Logo Prefeitura"
            className="h-20 object-contain"
          />
        </div>

        {/* Perfil do usuário */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
            <span className="text-xs text-gray-500">{currentUser.role}</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10  text-white">
                  <AvatarFallback className="bg-[#2563EB]">
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
                  <AvatarImage  alt={currentUser.name} />
                  <AvatarFallback className=" text-white bg-[#2563EB]">
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
                {/* <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveView("configuracoes")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setActiveView("configuracoes")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" /> 
                  <span>Notificações</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem className="cursor-pointer text-red-600">
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
