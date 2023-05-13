import './SearchBar.css';

function SearchBar({ handler, validInput }) {
	return (
		<input
			placeholder='Buscar...'
			type='text'
			className={`RoundedRect SearchBar ${validInput ? '' : 'InvalidInput'}`}
			onChange={handler}
		></input>
	);
}

export default SearchBar;
