const AppRadio = ({ label, id, checked, name, onChange }: {
  label: string,
  id: string,
  checked: boolean,
  name?: string,
  onChange: (value: boolean) => void
}) => {
  return (
    <div className="flex items-center gap-x-3 text-sm text-gray-500 cursor-pointer capitalize">
      <input
        type="radio"
        name={name}
        id={id}
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}


export const AppCheckbox = ({ label, id, checked, onChange, name }: {
  label: string,
  id: string,
  checked: boolean,
  onChange: (value: boolean) => void,
  name?: string
}) => {
  return (
    <div className="flex items-center gap-x-3 text-sm text-gray-500 cursor-pointer capitalize">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        name={name}
        onChange={(e) => onChange(e.target.checked)}
        className="appearance-none w-4 h-4 border-[1.5px] border-gray-300 rounded checked:bg-primary checked:border-primary checked:text-white relative checked:after:absolute after:content-['✓'] after:h-2 after:w-2 after:inset-0"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default AppRadio;
