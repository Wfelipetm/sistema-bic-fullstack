import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Certifique-se que o nome do import está correto

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BIC - Sistema Técnico",
  description: "Sistema de Boletim de Informações Cadastrais para técnicos em edificações",
    generator: 'codecity'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
