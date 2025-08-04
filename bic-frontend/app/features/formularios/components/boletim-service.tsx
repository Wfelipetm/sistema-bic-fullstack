import { FormularioData } from "@/app/types/formulario"

function apiUrl(path: string): string {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const cleanPath = path.startsWith("/") ? path.slice(1) : path
  return `${baseURL}/${cleanPath}`
}

export async function createBoletim(formData: FormularioData) {
  const inscricaoValue = String(formData.inscricaoNumero || '')

  // Validar se a inscrição não está vazia
  if (!inscricaoValue || inscricaoValue.trim() === '') {
    throw new Error('Número de inscrição é obrigatório');
  }

  // Limpar a inscrição (manter apenas números)
  const inscricaoLimpa = inscricaoValue.replace(/\D/g, '');
  
  if (!inscricaoLimpa) {
    throw new Error('Número de inscrição deve conter apenas números');
  }

  // Converter para número (bigint compatível)
  const inscricaoNumber = parseInt(inscricaoLimpa, 10);
  
  if (isNaN(inscricaoNumber)) {
    throw new Error('Número de inscrição inválido');
  }

  // Criar payload JSON para teste - tentar número primeiro, depois string se falhar
  const createPayload = (inscricao: number | string) => ({
    inscricao: inscricao,
    lancamento_novo: formData.lancamentoNovo || '',
    revisao: formData.revisao || '',
    lote: formData.lote || '',
    quadra: formData.quadra || '',
    loteamento: formData.loteamento || '',
    distrito: formData.distrito || '',
    endereco: formData.endereco || '',
    cep: formData.cep || '',
    proprietario: formData.proprietario || '',
    cpf: formData.cpf || '',
    contato: formData.telefone || '',
    responsavel: formData.responsavel || 'Responsável',
    responsavel_tributario: formData.responsavel_tributario || '',
    responsavel_tributario_telefone: formData.responsavel_tributario_telefone || '',
    responsavel_tributario_cpf: formData.responsavel_tributario_cpf || ''
  });

  // Tentar primeiro com número
  let jsonPayload = createPayload(inscricaoNumber);

  // Função auxiliar para verificar se é um arquivo válido
  const isValidFile = (obj: any): obj is File => {
    return obj && 
           typeof obj.name === 'string' && 
           typeof obj.size === 'number' && 
           typeof obj.type === 'string' &&
           (obj instanceof File || obj instanceof Blob || 
            (obj.constructor && obj.constructor.name === 'File'));
  };

  // Função para reconstruir File se necessário
  const ensureFileObject = (obj: any): File | null => {
    if (!obj) return null;
    
    if (obj instanceof File) {
      return obj;
    }
    
    // Se tem as propriedades de File mas não é uma instância, tentar recriar
    if (obj.name && obj.size && obj.type && formData.fotoPreview) {
      try {
        // Converter base64 para Blob
        const base64Data = formData.fotoPreview.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: obj.type });
        
        // Criar novo File
        const file = new File([blob], obj.name, {
          type: obj.type,
          lastModified: obj.lastModified || Date.now()
        });
        
        return file;
      } catch (error) {
        console.error("Erro ao reconstruir File:", error);
        return null;
      }
    }
    
    return null;
  };

  // Função auxiliar para fazer requisição
  const makeRequest = async (payload: any) => {
    // Garantir que temos um File válido
    const validFile = ensureFileObject(formData.foto);
    
    // Se há foto válida, usar FormData; senão, usar JSON
    let requestBody: FormData | string;
    let headers: Record<string, string> = {};

    if (validFile) {
      // Usar FormData quando há foto
      const form = new FormData();
      
      // Adicionar todos os campos do JSON ao FormData
      Object.entries(payload).forEach(([key, value]) => {
        // Para a inscrição, enviar como número
        if (key === 'inscricao') {
          form.append(key, String(inscricaoNumber)); // Garantir que seja o número limpo
        } else {
          form.append(key, String(value));
        }
      });
      
      // Adicionar foto
      form.append('foto', validFile);
      
      requestBody = form;
      // Não definir Content-Type para FormData
    } else {
      // Usar JSON quando não há foto - garantir que inscrição seja número
      const jsonPayloadWithNumber = {
        ...payload,
        inscricao: inscricaoNumber // Garantir que seja sempre número
      };
      requestBody = JSON.stringify(jsonPayloadWithNumber);
      headers['Content-Type'] = 'application/json';
    }

    const token = typeof window !== "undefined" ? localStorage.getItem('bic-token') : null;
    return fetch(apiUrl("/boletim/"), {
      method: "POST",
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: requestBody,
    });
  };

  // Primeira tentativa: com número
  let res = await makeRequest(jsonPayload);

  // Se falhar com número, tentar com string
  if (!res.ok) {
    jsonPayload = createPayload(inscricaoLimpa);
    res = await makeRequest(jsonPayload);
  }

  // Se ainda falhar, tentar com string original
  if (!res.ok) {
    jsonPayload = createPayload(inscricaoValue);
    res = await makeRequest(jsonPayload);
  }
  if (!res.ok) {
    const errorText = await res.text()
    console.error("Erro do backend:", errorText)
    console.error("Status:", res.status)
    console.error("Headers:", res.headers)
    let errorMessage = "Erro ao salvar o boletim"
    try {
      const errorJson = JSON.parse(errorText)
      if (errorJson.error) {
        errorMessage = errorJson.error
      }
    } catch {
      errorMessage = errorText || errorMessage
    }
    throw new Error(errorMessage)
  }
  return res.json()
}