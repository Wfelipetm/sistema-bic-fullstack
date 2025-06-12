"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2, LayoutDashboard, FileText, BarChart3, Settings, Menu, ChevronLeft } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function AppSidebar({ className, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Formulários",
      icon: FileText,
      href: "/formularios",
      active: pathname.startsWith("/formularios"),
    },
    {
      label: "Relatórios",
      icon: BarChart3,
      href: "/relatorios",
      active: pathname.startsWith("/relatorios"),
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/configuracoes",
      active: pathname.startsWith("/configuracoes"),
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex h-full flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-14",
        className,
      )}
    >
      {/* Sidebar Fechado */}
      {!isOpen && (
        <div className="flex h-full flex-col items-center justify-between py-4">
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg hover:bg-accent" aria-label="Abrir menu">
            <Building2 className="h-6 w-6 text-primary" />
          </button>
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg hover:bg-accent" aria-label="Abrir menu">
            <Menu className="h-6 w-6 text-muted-foreground" />
          </button>
          <div />
        </div>
      )}

      {/* Sidebar Aberto */}
      {isOpen && (
        <>
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="p-2 bg-primary rounded-lg">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span>Sistema BIC</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-accent"
              aria-label="Fechar menu"
            >
              <ChevronLeft className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              {routes.map((route) => (
                <Link
                  key={route.label}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    route.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4 border-t">
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-muted-foreground">© 2025 Sistema BIC</span>
              <span className="text-[10px] text-muted-foreground/70 mt-1">Desenvolvido por SMCTIC</span>
              <span className="text-[10px] text-muted-foreground/70">Versão 1.0.0</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
