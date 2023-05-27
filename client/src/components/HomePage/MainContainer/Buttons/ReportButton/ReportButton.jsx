import './ReportButton.css';
import { useState } from 'react';
import { read, utils } from 'xlsx';
import { useAuthContext } from '../../../../../hooks/useAuthContext';
import { GetReq } from '../../../../../apis/ApiReqests';
import { ModalAlert } from '../../../../Modals/Alerts/Alerts';

function ReportButton({ title, img, api, query }) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const { user } = useAuthContext();

	const handleGetData = async () => {
		setLoading(true);

		try {
			const response = await GetReq(api, query, user.token);

			if (response?.code == 'ERR_NETWORK') {
				ModalAlert('error', '¡No se pudo conectar!', true);
				return;
			}
			if (!response?.inventoryData) {
				ModalAlert('error', 'Hubo un error!', false);
			}
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	return (
		<button
			className={`RoundedRect ImageButton Reports ${
				loading ? '' : 'NotLoading'
			}`}
			onClick={handleGetData}
		>
			<div className='imageTextContainer Reports'>
				<img src={img} />
				<div>
					<h4>{title}</h4>
				</div>
			</div>
			<div className={`loader ${loading ? '' : 'Hide'}`}></div>
		</button>
	);
}

export default ReportButton;
