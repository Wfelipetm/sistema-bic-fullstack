import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "sonner"
import { Open_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: "BIC - Sistema de Informação Cadastral",
  description: "Sistema de Boletim de Informações Cadastrais para técnicos em edificações",
    generator: 'Prefeitura Municipal de Itaguaí',
    icons: {
    icon: [			
      { url: "/favicon/building.png" },
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <body className={`${inter.variable} font-sans light`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          forcedTheme="light"
          storageKey="bic-theme"
        >
          <AuthProvider>
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                className: "text-lg font-bold px-8 py-6 rounded-2xl shadow-2xl border-2 border-opacity-80",
                style: { minWidth: 420, maxWidth: 700 },
                classNames: {
                  success: "bg-green-600 text-white border-green-700",
                  error: "bg-red-600 text-white border-red-700",
                },
              }}
            />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
