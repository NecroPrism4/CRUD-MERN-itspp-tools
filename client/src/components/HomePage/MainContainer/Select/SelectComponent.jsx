import { useEffect } from 'react';
import './SelectComponent.css';

function SelectComponent({
	options,
	handler,
	field,
	disable,
	defaultSelected,
}) {
	useEffect(() => {
		console.log(field);
	}, [field]);

	return (
		<select
			className={`RoundedRect SelectCombo ${disable ? 'Disabled' : ''}`}
			onChange={(e) => handler(e, field)}
			disabled={disable}
			defaultValue={`${defaultSelected}`}
		>
			{options &&
				options.map((option, index) => {
					return (
						<option key={index} value={option.value} disabled={disable}>
							{option.label}
						</option>
					);
				})}
		</select>
	);
}

export default SelectComponent;
