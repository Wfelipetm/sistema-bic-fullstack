import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RecentListProps {
  title: string
  items: { title: string; date: string }[]
  ctaText: string
}

export function RecentList({ title, items, ctaText }: RecentListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </div>
        ))}
        <Button variant="outline" size="sm" className="mt-2 w-full">
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}
