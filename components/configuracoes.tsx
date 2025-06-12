"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Database } from "lucide-react"

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Configurações
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Perfil do Usuário */}
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

        {/* Notificações */}
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

        {/* Segurança */}
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

        {/* Sistema */}
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
      </div>
    </div>
  )
}
