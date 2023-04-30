import './SelectComponent.css';

function SelectComponent({ options, handler }) {
	return (
		<select className='SelectSearch' onChange={(e) => handler(e)}>
			{options &&
				options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
		</select>
	);
}

export default SelectComponent;
