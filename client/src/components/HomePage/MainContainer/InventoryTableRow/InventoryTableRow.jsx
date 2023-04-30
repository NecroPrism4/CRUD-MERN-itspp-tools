import './InventoryTableRow.css';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import OnEditButtons from '../OnEditButtons/OnEditButtons';

function InventoryTableRow({ data }) {
	return (
		<div className='TableRow'>
			<div className='ShowedInfo'>
				<div>
					<h4>ID: {data.item_id}</h4>
					<h3 contentEditable={false}>{data.item_type}</h3>
				</div>
				<div className='BrandModel'>
					<div>
						<h4>Marca: </h4>
						<p>{data.item_brand}</p>
					</div>
					<div>
						<h4>Modelo: </h4>
						<p>{data.item_model}</p>
					</div>
				</div>
				<h3 style={{ color: data.item_available ? '#00c69f' : '#e56552' }}>
					{data.item_available ? 'Disponible' : 'No Disponible'}
				</h3>
			</div>

			<div className='Expandible'>
				<div>
					<h3>Notas</h3>
					<p>Estas son algunas notas del utensilio</p>
				</div>
				<div>
					<h3>Descripción</h3>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla,
						cumque.
					</p>
				</div>
				<OnEditButtons></OnEditButtons>
			</div>
		</div>
	);
}

export default InventoryTableRow;
