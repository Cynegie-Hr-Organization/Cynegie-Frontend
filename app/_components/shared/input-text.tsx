


const InputText = ({ label, id, placeholder, requiredField = false, type = 'text', onChange, value }: {
  label: string,
  id: string,
  placeholder: string,
  requiredField?: boolean,
  type?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}) => {
  return (
    <div className="space-y-1 w-full">
      <label
        htmlFor={id}
        className={`text-sm font-semibold text-gray-700 ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ''}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 placeholder:text-sm outline-none focus:border-primary transition-all duration-300 "
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
export const InputTextArea = ({ label, id, placeholder, requiredField = false, type = 'text', onChange, value }: {
  label: string,
  id: string,
  placeholder: string,
  requiredField?: boolean,
  type?: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  value: string
}) => {
  return (
    <div className="space-y-1 w-full">
      <label
        htmlFor={id}
        className={`text-sm font-semibold text-gray-700 ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ''}`}
      >
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md p-2 placeholder:text-sm outline-none focus:border-primary transition-all duration-300 resize-none"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputText;