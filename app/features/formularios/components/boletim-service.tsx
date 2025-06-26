import { FormularioData } from "@/app/types/formulario"

function apiUrl(path: string): string {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const cleanPath = path.startsWith("/") ? path.slice(1) : path
  return `${baseURL}/${cleanPath}`
}

export async function createBoletim(formData: FormularioData) {
  const inscricaoValue = formData.inscricaoNumero || formData.numeroInscricao

  // Agora espera que lancamentoNovo e revisao sejam strings no formato ISO (ex: "2024-06-13T00:00:00.000Z")
  const payload = {
    inscricao: Number(inscricaoValue),
    lancamento_novo: formData.lancamentoNovo,
    revisao: formData.revisao,
    lote: formData.lote,
    quadra: formData.quadra,
    loteamento: formData.loteamento,
    distrito: formData.distrito,
    endereco: formData.endereco,
    cep: Number(formData.cep),
    proprietario: formData.proprietario,
    cpf: Number(formData.cpf),
    contato: Number(formData.telefone),
    responsavel: formData.responsavel || "Responsável",
    tecnico_id: Number(formData.tecnicoId) // Adicione esta linha!
  }

  // Log para depuração
  console.log("Payload enviado para /boletim/:", JSON.stringify(payload, null, 2))

  const res = await fetch(apiUrl("/boletim/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Erro ao salvar o boletim")
  return res.json()
}