import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Appbutton = ({
  buttonText,
  loading,
  disabled,
  className,
}: {
  loading?: boolean;
  disabled?: boolean;
  buttonText: string;
  className?: string;
}) => {
  return (
    <Button disabled={disabled} className={`rounded-lg text-base p-2 text-white ${className ?? "bg-primary "}`}>
      {loading && <Spinner />}
      <span>{buttonText}</span>
    </Button>
  );
};

export const Spinner = () => <Loader2 className='animate-spin' />;

export default Appbutton;
