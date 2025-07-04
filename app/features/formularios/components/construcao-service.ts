import { apiUrl } from "@/lib/api"

export async function createConstrucao(data: any) {
    const payload = {
        ...data,
        acabamento_interno: {
            caiacao: data.acabamentoInterno?.caiacao ?? false,
            pintura_simples: data.acabamentoInterno?.pinturaSimples ?? false,
            pintura_lavavel: data.acabamentoInterno?.pinturaLavavel ?? false,
            especial: data.acabamentoInterno?.especial ?? false,
            reboco: data.acabamentoInterno?.reboco ?? false,
            sem: data.acabamentoInterno?.sem ?? false,
        },
        // ...outros campos...
    };

    delete payload.acabamentoInterno;

    const res = await fetch(apiUrl("/info-construcao/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erro ao salvar construção");
    return res.json();
}