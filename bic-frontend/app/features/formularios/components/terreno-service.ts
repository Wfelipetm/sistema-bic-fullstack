import { apiUrl } from "@/lib/api"

export async function createTerreno(data: any) {
    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
    const res = await fetch(apiUrl("/info-terreno/"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar terreno")
    return res.json()
}