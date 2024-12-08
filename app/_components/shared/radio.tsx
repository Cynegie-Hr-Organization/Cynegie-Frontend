const AppRadio = ({ label, id, checked, onChange }: { label: string, id: string, checked: boolean, onChange: (value: boolean) => void }) => {
  return (
    <div className="flex items-center gap-x-3 text-sm text-gray-500 cursor-pointer capitalize">
      <input
        type="radio"
        name="feedback-type"
        id={id}
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default AppRadio;