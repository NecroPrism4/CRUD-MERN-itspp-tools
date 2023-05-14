import './SelectComponent.css';

function SelectComponent({
	options,
	handleEditData,
	field,
	disable,
	defaultSelected,
}) {
	/* 	console.log(options);
	console.log(defaultSelected); */
	return (
		<select
			className={`RoundedRect SelectCombo ${disable ? 'Disabled' : ''}`}
			onChange={(e) => handleEditData(field, e)}
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
