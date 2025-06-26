import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentFormCard } from "./recent-form-card"
import { recentForms } from "@/app/constants/mock-data"

export function RecentFormsList() {
  return (
    <Card className="border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Formulários Recentes</CardTitle>
        <CardDescription>Últimos formulários preenchidos no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentForms.map((form) => (
            <RecentFormCard
              key={form.id}
              id={form.id}
              local={form.local}
              data={form.data}
              status={form.status}
              tecnico={form.tecnico}
              tipo={form.tipo}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
