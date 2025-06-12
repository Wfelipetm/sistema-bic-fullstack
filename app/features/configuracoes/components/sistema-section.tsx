import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Database } from "lucide-react"

export function SistemaSection() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Sistema</CardTitle>
        </div>
        <CardDescription>Configurações gerais do sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Backup automático</Label>
            <p className="text-xs text-gray-500">Fazer backup dos dados automaticamente</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Modo escuro</Label>
            <p className="text-xs text-gray-500">Usar tema escuro na interface</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Versão do Sistema</Label>
          <div className="flex items-center gap-2">
            <Badge variant="outline">v1.2.3</Badge>
            <span className="text-xs text-gray-500">Última atualização: 15/01/2024</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
