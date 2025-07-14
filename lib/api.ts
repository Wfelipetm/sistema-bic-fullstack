
export const API_URL = process.env.NEXT_PUBLIC_API_URL

export function apiUrl(path: string) {
    return `${API_URL}${path}`
}

// Função utilitária para fetch automático com token
export async function apiFetch(path: string, options: RequestInit = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("bic-token") : null;
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };
    const response = await fetch(apiUrl(path), { ...options, headers });
    return response.json();
}