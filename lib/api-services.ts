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
    create: (data: any) => {
        return fetch(apiUrl("/info-construcao/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(async r => {
                const res = await r.json().catch(() => ({}));
                return res;
            });
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/info-construcao/${id}`), {
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json())
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/info-construcao/${id}`), { method: "DELETE" })
    },
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

// CARACTERISTICAS DO SOLO
export const caracterSoloAPI = {
    get: () => fetch(apiUrl("/caracter-solo/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/caracter-solo/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/caracter-solo/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/caracter-solo/${id}`), { method: "DELETE" }),
}

// TOPOGRAFIA
export const topografiaAPI = {
    get: () => fetch(apiUrl("/topografia/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/topografia/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/topografia/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/topografia/${id}`), { method: "DELETE" }),
}

// NIVELAMENTO
export const nivelamentoAPI = {
    get: () => fetch(apiUrl("/nivelamento/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/nivelamento/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/nivelamento/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/nivelamento/${id}`), { method: "DELETE" }),
}

// SERVENTIAS
export const serventiasAPI = {
    get: () => fetch(apiUrl("/serventias/")).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/serventias/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => fetch(apiUrl(`/serventias/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/serventias/${id}`), { method: "DELETE" }),
}

export async function createTerreno(data: any) {
    const res = await fetch(apiUrl("/info-terreno/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar terreno")
    return res.json()
}
// CALCAMENTO
export const calcamentoAPI = {
    get: () => fetch(apiUrl("/calcamento/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/calcamento/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/calcamento/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/calcamento/${id}`), { method: "DELETE" }),
}

// TIPO
export const tipoAPI = {
    get: () => fetch(apiUrl("/tipo/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/tipo/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/tipo/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/tipo/${id}`), { method: "DELETE" }),
}

// USO
export const usoAPI = {
    get: () => fetch(apiUrl("/uso/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/uso/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/uso/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/uso/${id}`), { method: "DELETE" }),
}

// TIPO_CONSTRUCAO
export const tipoConstrucaoAPI = {
    get: () => fetch(apiUrl("/tipo-construcao/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/tipo-construcao/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/tipo-construcao/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/tipo-construcao/${id}`), { method: "DELETE" }),
}

// ESQUADRIHA
export const esquadrilhaAPI = {
    get: () => fetch(apiUrl("/esquadrilha/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/esquadrilha/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/esquadrilha/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/esquadrilha/${id}`), { method: "DELETE" }),
}

// PISO
export const pisoAPI = {
    get: () => fetch(apiUrl("/piso/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/piso/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/piso/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/piso/${id}`), { method: "DELETE" }),
}

// FORRO
export const forroAPI = {
    get: () => fetch(apiUrl("/forro/")).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/forro/"), {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/forro/${id}`), {
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json());
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/forro/${id}`), { method: "DELETE" });
    },
}

// COBERTURA
export const coberturaAPI = {
    get: () => fetch(apiUrl("/cobertura/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/cobertura/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/cobertura/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/cobertura/${id}`), { method: "DELETE" }),
}

// ACABAMENTO_INTERNO
export const acabamentoInternoAPI = {
    get: () => fetch(apiUrl("/acabamento-interno/")).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/acabamento-interno/"), {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/acabamento-interno/${id}`), {
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
        }).then(r => r.json());
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/acabamento-interno/${id}`), { method: "DELETE" });
    },
}

// ACABAMENTO_EXTERNO
export const acabamentoExternoAPI = {
    get: () => fetch(apiUrl("/acabamento-externo/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/acabamento-externo/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/acabamento-externo/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/acabamento-externo/${id}`), { method: "DELETE" }),
}

// OBS_LOGRADOURO
export const obsLogradouroAPI = {
    get: () => fetch(apiUrl("/obs-logradouro/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/obs-logradouro/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/obs-logradouro/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/obs-logradouro/${id}`), { method: "DELETE" }),
}

// AVALI_URBA_LOGRADOURO
export const avaliUrbaLogradouroAPI = {
    get: () => fetch(apiUrl("/avali-urba-logradouro/")).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/avali-urba-logradouro/"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/avali-urba-logradouro/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/avali-urba-logradouro/${id}`), { method: "DELETE" }),
}

// Repita para os demais endpoints seguindo esse padrão!

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