import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"


const Appbutton = ({ buttonText, loading, disabled }: { loading?: boolean, disabled?: boolean, buttonText: string }) => {
  return (
    <Button disabled={disabled} className="bg-primary rounded-lg text-base p-2 text-white">
      {loading && <Spinner />}
      <span>{buttonText}</span>
    </Button>
  )
}

export const Spinner = () => <Loader2 className="animate-spin" />


export default Appbutton;