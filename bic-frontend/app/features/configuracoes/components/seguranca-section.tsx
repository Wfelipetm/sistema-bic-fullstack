import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export function SegurancaSection() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Segurança</CardTitle>
        </div>
        <CardDescription>Configurações de segurança da conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="senhaAtual" className="text-sm font-medium">
            Senha Atual
          </Label>
          <Input id="senhaAtual" type="password" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="novaSenha" className="text-sm font-medium">
            Nova Senha
          </Label>
          <Input id="novaSenha" type="password" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="confirmarSenha" className="text-sm font-medium">
            Confirmar Nova Senha
          </Label>
          <Input id="confirmarSenha" type="password" className="mt-1" />
        </div>
        <Button variant="outline">Alterar Senha</Button>
      </CardContent>
    </Card>
  )
}
