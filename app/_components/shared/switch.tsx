import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";


<<<<<<< HEAD
export function AppSwitch({ label, id, onChange }: { label?: string, id: string, onChange: (value: boolean) => void }) {
=======
export function AppSwitch({ label, id, onChange }: { label: string, id: string, onChange: (value: boolean) => void }) {
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
  return (
    <div className="flex items-center space-x-2">
      <Switch className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300" id={id} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
