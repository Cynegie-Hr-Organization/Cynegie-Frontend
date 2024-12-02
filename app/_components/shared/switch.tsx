import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";


export function AppSwitch({ label, id, onChange }: { label: string, id: string, onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300" id={id} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
