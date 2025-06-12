export const getStatusColor = (status: string) => {
  switch (status) {
    case "Concluído":
      return "bg-green-100 text-green-800 border-green-200"
    case "Pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Em Revisão":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export const getTipoColor = (tipo: string) => {
  switch (tipo) {
    case "Residencial":
      return "bg-purple-100 text-purple-800"
    case "Comercial":
      return "bg-blue-100 text-blue-800"
    case "Industrial":
      return "bg-orange-100 text-orange-800"
    case "Público":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
