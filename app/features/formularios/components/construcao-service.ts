import { apiUrl } from "@/lib/api"

export async function createConstrucao(data: any) {
    const res = await fetch(apiUrl("/info-construcao/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar construção")
    return res.json()
}