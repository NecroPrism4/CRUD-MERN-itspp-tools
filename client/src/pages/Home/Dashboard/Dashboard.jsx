import './Dashboard.css';
import { useEffect, useContext } from 'react';
import { SectionContext } from '../../../context/SectionContext';

import Loading from '../../../components/HomePage/MainContainer/Loading/Loading.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMoon,
	faSun,
	faHandHoldingHand,
} from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
	const { handleTitle } = useContext(SectionContext);
	useEffect(() => {
		handleTitle('Bienvenid@');
	}, []);

	return (
		<div className='HomeChildContainer Dashboard'>
			<div className='DashboardContainer'>
				<div className='ActionsContainer'>
					<div className=''>
						<button className='RoundedRect ImageButton'>
							<div>
								<FontAwesomeIcon
									className='Icon'
									icon={faHandHoldingHand}
								></FontAwesomeIcon>
								<img src='https://www.gob.mx/cms/uploads/article/main_image/104190/imagenes-07.jpg' />
								<div>
									<h4>Registrar Prestamo</h4>
								</div>
							</div>
						</button>
						<button className='RoundedRect ImageButton'>
							<div>
								<img src='https://www.gob.mx/cms/uploads/article/main_image/104190/imagenes-07.jpg' />
								<div>
									<h4>Devolución de prestamo</h4>
								</div>
							</div>
						</button>
					</div>
					<div></div>
				</div>

				<Loading></Loading>
			</div>
		</div>
	);
}

export default Dashboard;
