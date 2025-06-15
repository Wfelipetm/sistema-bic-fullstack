import { apiUrl } from "@/lib/api"

export async function createTerreno(data: any) {
    const res = await fetch(apiUrl("/info-terreno/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar terreno")
    return res.json()
}