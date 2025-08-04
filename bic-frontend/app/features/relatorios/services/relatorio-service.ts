import type { FiltrosRelatorio } from "@/app/types/relatorio"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function buscarRelatorios(filtros: FiltrosRelatorio) {
  try {
    let url = `${API_BASE_URL}/boletim`
    const params = new URLSearchParams()

    // Filtrar por data
    if (filtros.dataInicio) {
      params.append('dataInicio', filtros.dataInicio)
    }
    if (filtros.dataFim) {
      params.append('dataFim', filtros.dataFim)
    }

    // Se há parâmetros de data, adicionar à URL
    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;

    if (!token) {
      throw new Error('Token de autenticação não encontrado. Faça login novamente.')
    }

    let response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado ou inválido
        localStorage.removeItem('bic-token')
        throw new Error('Sessão expirada. Faça login novamente.')
      }
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    let boletins = await response.json()

    // Filtrar por status se não for "all"
    if (filtros.status && filtros.status !== "all") {
      try {
        const statusResponse = await fetch(`${API_BASE_URL}/relatorios/status/${filtros.status}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (statusResponse.ok) {
          const boletinsPorStatus = await statusResponse.json()
          const idsStatus = boletinsPorStatus.map((item: any) => item.id)
          boletins = boletins.filter((boletim: any) => idsStatus.includes(boletim.id))
        }
      } catch (error) {
        console.warn("⚠️ Erro ao filtrar por status:", error)
      }
    }

    // Filtrar por número de inscrição: busca exata
    if (filtros.inscricao && filtros.inscricao.trim() !== "") {
      boletins = boletins.filter((boletim: any) => {
        if (!boletim.inscricao) return false;
        return String(boletim.inscricao) === filtros.inscricao.trim();
      });
    } else {
      // Se não houver inscrição, não retorna nada
      return [];
    }

    return boletins

  } catch (error) {
    console.error("❌ Erro ao buscar relatórios:", error)
    throw error
  }
}

export async function buscarTecnicos() {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;

    if (!token) {
      throw new Error('Token de autenticação não encontrado. Faça login novamente.')
    }

    const response = await fetch(`${API_BASE_URL}/tecnicos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('bic-token')
        throw new Error('Sessão expirada. Faça login novamente.')
      }
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("❌ Erro ao buscar técnicos:", error)
    throw error
  }
}