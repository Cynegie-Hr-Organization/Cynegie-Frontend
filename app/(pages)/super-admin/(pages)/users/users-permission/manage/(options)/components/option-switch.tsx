import { Switch } from "@/components/ui/switch";

export const OptionSwitch = ({
  label,
  description,
  id,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <label htmlFor={id} className="space-y-0.5">
        <p className="text-xs text-black font-semibold">{label}</p>
        <p className="text-xs text-gray-700">{description}</p>
      </label>

      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
      />
    </div>
  );
};
