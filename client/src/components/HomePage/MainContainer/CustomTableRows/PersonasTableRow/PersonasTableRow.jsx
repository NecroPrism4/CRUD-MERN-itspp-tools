import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnEditButtons from '../../Buttons/OnEditButtons/OnEditButtons';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

function PersonasTableRow() {
	return (
		<div className='TableRow Expand'>
			<div className='ShowedInfo Lendings'>
				<div>
					<h4></h4>
					<h2>Hola</h2>
				</div>
			</div>

			<div className='CenterRow'>
				<div>
					<div>
						<h3>Materiales:</h3>
						<div className='ItemsList'>
							<ul>
								<li>Elemento</li>
							</ul>

							<button className='ShowMoreButton'>
								<FontAwesomeIcon icon={faCaretSquareDown} />
								<p>Ver </p>
							</button>
						</div>
					</div>
				</div>

				<div>
					<p>
						ID de prestamo: <span>Span</span>
					</p>
					<div className='LendingDate'>
						<h4>Fecha de Prestamo: </h4>
						<p>Fecha</p>
					</div>
					<div className='ReturnedDate'>
						<h4>Devuelto: </h4>
						<p>Fecha</p>
					</div>

					<div className='AuthorizedBy'>
						<h4>
							Autorizó: <span>Span de nombre</span>
						</h4>
					</div>
				</div>
			</div>

			<div className='Expandible'>
				<div>
					<h3>Notas</h3>
					<p>P remarks</p>
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

export default PersonasTableRow;
