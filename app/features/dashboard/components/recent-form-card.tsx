import { Badge } from "@/components/ui/badge"
import { getStatusColor, getTipoColor } from "@/app/utils/helpers"

interface RecentFormProps {
  id: string
  local: string
  data: string
  status: string
  tecnico: string
  tipo: string
}

export function RecentFormCard({ id, local, data, status, tecnico, tipo }: RecentFormProps) {
  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors shadow-md">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-medium text-gray-900">#{id}</p>
          <Badge variant="outline" className={getTipoColor(tipo)}>
            {tipo}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-1">{local}</p>
        <p className="text-xs text-gray-500">Técnico: {tecnico}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-2">{data}</p>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>
    </div>
  )
}
