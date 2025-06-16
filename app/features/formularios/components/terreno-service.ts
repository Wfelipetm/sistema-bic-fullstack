import { apiUrl } from "@/lib/api"

export async function createTerreno(data: any) {
    console.log("Payload enviado para /info-terreno/:", JSON.stringify(data, null, 2))
    const res = await fetch(apiUrl("/info-terreno/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar terreno")
    return res.json()
}