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
import { IoIosArrowDown } from "react-icons/io"





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
  requiredField,
  items,
  selectedValues = [],
  onSelectionChange,
  width = "w-full",
  triggerStyle = "border-gray-300",
  noResultsText = "No results found",
  placeholder = "Select an option"
}: {
  label?: string
  requiredField?: boolean
  items: { label: string; value: string }[]
  selectedValues?: string[]
  onSelectionChange: (values: string[]) => void
  width?: string
  triggerStyle?: string
  noResultsText?: string
  placeholder?: string
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleItemClick = (e: React.MouseEvent, value: string) => {
    e.preventDefault()
    const newValue = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value]
    onSelectionChange(newValue)
  }

  const displayValue = () => {
    if (!selectedValues || selectedValues.length === 0) {
      return <span className="text-gray-400">{placeholder}</span>
    }
    const selectedLabels = items
      .filter(item => selectedValues.includes(item.value))
      .map(item => item.label)
    return selectedLabels.join(", ")
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className={`flex flex-col gap-2 ${width}`}>
        {label && (
          <p className={`text-sm font-semibold flex justify-start w-full ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ''
            }`}>
            {label}
          </p>
        )}

        <DropdownMenuTrigger asChild>
          <button className={`${triggerStyle} relative h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}>
            <div className="grid grid-cols-[1fr_auto] items-center w-full gap-2">
              <p className="truncate text-left">{displayValue()}</p>
              <IoIosArrowDown />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={cn("bg-white rounded-lg p-2 w-full", width)} onClick={e => e.stopPropagation()}>
          <div className="mb-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-2 px-1 text-sm text-gray-500 text-center">
              {noResultsText}
            </div>
          ) : (
            <DropdownMenuGroup className="max-h-[200px] overflow-y-auto w-full multi-select">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 hover:rounded-md text-sm px-2 border-b"
                onClick={(e) => {
                  e.preventDefault()
                  const allValues = items.map(item => item.value)
                  const newSelected = selectedValues.length === items.length ? [] : allValues
                  onSelectionChange(newSelected)
                }}
                onSelect={(e: any) => e.preventDefault()}
              >
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {selectedValues.length === items.length && <Check className="w-3 h-3" />}
                </div>
                <span>Select All</span>
              </DropdownMenuItem>
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
          )}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
