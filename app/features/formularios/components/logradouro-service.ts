import { apiUrl } from "@/lib/api"

export async function createLogradouro(data: any) {
  console.log("Payload enviado para /info-logradouro/:", JSON.stringify(data, null, 2))
  const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
  const res = await fetch(apiUrl("/info-logradouro/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Erro ao salvar logradouro")
  return res.json()
}