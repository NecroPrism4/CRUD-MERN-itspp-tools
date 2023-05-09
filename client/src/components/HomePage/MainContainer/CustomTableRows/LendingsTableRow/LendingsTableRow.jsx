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
		//console.log(rowData.items[0] != undefined ? rowData.items.length : '');
		console.log(rowData.items.length);
	}, [rowData]);

	return (
		<div className='TableRow Expand'>
			<div className='ShowedInfo Lendings'>
				<div>
					<h4>{borrowRelativeDate}</h4>
					<h2>{`${rowData.borrower.borrower_name} ${rowData.borrower.borrower_lastname}`}</h2>
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
					<div>
						<h3>Materiales:</h3>
						<div className='ItemsList'>
							<ul className={showMore ? 'ShowMore' : ''}>
								{rowData.items.map((items) => {
									return (
										<li key={items.items.item_id}>{items.items.item_type}</li>
									);
								})}
							</ul>
							{rowData.items.length > 4 && (
								<button
									className='ShowMoreButton'
									onClick={() => {
										handleShowMore();
									}}
								>
									<FontAwesomeIcon icon={showMore ? faCaretUp : faCaretDown} />
									<p>Ver {showMore ? 'menos' : 'más'}</p>
								</button>
							)}
						</div>
					</div>
				</div>

				<div>
					<p>
						ID de prestamo: <span>{rowData.lending_id}</span>
					</p>
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
							Autorizó:{' '}
							<span>{`${rowData.user.user_name} ${rowData.user.user_lastname} (${rowData.user.user_jobposition})`}</span>
						</h4>
					</div>
				</div>
			</div>

			<div className='Expandible'>
				<div>
					<h3>Notas</h3>
					<p>{rowData.lending_remarks}</p>
				</div>
				<div className='InteractiveButtons Lendings'>
					<OnEditButtons></OnEditButtons>
					<div className='EditButtons Lendings'>
						{rowData.returned ? null : <button>Confirmar Devolución</button>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LendingsTableRow;
