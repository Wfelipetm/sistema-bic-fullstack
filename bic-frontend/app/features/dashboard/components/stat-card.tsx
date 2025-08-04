import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, BarChart3, Clock, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: string
  color: string
  bgColor: string
  trend: string
}

export function StatCard({ title, value, description, icon, color, bgColor, trend }: StatCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "FileText":
        return <FileText className={`h-4 w-4 ${color}`} />
      case "BarChart3":
        return <BarChart3 className={`h-4 w-4 ${color}`} />
      case "Clock":
        return <Clock className={`h-4 w-4 ${color}`} />
      case "CheckCircle":
        return <CheckCircle className={`h-4 w-4 ${color}`} />
      default:
        return <FileText className={`h-4 w-4 ${color}`} />
    }
  }

  const isTrendPositive = trend.startsWith("+")

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColor}`}>{renderIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-medium ${isTrendPositive ? "text-green-600" : "text-red-600"}`}>
            {isTrendPositive ? (
              <TrendingUp className="h-3 w-3 inline mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 inline mr-1" />
            )}
            {trend}
          </span>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
