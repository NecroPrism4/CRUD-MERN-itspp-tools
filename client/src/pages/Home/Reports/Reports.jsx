import './Reports.css';
import { useEffect, useContext } from 'react';
import { SectionContext } from '../../../context/SectionContext';

import ReportButton from '../../../components/HomePage/MainContainer/Buttons/ReportButton/ReportButton';

function Reports() {
	const { handleTitle } = useContext(SectionContext);

	useEffect(() => {
		handleTitle('Reportes');
	}, []);

	return (
		<div className='HomeChildContainer Reports'>
			<h2>Reportes de laboratorio</h2>
			<div className='ReportSection'>
				<ReportButton
					title='Laboratorio de Computo'
					img={
						'https://sergiomadrigal.com/wp-content/uploads/2013/10/blog_lab1.jpg'
					}
				/>
				<ReportButton
					title='Laboratorio de Redes'
					img={
						'https://observatorio.tec.mx/wp-content/uploads/2019/01/computer-labs.jpg'
					}
				/>
				<ReportButton
					title='Laboratorio de Civil'
					img={
						'https://www.comercializadorags.com/wp-content/uploads/2013/02/laboratorio-ingenieria-civil.jpg'
					}
				/>
				<ReportButton
					title='Laboratorio de Industrial'
					img={
						'https://laboratorios.iteso.mx/wp-content/uploads/sites/3/2021/02/2wPTI_Manufacturaylogi%CC%81stica_OK_980x655.jpg'
					}
				/>
				<ReportButton
					title='Laboratorio de Turismo'
					img={
						'http://4.bp.blogspot.com/-WKNPRHBLaNw/UJqdX-ZFjtI/AAAAAAAAAnA/5DRYo4fkrlo/s1600/S1670005.JPG'
					}
				/>
			</div>
		</div>
	);
}

export default Reports;
