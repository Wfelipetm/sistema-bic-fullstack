import { apiUrl } from "@/lib/api"

// BOLETIM
export const boletimAPI = {
    get: () => fetch(apiUrl("/boletim/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/boletim/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/boletim/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/boletim/${id}`), { method: "DELETE" }),
}

// INFO_LOGRADOURO
export const infoLogradouroAPI = {
    get: () => fetch(apiUrl("/info-logradouro/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/info-logradouro/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/info-logradouro/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/info-logradouro/${id}`), { method: "DELETE" }),
}

// INFO_TERRENO
export const infoTerrenoAPI = {
    get: () => fetch(apiUrl("/info-terreno/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/info-terreno/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/info-terreno/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/info-terreno/${id}`), { method: "DELETE" }),
}

// INFO_CONSTRUCAO
export const infoConstrucaoAPI = {
    get: () => fetch(apiUrl("/info-construcao/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/info-construcao/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/info-construcao/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/info-construcao/${id}`), { method: "DELETE" }),
}

// METRAGEM
export const metragemAPI = {
    get: () => fetch(apiUrl("/metragem/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/metragem/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/metragem/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/metragem/${id}`), { method: "DELETE" }),
}

// SITUACAO
export const situacaoAPI = {
    get: () => fetch(apiUrl("/situacao/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/situacao/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/situacao/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/situacao/${id}`), { method: "DELETE" }),
}

// Repita o padrão acima para os demais endpoints (caracter-solo, topografia, nivelamento, serventias, avali-urba-logradouro, calcamento, tipo, uso, tipo-construcao, esquadrilha, piso, forro, cobertura, acabamento-interno, acabamento-externo, obs-logradouro).

// Exemplo para um endpoint genérico:
export function makeCrudAPI(endpoint: string) {
    return {
        get: () => fetch(apiUrl(`/${endpoint}/`)).then(r => r.json()),
        create: (data: any) => fetch(apiUrl(`/${endpoint}/`), {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json()),
        update: (id: number, data: any) => fetch(apiUrl(`/${endpoint}/${id}`), {
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json()),
        delete: (id: number) => fetch(apiUrl(`/${endpoint}/${id}`), { method: "DELETE" }),
    }
}