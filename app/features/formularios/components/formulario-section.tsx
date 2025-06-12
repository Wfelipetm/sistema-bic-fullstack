import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react"

interface FormularioSectionProps {
  id: string
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

export function FormularioSection({
  id,
  title,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  isOpen,
  onToggle,
  children,
}: FormularioSectionProps) {
  return (
    <Card className="border-0 shadow-sm">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${iconBgColor}`}>
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    {title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
              </div>
              <Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Aberto" : "Fechado"}</Badge>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
