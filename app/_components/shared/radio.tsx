const AppRadio = ({ label, id, onChange }: { label: string, id: string, onChange: (value: string) => void }) => {
  return (
    <div className="flex items-center gap-x-3 text-sm text-gray-500 cursor-pointer capitalize">
      <input type="radio" name="feedback-type" id={id} onChange={(e) => onChange(e.target.value)} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default AppRadio;