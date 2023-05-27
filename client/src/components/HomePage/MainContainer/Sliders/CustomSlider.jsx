import './CustomSlider.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function CustomSlider() {
	/* const [data, setData] = useState([]);
	useEffect(() => {
		const data = async () => {
			await axios({
				method: 'get',
				url: `https://api.unsplash.com/photos/random`,
				params: {
					client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY, // Reemplaza con tu propia clave de API de Unsplash
					page: 1,
					per_page: 5,
				},
			})
				.then((res) => {
					return res.data;
				})
				.catch((err) => {
					return err;
				});
		};
		setData(data);
	}, []); */

	/* 	useEffect(() => {
		console.log(data);
	}, [data]); */

	return (
		<Carousel
			autoPlay
			interval={5000}
			transitionTime={1000}
			showStatus={false}
			infiniteLoop
			showArrows={false}
			showThumbs={false}
		>
			<div className='imgDiv'>
				<img src='https://www.puertopenasco.tecnm.mx/wp-content/uploads/2022/06/codigo-de-etica-e-integridad-1-1024x330.jpg' />
			</div>
			<div className='imgDiv'>
				<img src='https://teziutlan.tecnm.mx/wp-content/uploads/SlideLibrePlastico.png' />
			</div>
			<div className='imgDiv'>
				<img src='https://lh3.googleusercontent.com/zulAw5k73oWb9r4Nz2C842VxXOKEC8UIFmH8iPI0r1H9o-CkFoqeFe5LsciqfndGvnxljPQLs8t0WjOGlIfVLeis5depYzovIj4447Vz' />
			</div>
		</Carousel>
	);
}

export default CustomSlider;
