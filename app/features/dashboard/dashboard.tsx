"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { StatCard } from "./components/stat-card"
import { RecentFormsList } from "./components/recent-forms-list"
import { QuickActions } from "./components/quick-actions"
import { dashboardStats } from "@/app/constants/mock-data"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Bem-vindo de volta!</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Formulário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Recent Forms and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentFormsList />
        <QuickActions />
      </div>
    </div>
  )
}
