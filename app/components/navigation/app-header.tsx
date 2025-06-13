"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge" // Removido pois não será mais usado aqui
import { Building2, User, LogOut, Settings, Bell } from "lucide-react" // Search removido
// import { Input } from "@/components/ui/input" // Removido pois não será mais usado aqui
import type { ViewType } from "@/app/types/navigation"
import { currentUser } from "@/app/constants/mock-data"
import Image from "next/image"

interface AppHeaderProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-24 items-center px-6 justify-between relative w-full">
        {/* Logo BIC com ícone e texto à esquerda */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-700" />
              <span className="font-bold text-lg text-blue-700">BIC</span>
            </div>
            <span className="text-xs text-blue-700 mt-1">Boletim de Informação Cadastral</span>
          </div>
        </div>

        {/* Imagem centralizada */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/regua-logo-itaguai_light3.png"
            alt="Logo Prefeitura de Itaguaí"
            width={400}
            height={50}
            priority
            className="mix-blend-multiply"
          />
        </div>

        {/* Avatar colado à direita */}
        <div className="flex items-center gap-3 absolute right-6 top-1/2 -translate-y-1/2">
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
