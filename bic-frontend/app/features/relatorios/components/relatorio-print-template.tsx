import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RelatorioPrintTemplate() {
  return (
    <div className="print:block hidden">
      <Card className="border-0 shadow-sm">
        <CardHeader className="text-center border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">BRASÃO</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">PREFEITURA MUNICIPAL DE ITAGUAÍ</p>
                <p className="text-xs">Estado do Rio de Janeiro</p>
                <p className="text-xs">Secretaria de Fazenda</p>
                <p className="text-xs">Subsecretaria de Arrecadação</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs">Carimbo e Assinatura do Fiscal</p>
              <div className="w-32 h-16 border border-gray-300 mt-2"></div>
            </div>
          </div>
          <CardTitle className="text-xl font-bold">BOLETIM DE INFORMAÇÃO CADASTRAL - (BIC)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {/* Dados Básicos */}
          <div className="grid grid-cols-3 gap-4 border-b pb-4">
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">INSCRIÇÃO Nº</p>
              <p className="text-sm">12345</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Lançamento novo em:</p>
              <p className="text-sm">15/01/2024</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Revisão em:</p>
              <p className="text-sm">15/01/2024</p>
            </div>
          </div>

          {/* Localização */}
          <div className="grid grid-cols-4 gap-4 border-b pb-4">
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Lote</p>
              <p className="text-sm">001</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Quadra</p>
              <p className="text-sm">A</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Loteamento</p>
              <p className="text-sm">Vila Nova</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Distrito</p>
              <p className="text-sm">Centro</p>
            </div>
          </div>

          {/* Endereço */}
          <div className="grid grid-cols-2 gap-4 border-b pb-4">
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Endereço</p>
              <p className="text-sm">Rua das Flores, 123</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">CEP</p>
              <p className="text-sm">23815-000</p>
            </div>
          </div>

          {/* Proprietário */}
          <div className="grid grid-cols-2 gap-4 border-b pb-4">
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">Proprietário (Compromissário)</p>
              <p className="text-sm">João Silva</p>
            </div>
            <div className="border border-gray-300 p-2">
              <p className="text-xs font-bold mb-1">CPF</p>
              <p className="text-sm">123.456.789-00</p>
            </div>
          </div>

          {/* I - INFORMAÇÕES SOBRE O LOGRADOURO */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">I - INFORMAÇÕES SOBRE O LOGRADOURO:</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-black flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </span>
                <span className="text-sm">1- Pavimentação</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-black flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </span>
                <span className="text-sm">2- Iluminação Pública</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-black"></span>
                <span className="text-sm">3- Rede de Esgoto</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-black flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </span>
                <span className="text-sm">4- Rede de Água</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border border-black flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </span>
                <span className="text-sm">5- Coleta de Lixo</span>
              </div>
            </div>
          </div>

          {/* II - INFORMAÇÕES SOBRE O TERRENO */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">II - INFORMAÇÕES SOBRE O TERRENO:</h3>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold text-sm mb-2">1- Situação:</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">1- encravamento</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">2- Vila</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </span>
                    <span className="text-xs">3- Meio de Quadra</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">2- Características do Solo:</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">1- Alagadiço</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </span>
                    <span className="text-xs">2- Arenoso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">3- Rochoso</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">3- Topografia:</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">1- Aclive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">2- Declive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </span>
                    <span className="text-xs">4- Horizontal</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-2">4- Nivelamento:</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">1- Abaixo do Nível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </span>
                    <span className="text-xs">2- Ao Nível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black"></span>
                    <span className="text-xs">3- Acima do Nível</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* III - METRAGENS */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2">III - METRAGENS:</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="font-bold text-sm mb-2">Área do Terreno:</p>
                <div className="border border-gray-300 p-4">
                  <p className="text-lg font-bold">450,00 m²</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm mb-2">Testada:</p>
                <div className="border border-gray-300 p-4">
                  <p className="text-lg font-bold">15,00 m</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-sm mb-2">Área Edificada:</p>
                <div className="border border-gray-300 p-4">
                  <p className="text-lg font-bold">120,00 m²</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assinatura */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-between">
              <div className="text-center">
                <div className="border-t border-black w-48 mx-auto mb-2"></div>
                <p className="font-medium">Assinatura do Técnico</p>
                <p className="text-sm text-gray-600">João Silva - CREA 12345</p>
              </div>
              <div className="text-center">
                <div className="border-t border-black w-48 mx-auto mb-2"></div>
                <p className="font-medium">Data e Carimbo</p>
                <p className="text-sm text-gray-600">{new Date().toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
