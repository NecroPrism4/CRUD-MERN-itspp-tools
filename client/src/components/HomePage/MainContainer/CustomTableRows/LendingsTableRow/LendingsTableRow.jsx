import './LendingsTableRow.css';
import { useEffect, useState } from 'react';
import useDateFormater from '../../../../../hooks/useDateFormater';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons.jsx';

function LendingsTableRow({ data }) {
	//Guarda los estados de las variables representadas en los componentes
	//Saves the states for the variables rendered i the components
	const [showMore, setShowMore] = useState(false);
	const [rowData, setRowData] = useState(data);

	//Se encarga de que las fechas de la base de datos sean más comprensibles para los humanos
	//Takes care of making the dates from the database more comprehensible for humans
	const { relativeDate: borrowRelativeDate, formatedDate: borrowFormatedDate } =
		useDateFormater(rowData.lending_borrowdate);

	//Igual que el anterior pero esto es para la fecha de devolución del préstamo
	//Same as the above one but this is for the return date of the lending
	const {
		relativeDate: returnedRelativeDate,
		formatedDate: returnedFormatedDate,
	} = useDateFormater(rowData.lending_returneddate);

	//Maneja mostrar más elementos de los artículos en el préstamo
	//Handles showmore elements of the items in the lending
	function handleShowMore() {
		setShowMore(!showMore);
	}

	useEffect(() => {
		//console.log(rowData);
	}, [rowData]);

	return (
		<div className='TableRow Expand'>
			<div className='ShowedInfo Lendings'>
				<div>
					<h4>{borrowRelativeDate}</h4>
					<h2>Darien Alejandro Verdugo Reyna</h2>
				</div>
				<div
					className='ReturnedIndicator'
					style={
						rowData.returned
							? { background: 'var(--gradient-accent)' }
							: { background: 'var(--secundary-bg)' }
					}
				>
					<h3>{rowData.returned ? 'Devuelto' : 'Pendiente'}</h3>
				</div>
			</div>

			<div className='CenterRow'>
				<div>
					<h3>Materiales:</h3>
					<div className='ItemsList'>
						<ul className={showMore ? 'ShowMore' : ''}>
							{rowData.items.map((items) => {
								return console.log(items);
							})}
						</ul>
						<button
							className='ShowMoreButton'
							onClick={() => {
								handleShowMore();
							}}
						>
							<FontAwesomeIcon icon={showMore ? faCaretUp : faCaretDown} />
							<p>Ver {showMore ? 'menos' : 'más'}</p>
						</button>
					</div>
				</div>
				<div>
					<div className='LendingDate'>
						<h4>Fecha de Prestamo: </h4>
						<p>{borrowFormatedDate}</p>
					</div>
					<div className='ReturnedDate'>
						<h4>Devuelto: </h4>
						<p>{returnedFormatedDate}</p>
					</div>

					<div className='AuthorizedBy'>
						<h4>
							Autorizó: <span>Jorge Perez (laboratorista)</span>
						</h4>
					</div>
				</div>
			</div>

			<div className='Expandible'>
				<div>
					<h3>Notas</h3>
					<p>Estas son algunas notas</p>
				</div>
				<div className='InteractiveButtons Lendings'>
					<OnEditButtons></OnEditButtons>
					<div className='EditButtons Lendings'>
						<button>Confirmar Devolución</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LendingsTableRow;
