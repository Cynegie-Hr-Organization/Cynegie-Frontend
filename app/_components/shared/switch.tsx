import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AppSwitch({
  label,
  id,
  onChange,
  checked,
}: {
  label?: string;
  id: string;
  onChange: (value: boolean) => void;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
