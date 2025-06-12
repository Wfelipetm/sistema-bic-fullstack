import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Bell } from "lucide-react"

export function NotificacoesSection() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Notificações</CardTitle>
        </div>
        <CardDescription>Configure suas preferências de notificação</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">E-mail de formulários pendentes</Label>
            <p className="text-xs text-gray-500">Receber notificações por e-mail sobre formulários pendentes</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Relatórios prontos</Label>
            <p className="text-xs text-gray-500">Notificar quando relatórios estiverem prontos</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Lembretes de revisão</Label>
            <p className="text-xs text-gray-500">Lembrar sobre formulários que precisam de revisão</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  )
}
