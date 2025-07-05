// Configuração da API
const API_BASE_URL = 'http://10.200.200.187:5001'

// Classe de erro customizada
export class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message)
        this.name = 'ApiError'
    }
}

// Função utilitária para fazer requisições HTTP
export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    // Configurações padrão
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    }

    // Adicionar token de autorização se existir
    const token = localStorage.getItem('bic-token')
    if (token) {
        defaultOptions.headers = {
            ...defaultOptions.headers,
            'Authorization': `Bearer ${token}`,
        }
    }

    try {
        const response = await fetch(url, defaultOptions)

        // Verificar se a resposta é OK
        if (!response.ok) {
            let errorMessage = 'Erro na requisição'

            try {
                const errorData = await response.json()
                errorMessage = errorData.error || errorData.message || errorMessage
            } catch {
                // Se não conseguir parsear o JSON do erro, usar mensagem padrão
                errorMessage = `Erro ${response.status}: ${response.statusText}`
            }

            throw new ApiError(errorMessage, response.status)
        }

        // Verificar se a resposta tem conteúdo
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
            return await response.json()
        }

        // Se não for JSON, retornar texto ou resposta vazia
        return (await response.text()) as unknown as T
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }

        // Erro de rede ou outros erros
        console.error('Erro na requisição:', error)
        throw new ApiError('Erro de conexão com o servidor')
    }
}

// Serviços de API organizados por funcionalidade
export const apiServices = {
    // Autenticação (já existe em auth-service.ts)
    auth: {
        login: (credentials: { email: string; senha: string }) =>
            apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),

        register: (userData: { nome: string; email: string; senha: string; papel: string }) =>
            apiRequest('/auth/cadastro', {
                method: 'POST',
                body: JSON.stringify(userData),
            }),

        getUsers: () =>
            apiRequest('/auth/usuarios', { method: 'GET' }),

        updateUser: (id: string, userData: any) =>
            apiRequest(`/auth/atualizar/${id}`, {
                method: 'PUT',
                body: JSON.stringify(userData),
            }),

        deleteUser: (id: string) =>
            apiRequest(`/auth/deletar/${id}`, { method: 'DELETE' }),
    },

    // Formulários BIC (para futuras implementações)
    formularios: {
        create: (formData: any) =>
            apiRequest('/formularios', {
                method: 'POST',
                body: JSON.stringify(formData),
            }),

        getAll: () =>
            apiRequest('/formularios', { method: 'GET' }),

        getById: (id: string) =>
            apiRequest(`/formularios/${id}`, { method: 'GET' }),

        update: (id: string, formData: any) =>
            apiRequest(`/formularios/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
            }),

        delete: (id: string) =>
            apiRequest(`/formularios/${id}`, { method: 'DELETE' }),
    },

    // Relatórios (para futuras implementações)
    relatorios: {
        generate: (params: any) =>
            apiRequest('/relatorios/generate', {
                method: 'POST',
                body: JSON.stringify(params),
            }),

        getAll: () =>
            apiRequest('/relatorios', { method: 'GET' }),

        getById: (id: string) =>
            apiRequest(`/relatorios/${id}`, { method: 'GET' }),
    },

    // Configurações do sistema (para futuras implementações)
    configuracoes: {
        get: () =>
            apiRequest('/configuracoes', { method: 'GET' }),

        update: (config: any) =>
            apiRequest('/configuracoes', {
                method: 'PUT',
                body: JSON.stringify(config),
            }),
    },
}

// Utilitários para trabalhar com o localStorage
export const storageUtils = {
    setToken: (token: string) => {
        localStorage.setItem('bic-token', token)
    },

    getToken: (): string | null => {
        return localStorage.getItem('bic-token')
    },

    removeToken: () => {
        localStorage.removeItem('bic-token')
    },

    setUser: (user: any) => {
        localStorage.setItem('bic-user', JSON.stringify(user))
    },

    getUser: (): any | null => {
        const user = localStorage.getItem('bic-user')
        return user ? JSON.parse(user) : null
    },

    removeUser: () => {
        localStorage.removeItem('bic-user')
    },

    clearAll: () => {
        localStorage.removeItem('bic-token')
        localStorage.removeItem('bic-user')
    }
}

// Hook para verificar se a API está disponível
export const checkApiHealth = async (): Promise<boolean> => {
    try {
        await apiRequest('/health', { method: 'GET' })
        return true
    } catch {
        return false
    }
}
