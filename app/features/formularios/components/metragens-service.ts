import { apiUrl } from "@/lib/api"

export async function createMetragens(data: any) {
    console.log("Payload enviado para /metragem/:", JSON.stringify(data, null, 2))
    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
    const res = await fetch(apiUrl("/metragem/"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar metragem")
    return res.json()
}