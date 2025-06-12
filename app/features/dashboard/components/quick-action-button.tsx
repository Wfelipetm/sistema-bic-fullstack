"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface QuickActionButtonProps {
  icon: LucideIcon
  title: string
  description: string
  onClick?: () => void
}

export function QuickActionButton({ icon: Icon, title, description, onClick }: QuickActionButtonProps) {
  return (
    <Button variant="outline" className="w-full justify-start h-12" onClick={onClick}>
      <Icon className="h-4 w-4 mr-3" />
      <div className="text-left">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </Button>
  )
}
