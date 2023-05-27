import './Textbox.css';
function Textbox({ placeHolder, handler, field, defaultValue }) {
	return (
		<input
			className='Textbox'
			type='text'
			placeholder={placeHolder}
			onBlur={(e) => {
				handler(field, e.target.value);
			}}
			defaultValue={defaultValue}
		></input>
	);
}

export default Textbox;
