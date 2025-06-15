import { apiUrl } from "@/lib/api"

export async function createLogradouro(data: any) {
  const res = await fetch(apiUrl("/info-logradouro/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Erro ao salvar logradouro")
  return res.json()
}