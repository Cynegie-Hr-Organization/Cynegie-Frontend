import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MenuItem {
  label: string
  value: string
}

export function AppDropdownMenu({ trigger, menuItems, width = "w-56" }: { trigger: ReactNode, menuItems: ReactNode, width?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("bg-white rounded-lg", width)}>
        <DropdownMenuGroup>
          {menuItems}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AppMultipleSelect({ 
  label, 
  requiredField = false,
  items,
  placeholder,
  selectedValues = [],
  onSelectionChange,
  width = "w-full",
  triggerStyle = "border-gray-300"
}: { 
  label?: string
  requiredField?: boolean
  items: MenuItem[]
  placeholder?: string
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  width?: string
  triggerStyle?: string
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleItemClick = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    e.stopPropagation()
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newSelection)
  }

  const displayValue = () => {
    if (selectedValues.length === 0) return <p className="text-gray-400">{placeholder}</p>
    const selectedLabels = items
      .filter(item => selectedValues.includes(item.value))
      .map(item => item.label)
    return selectedLabels.join(', ')
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className={`flex flex-col gap-2 w-full ${width}`}>
        {label && (
          <p className={`text-sm font-semibold flex justify-start w-full ${
            requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ''
          }`}>
            {label}
          </p>
        )}

        <DropdownMenuTrigger asChild>
          <button className={`${triggerStyle} flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}>
            <span className="truncate">{displayValue()}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={cn("bg-white rounded-lg p-2", width)} onClick={e => e.stopPropagation()}>
          <div className="mb-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
          <DropdownMenuGroup className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200">            
            {filteredItems.map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:rounded-md text-sm px-2"
                onClick={(e) => handleItemClick(e, item.value)}
                onSelect={(e: any) => e.preventDefault()}
              >
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {selectedValues.includes(item.value) && <Check className="w-3 h-3" />}
                </div>
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
