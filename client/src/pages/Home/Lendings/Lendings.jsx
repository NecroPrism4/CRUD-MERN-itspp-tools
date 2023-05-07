import './Lendings.css';
import { useEffect, useContext, useState } from 'react';
import { SectionContext } from '../../../context/SectionContext';

import LendingsTableRow from '../../../components/HomePage/MainContainer/CustomTableRows/LendingsTableRow/LendingsTableRow';
import SelectComponent from '../../../components/HomePage/MainContainer/Select/SelectComponent';

function Lendings() {
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Prestamos');
	}, []);

	const [activeTab, setActiveTab] = useState(0);

	function handleTabActive(value) {
		setActiveTab(value);
	}

	function handleSearch(e) {
		setQuery(e.target.value);
		setPagenumber(1);
	}

	return (
		<div className='HomeChildContainer'>
			<div className='tableHeader Lendings'>
				<div className='TabOptions'>
					<h2
						className={activeTab == 0 && 'active'}
						onClick={() => handleTabActive(0)}
					>
						Vigentes
					</h2>
					<h2
						className={activeTab == 1 && 'active'}
						onClick={() => handleTabActive(1)}
					>
						Inactivos
					</h2>
				</div>
				<div className='SearchOptions'>
					<SelectComponent />
					<SelectComponent />
					<input
						placeholder='Buscar...'
						type='text'
						className='tableSearchBar'
						onChange={handleSearch}
					></input>
				</div>
			</div>
			<div className='tableContainer'>
				<div className={`ActiveLendingsRows ${activeTab == 0 ? 'Active' : ''}`}>
					<LendingsTableRow />
				</div>
				<div
					className={`ReturnedLendingsRows ${activeTab == 1 ? 'Active' : ''}`}
				>
					<LendingsTableRow />
				</div>
			</div>
		</div>
	);
}

export default Lendings;
