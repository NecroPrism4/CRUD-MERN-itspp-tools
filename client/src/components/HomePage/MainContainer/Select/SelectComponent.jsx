import './SelectComponent.css';
import React from 'react';

function SelectComponent({ options }) {
	return (
		<select className='SelectSearch'>
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
