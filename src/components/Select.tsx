import React from 'react';

interface SelectProps {
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
	label: string;
	defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	onChange,
	label,
	defaultValue
}) => (
	<select
		onChange={(e) => onChange(e.target.value)}
		defaultValue={defaultValue}
		className='bg-[#254E79] cursor-pointer'
		aria-label={label}
	>
		<option value=''>{label}</option>
		{options.map(({ value, label }, index) => (
			<option
				key={index}
				value={value}
			>
				{label}
			</option>
		))}
	</select>
);

export default Select;
