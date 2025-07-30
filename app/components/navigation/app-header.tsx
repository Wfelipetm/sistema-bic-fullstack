"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FileText, LogOut, CircleDollarSign, House } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import type { ViewType } from "@/app/types/navigation"

interface AppHeaderProps {
  activeView: ViewType
  setActiveView: (view: ViewType) => void
}

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

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
    <header className="items-center gap-4 px-4 md:px-6 bg-gradient-to-l from-blue-50 via-white to-white shadow-lg py-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-800 rounded-lg shadow-itaguai relative">
                <House className="w-10 h-10 text-white drop-shadow-sm" />
                <div className="absolute top-8 right-1 w-[13px] h-[13px] bg-success-500 rounded-full flex items-center justify-center">
                  <CircleDollarSign className="w-30 h-4 text-white" />
                </div>
              </div>
            <div>
              <h1 className="text-blue-800 font-bold text-lg">Sistema BIC</h1>
              <p className="text-sm text-blue-600">Boletim de Informações Cadastrais</p>
            </div>
          </div>
        </div>

        {/* Logo central */}
        <div className="flex-1 flex justify-center">
          <img
            src="/images/SMCTIC - azul-marinho.png"
            alt="Secretaria de Ciência, Tecnologia, Inovação e Comunicação"
            className="h-16 max-w-[400px] object-contain"
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none group"
              type="button"
              id="user-menu-button"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => setShowUserMenu((v) => !v)}
            >
              <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{getUserInitials(user?.name || "Usuario")}</span>
              </div>
            </button>
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-blue-900">{user?.name}</p>
                  <p className="text-xs text-blue-700">{user?.email}</p>
                  {user?.crea && <p className="text-xs text-blue-700">CREA: {user.crea}</p>}
                </div>
                <div className="py-2">
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center justify-start text-blue-700 hover:text-red-600 hover:bg-blue-100"
                    title="Sair do sistema"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
