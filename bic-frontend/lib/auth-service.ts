const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export interface LoginRequest {
    email: string
    senha: string
}

export interface RegisterRequest {
    nome: string
    email: string
    senha: string
    papel: string
}

export interface AuthResponse {
    token: string
    usuario: {
        id: number
        nome: string
        email: string
        papel: string
    }
}

export interface ApiError {
    error: string
}

class AuthService {
    private async makeRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
        const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição')
        }

        return data
    }

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        return this.makeRequest<AuthResponse>('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        })
    }

    async register(userData: RegisterRequest): Promise<AuthResponse> {
        return this.makeRequest<AuthResponse>('/cadastro', {
            method: 'POST',
            body: JSON.stringify(userData),
        })
    }

    async getUsers(): Promise<any[]> {
        const token = localStorage.getItem('bic-token')
        if (!token) {
            throw new Error('Token não encontrado')
        }

        return this.makeRequest<any[]>('/usuarios', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    async updateUser(id: string, userData: Partial<RegisterRequest>): Promise<any> {
        const token = localStorage.getItem('bic-token')
        if (!token) {
            throw new Error('Token não encontrado')
        }

        return this.makeRequest<any>(`/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        })
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const token = localStorage.getItem('bic-token')
        if (!token) {
            throw new Error('Token não encontrado')
        }

        return this.makeRequest<{ message: string }>(`/deletar/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
    }

    // Função para validar token
    async validateToken(): Promise<boolean> {
        try {
            const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
            if (!token) return false;

            // Usar endpoint de usuários para validar o token
            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                // Comentado para evitar logout automático
                // if (response.status === 401) {
                //     localStorage.removeItem('bic-token');
                // }
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao validar token:', error);
            return false;
        }
    }

    // Função para verificar autenticação e redirecionar se necessário
    async checkAuthAndRedirect(): Promise<boolean> {
        const isValid = await this.validateToken();
        if (!isValid) {
            if (typeof window !== "undefined") {
                window.location.href = '/login';
            }
            return false;
        }
        return true;
    }
}

export const authService = new AuthService()
