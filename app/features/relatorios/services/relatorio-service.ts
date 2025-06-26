import type { FiltrosRelatorio } from "@/app/types/relatorio"

const API_BASE_URL = "http://10.200.200.187:5001"

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

    console.log("🔍 Buscando relatórios:", url)
    
    let response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }
    
    let boletins = await response.json()
    console.log("📊 Boletins recebidos:", boletins.length)

    // Filtrar por status se não for "all"
    if (filtros.status && filtros.status !== "all") {
      console.log("🎯 Filtrando por status:", filtros.status)
      try {
        const statusResponse = await fetch(`${API_BASE_URL}/relatorios/status/${filtros.status}`)
        if (statusResponse.ok) {
          const boletinsPorStatus = await statusResponse.json()
          const idsStatus = boletinsPorStatus.map((item: any) => item.id)
          boletins = boletins.filter((boletim: any) => idsStatus.includes(boletim.id))
        }
      } catch (error) {
        console.warn("⚠️ Erro ao filtrar por status:", error)
      }
    }

    // Filtrar por técnico se não for "all"
    if (filtros.tecnico && filtros.tecnico !== "all") {
      console.log("👨‍💼 Filtrando por técnico:", filtros.tecnico)
      try {
        const tecnicoResponse = await fetch(`${API_BASE_URL}/tecnicos/${filtros.tecnico}/boletins`)
        if (tecnicoResponse.ok) {
          const boletinsPorTecnico = await tecnicoResponse.json()
          const idsTecnico = boletinsPorTecnico.map((item: any) => item.id)
          boletins = boletins.filter((boletim: any) => idsTecnico.includes(boletim.id))
        }
      } catch (error) {
        console.warn("⚠️ Erro ao filtrar por técnico:", error)
      }
    }

    console.log("✅ Relatórios filtrados:", boletins.length)
    return boletins

  } catch (error) {
    console.error("❌ Erro ao buscar relatórios:", error)
    throw error
  }
}

export async function buscarTecnicos() {
  try {
    const response = await fetch(`${API_BASE_URL}/tecnicos`)
    return await response.json()
  } catch (error) {
    console.error("❌ Erro ao buscar técnicos:", error)
    throw error
  }
}