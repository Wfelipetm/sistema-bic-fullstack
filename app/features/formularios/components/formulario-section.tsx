import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface FormularioSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
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
  // Exemplo de uso dentro do componente:
  const url = apiUrl("/alguma-rota/");

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
                  <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
              </div>
              <Badge variant={isOpen ? "default" : "secondary"}>
                {isOpen ? "Aberto" : "Fechado"}
              </Badge>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CardContent className="space-y-6 pt-0">{children}</CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </Card>
  );
}
