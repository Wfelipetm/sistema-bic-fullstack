
import { apiUrl } from "@/lib/api"

// Utilitário para obter headers com Authorization
function authHeaders(extra: Record<string, any> = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...extra,
    };
}

// BOLETIM
export const boletimAPI = {
    get: () => fetch(apiUrl("/boletim/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/boletim/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/boletim/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/boletim/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// INFO_LOGRADOURO
export const infoLogradouroAPI = {
    get: () => fetch(apiUrl("/info-logradouro/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/info-logradouro/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/info-logradouro/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/info-logradouro/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// INFO_TERRENO
export const infoTerrenoAPI = {
    get: () => fetch(apiUrl("/info-terreno/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/info-terreno/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/info-terreno/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/info-terreno/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// INFO_CONSTRUCAO
export const infoConstrucaoAPI = {
    get: () => fetch(apiUrl("/info-construcao/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/info-construcao/"), {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(data)
        })
            .then(async r => {
                const res = await r.json().catch(() => ({}));
                return res;
            });
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/info-construcao/${id}`), {
            method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json())
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/info-construcao/${id}`), { method: "DELETE", headers: authHeaders() })
    },
}

// METRAGEM
export const metragemAPI = {
    get: () => fetch(apiUrl("/metragem/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/metragem/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/metragem/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/metragem/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// SITUACAO
export const situacaoAPI = {
    get: () => fetch(apiUrl("/situacao/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/situacao/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/situacao/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/situacao/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// CARACTERISTICAS DO SOLO
export const caracterSoloAPI = {
    get: () => fetch(apiUrl("/caracter-solo/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/caracter-solo/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/caracter-solo/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/caracter-solo/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// TOPOGRAFIA
export const topografiaAPI = {
    get: () => fetch(apiUrl("/topografia/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/topografia/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/topografia/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/topografia/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// NIVELAMENTO
export const nivelamentoAPI = {
    get: () => fetch(apiUrl("/nivelamento/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/nivelamento/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/nivelamento/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/nivelamento/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// SERVENTIAS
export const serventiasAPI = {
    get: () => fetch(apiUrl("/serventias/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/serventias/"), {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => fetch(apiUrl(`/serventias/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/serventias/${id}`), { method: "DELETE", headers: authHeaders() }),
}

export async function createTerreno(data: any) {
    const res = await fetch(apiUrl("/info-terreno/"), {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao salvar terreno")
    return res.json()
}
// CALCAMENTO
export const calcamentoAPI = {
    get: () => fetch(apiUrl("/calcamento/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/calcamento/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/calcamento/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/calcamento/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// TIPO
export const tipoAPI = {
    get: () => fetch(apiUrl("/tipo/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/tipo/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/tipo/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/tipo/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// USO
export const usoAPI = {
    get: () => fetch(apiUrl("/uso/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/uso/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/uso/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/uso/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// TIPO_CONSTRUCAO
export const tipoConstrucaoAPI = {
    get: () => fetch(apiUrl("/tipo-construcao/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/tipo-construcao/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/tipo-construcao/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/tipo-construcao/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// ESQUADRIHA
export const esquadrilhaAPI = {
    get: () => fetch(apiUrl("/esquadrilha/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/esquadrilha/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/esquadrilha/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/esquadrilha/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// PISO
export const pisoAPI = {
    get: () => fetch(apiUrl("/piso/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/piso/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/piso/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/piso/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// FORRO
export const forroAPI = {
    get: () => fetch(apiUrl("/forro/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/forro/"), {
            method: "POST", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/forro/${id}`), {
            method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json());
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/forro/${id}`), { method: "DELETE", headers: authHeaders() });
    },
}

// COBERTURA
export const coberturaAPI = {
    get: () => fetch(apiUrl("/cobertura/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/cobertura/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/cobertura/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/cobertura/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// ACABAMENTO_INTERNO
export const acabamentoInternoAPI = {
    get: () => fetch(apiUrl("/acabamento-interno/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/acabamento-interno/"), {
            method: "POST", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => {
        return fetch(apiUrl(`/acabamento-interno/${id}`), {
            method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json());
    },
    delete: (id: number) => {
        return fetch(apiUrl(`/acabamento-interno/${id}`), { method: "DELETE", headers: authHeaders() });
    },
}

// ACABAMENTO_EXTERNO
export const acabamentoExternoAPI = {
    get: () => fetch(apiUrl("/acabamento-externo/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/acabamento-externo/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/acabamento-externo/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/acabamento-externo/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// OBS_LOGRADOURO
export const obsLogradouroAPI = {
    get: () => fetch(apiUrl("/obs-logradouro/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/obs-logradouro/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/obs-logradouro/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/obs-logradouro/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// AVALI_URBA_LOGRADOURO
export const avaliUrbaLogradouroAPI = {
    get: () => fetch(apiUrl("/avali-urba-logradouro/"), { headers: authHeaders() }).then(r => r.json()),
    create: (data: any) => fetch(apiUrl("/avali-urba-logradouro/"), {
        method: "POST", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    update: (id: number, data: any) => fetch(apiUrl(`/avali-urba-logradouro/${id}`), {
        method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/avali-urba-logradouro/${id}`), { method: "DELETE", headers: authHeaders() }),
}

// Repita para os demais endpoints seguindo esse padrão!

// Exemplo para um endpoint genérico:
export function makeCrudAPI(endpoint: string) {
    return {
        get: () => fetch(apiUrl(`/${endpoint}/`), { headers: authHeaders() }).then(r => r.json()),
        create: (data: any) => fetch(apiUrl(`/${endpoint}/`), {
            method: "POST", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json()),
        update: (id: number, data: any) => fetch(apiUrl(`/${endpoint}/${id}`), {
            method: "PUT", headers: authHeaders(), body: JSON.stringify(data)
        }).then(r => r.json()),
        delete: (id: number) => fetch(apiUrl(`/${endpoint}/${id}`), { method: "DELETE", headers: authHeaders() }),
    }
}