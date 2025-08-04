import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { apiUrl } from "@/lib/api"
import { ReactNode } from "react"

export interface CheckboxFieldProps {
  id: string
  label: ReactNode // <-- altere aqui
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function CheckboxField({ id, label, description, checked, onCheckedChange }: CheckboxFieldProps) {
  const url = apiUrl("/alguma-rota/")

  return (
    <div className="items-center space-x-1   rounded-lg shadow-slate-500">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="mt-1 " />
      {/* <div className="flex-1">
        <Label htmlFor={id} className="font-medium cursor-pointer">
          {label}
        </Label>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div> */}
    </div>
  )
}
