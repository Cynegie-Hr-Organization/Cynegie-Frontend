import { useEffect, useState } from "react";

export default function AppCheckbox({ label, id, name, checked = false, onChange, className }: {
	label?: string,
	id: string,
	name?: string,
	checked: boolean,
	className?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<div className="flex items-center gap-x-2 text-sm text-gray-500 cursor-pointer capitalize">
			<input
				type="checkbox"
				name={name}
				id={id}
				checked={checked}
				onChange={onChange}
				className={`appearance-none w-4 h-4 border-[1.5px] border-gray-300 rounded checked:bg-primary checked:border-primary checked:text-white relative checked:after:absolute checked:after:content-['✔'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:h-full checked:after:w-full checked:after:inset-0 ${className ?? ''}`}
			/>

			{/* <Checkbox id={id} name={name} checked={checked} /> */}
			<label htmlFor={id} className="font-semibold select-none">{label}</label>
		</div>
	);
}



export const useCheckbox = (totalCheckboxes: number) => {
	const [checked, setChecked] = useState(false);
	const [isAllChecked, setIsAllChecked] = useState(false);

	const handleCheckboxChange = () => {
		setChecked(!checked);
	};

	const handleHeaderCheckboxChange = () => {
		setIsAllChecked(!isAllChecked);
		setChecked(!isAllChecked);
	};

	useEffect(() => {
		setIsAllChecked(checked && totalCheckboxes === 1);
	}, [checked, totalCheckboxes]);

	return {
		checked,
		handleCheckboxChange,
		isAllChecked,
		handleHeaderCheckboxChange
	};
};