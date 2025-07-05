"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserProfile } from '@/app/types/user'
import { authService } from '@/lib/auth-service'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (nome: string, email: string, senha: string, papel: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se existe um usuário salvo no localStorage
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem('bic-user')
        const storedToken = localStorage.getItem('bic-token')
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error)
        localStorage.removeItem('bic-user')
        localStorage.removeItem('bic-token')
      } finally {
        setIsLoading(false)
      }
    }

    checkStoredUser()
  }, [])

  const login = async (email: string, senha: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true)
    
    try {
      const data = await authService.login({ email, senha })
      
      const userProfile: UserProfile = {
        id: data.usuario.id.toString(),
        name: data.usuario.nome,
        email: data.usuario.email,
        role: data.usuario.papel,
      }
      
      setUser(userProfile)
      localStorage.setItem('bic-user', JSON.stringify(userProfile))
      localStorage.setItem('bic-token', data.token)
      
      return { success: true }
    } catch (error) {
      console.error('Erro durante o login:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro de conexão com o servidor' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (nome: string, email: string, senha: string, papel: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true)
    
    try {
      const data = await authService.register({ nome, email, senha, papel })
      
      const userProfile: UserProfile = {
        id: data.usuario.id.toString(),
        name: data.usuario.nome,
        email: data.usuario.email,
        role: data.usuario.papel,
      }
      
      setUser(userProfile)
      localStorage.setItem('bic-user', JSON.stringify(userProfile))
      localStorage.setItem('bic-token', data.token)
      
      return { success: true }
    } catch (error) {
      console.error('Erro durante o cadastro:', error)
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Erro de conexão com o servidor' 
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('bic-user')
    localStorage.removeItem('bic-token')
  }

  const isAuthenticated = !!user

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
