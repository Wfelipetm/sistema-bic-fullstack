"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download, Printer } from "lucide-react";
import { getStatusColor, getTipoColor } from "@/app/utils/helpers";
import type { Relatorio } from "@/app/types/relatorio";
import { gerarRelatorioPDF } from "../../../../hooks/use-relatorio-pdf";

interface RelatorioItemProps {
  relatorio: Relatorio;
  onPreview: (id: string) => void;
  onDownload: (id: string) => void;
  onPrint: (id: string) => void;
}

export function RelatorioItem({
  relatorio,
  onPreview,
  onDownload,
  onPrint,
}: RelatorioItemProps) {
  const handlePreview = async () => {
    const blob = await gerarRelatorioPDF(Number(relatorio.id));
    if (!blob) {
      // Optionally, show an error message to the user here
      return;
    }
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{relatorio.titulo}</h3>
            <p className="text-sm text-gray-500">ID: {relatorio.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>📅 {relatorio.data}</span>
          <span>👤 {relatorio.tecnico}</span>
          
          <Badge variant="outline" className={getTipoColor(relatorio.tipo)}>
            {relatorio.tipo}
          </Badge>
          <Badge className={getStatusColor(relatorio.status)}>
            {relatorio.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-2" />
          Visualizar
        </Button>
        {/* <Button variant="outline" size="sm" onClick={gerarRelatorioPDF}>
          <Download className="h-4 w-4 mr-2" />
          Baixar
        </Button> */}
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => onPrint(relatorio.id)}
        >
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button> */}
      </div>
    </div>
  );
}
