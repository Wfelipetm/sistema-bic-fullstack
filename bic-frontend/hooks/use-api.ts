"use client"

import { useState, useCallback } from 'react'
import { apiRequest, ApiError } from '@/lib/api-client'

interface UseApiState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

interface UseApiReturn<T> extends UseApiState<T> {
    execute: (...args: any[]) => Promise<T | null>
    reset: () => void
}

// Hook para realizar requisições de API
export function useApi<T>(
    apiCall: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    })

    const execute = useCallback(async (...args: any[]): Promise<T | null> => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const result = await apiCall(...args)
            setState({ data: result, loading: false, error: null })
            return result
        } catch (error) {
            const errorMessage = error instanceof ApiError
                ? error.message
                : 'Erro desconhecido'

            setState(prev => ({ ...prev, loading: false, error: errorMessage }))
            return null
        }
    }, [apiCall])

    const reset = useCallback(() => {
        setState({ data: null, loading: false, error: null })
    }, [])

    return {
        ...state,
        execute,
        reset,
    }
}

// Hook específico para cadastro de usuário
export function useRegisterUser() {
    return useApi(async (userData: {
        nome: string
        email: string
        senha: string
        papel: string
    }) => {
        return apiRequest('/auth/cadastro', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    })
}

// Hook específico para login
export function useLoginUser() {
    return useApi(async (credentials: {
        email: string
        senha: string
    }) => {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    })
}

// Hook para listar usuários (admin)
export function useGetUsers() {
    return useApi(async () => {
        return apiRequest('/auth/usuarios', { method: 'GET' })
    })
}

// Hook para atualizar usuário (admin)
export function useUpdateUser() {
    return useApi(async (id: string, userData: any) => {
        return apiRequest(`/auth/atualizar/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        })
    })
}

// Hook para deletar usuário (admin)
export function useDeleteUser() {
    return useApi(async (id: string) => {
        return apiRequest(`/auth/deletar/${id}`, { method: 'DELETE' })
    })
}

// Hook para operações com formulários (para futuras implementações)
export function useFormularios() {
    const create = useApi(async (formData: any) => {
        return apiRequest('/formularios', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
    })

    const getAll = useApi(async () => {
        return apiRequest('/formularios', { method: 'GET' })
    })

    const getById = useApi(async (id: string) => {
        return apiRequest(`/formularios/${id}`, { method: 'GET' })
    })

    const update = useApi(async (id: string, formData: any) => {
        return apiRequest(`/formularios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
        })
    })

    const remove = useApi(async (id: string) => {
        return apiRequest(`/formularios/${id}`, { method: 'DELETE' })
    })

    return {
        create,
        getAll,
        getById,
        update,
        remove,
    }
}

// Hook para operações com relatórios (para futuras implementações)
export function useRelatorios() {
    const generate = useApi(async (params: any) => {
        return apiRequest('/relatorios/generate', {
            method: 'POST',
            body: JSON.stringify(params),
        })
    })

    const getAll = useApi(async () => {
        return apiRequest('/relatorios', { method: 'GET' })
    })

    const getById = useApi(async (id: string) => {
        return apiRequest(`/relatorios/${id}`, { method: 'GET' })
    })

    return {
        generate,
        getAll,
        getById,
    }
}
