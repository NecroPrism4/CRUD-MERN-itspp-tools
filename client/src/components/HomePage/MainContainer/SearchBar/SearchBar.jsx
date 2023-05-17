import './SearchBar.css';

function SearchBar({ handler, validInput, handlerTextbox, idInput, refn }) {
	return (
		<input
			placeholder='Buscar...'
			type='text'
			className={`RoundedRect SearchBar ${validInput ? '' : 'InvalidInput'}`}
			onChange={handler}
			onInput={idInput}
			onBlur={handlerTextbox}
			ref={refn}
		></input>
	);
}

export default SearchBar;
