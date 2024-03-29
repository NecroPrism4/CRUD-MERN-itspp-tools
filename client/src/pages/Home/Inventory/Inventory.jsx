import './Inventory.css';
import usePopulateTable from '../../../hooks/usePopulateTable.jsx';
import useInfinitScrolling from '../../../hooks/useInfiniteScrolling.jsx';
import { SectionContext } from '../../../context/SectionContext';
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { CreateReq } from '../../../apis/ApiReqests';
import { handleRegisterToBitacora } from '../../../apis/RecordToBitacora';

import {
	ItemForm,
	ItemFields,
} from '../../../components/Modals/FormDialogs/HtmlForms/ItemHtml';
import { ModalAlert } from '../../../components/Modals/Alerts/Alerts';
import { ItemFormDialog } from '../../../components/Modals/FormDialogs/ItemFormDialog';
import Error from '../../../components/HomePage/MainContainer/Error/Error';
import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';
import InventoryTableRow from '../../../components/HomePage/MainContainer/CustomTableRows/InventoryTableRow/InventoryTableRow.jsx';
import SelectComponent from '../../../components/HomePage/MainContainer/Select/SelectComponent';
import SearchBar from '../../../components/HomePage/MainContainer/SearchBar/SearchBar';
import OnCreateButton from '../../../components/HomePage/MainContainer/Buttons/OnCreateButton/OnCreateButton';

