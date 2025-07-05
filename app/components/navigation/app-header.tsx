"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Building2, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { ViewType } from "@/app/types/navigation"

interface AppHeaderProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  if (!user) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="flex h-24 items-center px-6">
        {/* Logo e Título */}
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-900 text-white">
            <Building2 className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">BIC Sistema</h1>
            <p className="text-xs text-blue-400">Boletim de Informações Cadastrais</p>
          </div>
        </div>

        {/* Imagem centralizada */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/SMCTIC - azul-marinho.png"
            alt="Logo Prefeitura"
            className="h-20 object-contain"
            style={{
              height: 120,
              width: 600,
              }}
          />
        </div>

        {/* Perfil do usuário */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold text-blue-900">{user.name}</span>
            <span className="text-xs text-blue-400">{user.role}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-blue-50">
                <Avatar className="h-10 w-10 text-white">
                  <AvatarFallback className="bg-blue-900 text-white font-semibold">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 border-blue-100" align="end" forceMount>
              <div className="flex items-center justify-start gap-3 p-3 border-b border-blue-100">
                <Avatar className="h-12 w-12">
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="text-white bg-blue-900 font-semibold">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="font-semibold text-sm text-blue-900">{user.name}</p>
                  <p className="text-xs text-blue-400">{user.email}</p>
                  {user.crea && <p className="text-xs text-blue-400">CREA: {user.crea}</p>}
                </div>
              </div>
              <div className="p-1">
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Sair do Sistema</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
