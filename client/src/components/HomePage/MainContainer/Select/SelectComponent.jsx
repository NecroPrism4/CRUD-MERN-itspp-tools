import './SelectComponent.css';

function SelectComponent({ options, handler, disable }) {
	return (
		<select
			className={`RoundedRect SelectCombo ${disable ? 'Disabled' : ''}`}
			onChange={(e) => handler(e)}
			disabled={disable}
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
