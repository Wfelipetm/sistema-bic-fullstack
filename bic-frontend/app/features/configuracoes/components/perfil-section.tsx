import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export function PerfilSection() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Perfil do Usuário</CardTitle>
        </div>
        <CardDescription>Informações pessoais e profissionais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nome" className="text-sm font-medium">
              Nome Completo
            </Label>
            <Input id="nome" defaultValue="João Silva" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail
            </Label>
            <Input id="email" type="email" defaultValue="joao.silva@bic.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="crea" className="text-sm font-medium">
              CREA
            </Label>
            <Input id="crea" defaultValue="12345" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="telefone" className="text-sm font-medium">
              Telefone
            </Label>
            <Input id="telefone" defaultValue="(11) 99999-9999" className="mt-1" />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Salvar Alterações</Button>
      </CardContent>
    </Card>
  )
}
