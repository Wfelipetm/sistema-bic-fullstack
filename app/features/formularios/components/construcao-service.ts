import { apiUrl } from "@/lib/api"

export async function createConstrucao(data: any) {
    console.log("Payload enviado para /info-construcao/:", JSON.stringify(data, null, 2))
    const res = await fetch(apiUrl("/info-construcao/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar construção")
    return res.json()
}