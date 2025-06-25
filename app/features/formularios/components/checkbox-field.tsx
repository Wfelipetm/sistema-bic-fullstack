import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { apiUrl } from "@/lib/api"

interface CheckboxFieldProps {
  id: string
  label: string
  description: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function CheckboxField({ id, label, description, checked, onCheckedChange }: CheckboxFieldProps) {
  const url = apiUrl("/alguma-rota/")

  return (
    <div className="flex items-start space-x-3 p-3 bg-white border-gray-200 border-2 rounded-lg shadow-slate-500">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="mt-1" />
      <div className="flex-1">
        <Label htmlFor={id} className="font-medium cursor-pointer">
          {label}
        </Label>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  )
}
