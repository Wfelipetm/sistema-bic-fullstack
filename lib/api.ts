export const API_URL = process.env.NEXT_PUBLIC_API_URL

export function apiUrl(path: string) {
    return `${API_URL}${path}`
}