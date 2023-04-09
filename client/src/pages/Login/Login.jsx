import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import DarkLightButton from '../../components/MainPage/ButtonLightDark/DarkLightButton';
import style from './Login.module.css';

function Login() {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<div className={style.Container} data-theme={theme}>
				<div className={style.Design}>
					Design Area
					<DarkLightButton></DarkLightButton>
					<div className={style.SvgContainer}>
						<object
							type='image/svg+xml'
							data='/src/assets/Line1.svg'
							width='100%'
							height='100%'
							className={style.SvgContent}
						></object>
					</div>
					<div className={style.SvgContainer}>
						<object
							type='image/svg+xml'
							data='/src/assets/Line2.svg'
							width='100%'
							height='100%'
							className={style.SvgContent}
						></object>
					</div>
					<div className={style.SvgContainer}>
						<object
							type='image/svg+xml'
							data='/src/assets/Line3.svg'
							width='100%'
							height='100%'
							className={style.SvgContent}
						></object>
					</div>
				</div>
				<div className='login'>login area</div>
			</div>
		</>
	);
}

export default Login;
