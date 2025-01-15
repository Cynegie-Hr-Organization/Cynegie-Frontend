import { ReactNode } from "react";
import { AccessType } from "./page";




const PermissionOptionLayout = ({ children, fullAccessChecked, limitAccessChecked, viewOnlyChecked, onPermissionChange, disabled }: {
  children: ReactNode
  fullAccessChecked: boolean
  limitAccessChecked: boolean
  viewOnlyChecked: boolean
  onPermissionChange: (value: AccessType) => void
  disabled: boolean
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-bold text-black font-roboto">Assign Permissions</h3>

      <div className="space-y-4 divide-gray-200">
        <PermissionRadio
          label="Full Access"
          description="Grant access to all modules and actions"
          id="full-access"
          checked={fullAccessChecked}
          onChange={() => onPermissionChange('fullAccess')}
          disabled={disabled}
        />

        <hr className="border-b border-gray-200" />

        <PermissionRadio
          label="Limit Access"
          description="Grant specific, customized access to various parts of the system"
          id="limit-access"
          checked={limitAccessChecked}
          onChange={() => onPermissionChange('limitAccess')}
          disabled={disabled}
        />

        <hr className="border-b border-gray-200" />

        <PermissionRadio
          label="View Only"
          description="Grant access to information without the ability to modify or improve anything"
          id="view-only"
          checked={viewOnlyChecked}
          onChange={() => onPermissionChange('viewOnlyAccess')}
          disabled={disabled}
        />

        <hr className="border-b border-gray-200" />
      </div>
      {children}
    </div>
  );
}



export const PermissionRadio = ({ label, description, id, checked, onChange, disabled }: {
  label: string,
  description: string,
  id: string,
  checked: boolean,
  onChange: (e: any) => void,
  disabled?: boolean
}) => {

  return (
    <div className="flex items-center gap-x-6 lg:gap-x-16">
      <input
        type="radio"
        name="user-permission"
        id={id}
        checked={checked}
        disabled={disabled}
        className="appearance-none transition-all duration-300 relative w-4 h-4 border-[1.5px] border-gray-300 rounded-full  checked:after:absolute checked:after:content-[''] checked:after:h-2 checked:after:w-2 checked:after:inset-0 checked:after:m-auto checked:after:rounded-full checked:after:bg-primary checked:border-primary checked:text-white grow-0 shrink-0"
        onChange={onChange}
      />

      <label htmlFor={id} className="space-y-0.5 text-xs">
        <p className="font-semibold">{label}</p>
        <p className="text-gray-500">{description}</p>
      </label>
    </div>
  )
}


export default PermissionOptionLayout