function Inventory() {
	//Maneja el título de la barra de navegación superior
	//Handles the title for the upper navbar
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Inventario');
		setPageNumber(1);
	}, []);

	//Variables que utiliza el hook personalizado que se encarga de pupular la tableview
	//Varibles used by the personalized hook that is in charge of pupulating the tableview
	const [pageNumber, setPageNumber] = useState(1);
	const [isAvailable, setIsAvailable] = useState('');
	const [queryOption, setQueryOption] = useState('item_type');
	const [query, setQuery] = useState('');
	const [selectedItems, setSelectedItems] = useState([]);
	const [showSelected, setShowSelected] = useState(false);
	const [hideComponente, setHideComponente] = useState(false);

	const { user } = useAuthContext();

	//Se encarga de las solicitudes http al servidor para completar la tabla
	//Takes care of the http requests to the server to pupulate the table
	const { loading, error, tableData, hasMore } = usePopulateTable(
		'get',
		'/api/inventory/get',
		pageNumber,
		isAvailable,
		queryOption,
		query
	);

	//se ocupa del último elemento representado en la lista, por lo que una vez que choca con la parte visible del navegador, envía una señal para enviar otra solicitud al servidor
	//Takes care of the las element rendered on the list so once it collides with the viewable part of the browser sends a signal to send another request to the server
	const lastElementRef = useInfinitScrolling(loading, hasMore, setPageNumber);

	//Maneja las funciones de busqueda
	//Handles search when te user types into the input component
	const handleSearch = (e) => {
		setQuery(e.target.value);
		setPageNumber(1);
	};

	//Maneja la opción de búsqueda (por ejemplo: buscar por ID, por nombre del prestatario, etc.)
	//Handles the search option (for example: search by ID, by BorrowerName, etc)
	const handleQueryOption = (field, value) => {
		setQueryOption(value);
		setPageNumber(1);
	};

	//Maneja los materiales disponibles y no disponibles, para que el usuario pueda elegir qué lista quiere ver
	//Handles the available and non-available items, so the user can choose which list wants to see
	const handleAvailability = (field, value) => {
		setIsAvailable(value);
		setPageNumber(1);
	};

	//Maneja la creación de un nuevo material
	//Handles the creation of a new item
	const handleCreate = async () => {
		try {
			const element = await ItemFormDialog(
				'Nuevo Material',
				ItemForm,
				ItemFields
			);
			const resData = await CreateReq(
				'/api/inventory/createItem',
				element,
				user.token
			);
			if (
				resData?.code == 'ERR_NETWORK' ||
				resData?.code == 'ERR_BAD_REQUEST'
			) {
				ModalAlert('error', '¡No se pudo conectar!', true);
				return;
			}
			if (resData && resData.code !== 'ERR_BAD_RESPONSE') {
				ModalAlert('success', '¡Guardado!', true);
				await handleRegisterToBitacora(
					'/api/bitacora/create',
					{
						history_type: 'Creación',
						history_description: 'Nuevo elemento: ' + resData.item_type,
						user_id: user.user_id,
					},
					user.token
				);
			} else {
				ModalAlert('error', '¡No se pudo guardar!', true);
			}
		} catch (err) {
			alert('Error');
		}
	};

	//Maneja la selección de los materiales
	//Handles the selection of the items
	const handleSelectedItem = (e, value) => {
		if (e.target.checked) {
			setSelectedItems((prev) => [...prev, value]);
		} else {
			setSelectedItems((prev) => {
				if (prev.length === 1) {
					setShowSelected(false);
				}
				return prev.filter((item) => item !== value);
			});
		}
	};

	//Arreglos de opciones que alimenta al componente de selección #SelectComponent
	//Arrays of options that feed the #SelectComponent
	const queryOptions = [
		{ value: 'item_type', label: 'Nombre' },
		{ value: 'item_brand', label: 'Marca' },
		{ value: 'item_model', label: 'Modelo' },
		{ value: 'item_description', label: 'Descripción' },
		{ value: 'item_remarks', label: 'Notas' },
	];
	const availabityOptions = [
		{ value: '', label: 'Todos' },
		{ value: 'true', label: 'Disponibles' },
		{ value: 'false', label: 'No Disponibles' },
	];

	return (
		!hideComponente && (
			<div className='HomeChildContainer'>
				<div className='ChildMaster'>
					<div className='tableHeader SearchOptions'>
						<h2>Materiales</h2>
						<div className='SearchSelects'>
							{selectedItems.length > 0 && (
								<button
									className={`RoundedRect LookSelected ${
										showSelected ? 'Active' : ''
									}`}
									onClick={() => {
										setShowSelected(!showSelected);
									}}
								>
									Ver seleccionados
								</button>
							)}
							<p>Buscar por</p>
							<SelectComponent
								options={availabityOptions}
								handler={handleAvailability}
							/>
							<SelectComponent
								options={queryOptions}
								handler={handleQueryOption}
							/>
							<SearchBar
								handler={handleSearch}
								validInput={true}
								visible={true}
							/>
						</div>
					</div>

					<div className='TableScroll'>
						<div
							className={`tableContainer ShowTableAnim ${
								tableData.length > 0 ? 'Active' : ''
							}`}
						>
							{!showSelected &&
								tableData.map((object) => {
									if (tableData.length === tableData.lastIndexOf(object) + 1) {
										return (
											<div key={object.item_id} ref={lastElementRef}>
												<InventoryTableRow
													data={object}
													handleSelected={handleSelectedItem}
													selectedItems={selectedItems}
												/>
											</div>
										);
									} else {
										return (
											<InventoryTableRow
												key={object.item_id}
												data={object}
												handleSelected={handleSelectedItem}
												selectedItems={selectedItems}
											/>
										);
									}
								})}

							{showSelected &&
								tableData
									.filter((object) => selectedItems.includes(object.item_id))
									.map((object) => (
										<InventoryTableRow
											key={object.item_id}
											data={object}
											handleSelected={handleSelectedItem}
											selectedItems={selectedItems}
										/>
									))}

							<div>{loading && <Loading />}</div>
							<div>{error && <Error />}</div>
							<div>
								{!loading && !error && tableData.length < 1 && (
									<Error noResults={tableData.length < 1} />
								)}
							</div>
						</div>
					</div>
					<div style={{ height: '100px' }}></div>
				</div>
				{selectedItems.length > 0 && (
					<button
						className='OnCreateButton LendButton' /* onClick={handleLendItems} */
					>
						<Link to={`../personas/${selectedItems}`}>Prestar Materiales</Link>
					</button>
				)}
				{!error && user.user_type == 'normal' && (
					<OnCreateButton handler={handleCreate} />
				)}
			</div>
		)
	);
}

export default Inventory;
