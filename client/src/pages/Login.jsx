import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import DarkLightButton from '../components/MainPage/ButtonLightDark/DarkLightButton';

function Login() {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<div className='container' data-theme={theme}>
				<div className='design'>
					Design Area
					<DarkLightButton></DarkLightButton>
					<div className='svg-container'>
						<object
							type='image/svg+xml'
							data='/src/assets/Line1.svg'
							width='100%'
							height='100%'
							className='svg-content'
						></object>
					</div>
					<div className='svg-container'>
						<object
							type='image/svg+xml'
							data='/src/assets/Line2.svg'
							width='100%'
							height='100%'
							className='svg-content'
						></object>
					</div>
					<div className='svg-container'>
						<object
							type='image/svg+xml'
							data='/src/assets/Line3.svg'
							width='100%'
							height='100%'
							className='svg-content'
						></object>
					</div>
				</div>
				<div className='login'>login area</div>
			</div>
		</>
	);
}

export default Login;
