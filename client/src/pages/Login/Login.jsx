import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import DarkLightButton from '../../components/MainPage/ButtonLightDark/DarkLightButton';
import './Login.css';

function Login() {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<div className='LoginPrimaryContainer' data-theme={theme}>
				<div className='LoginDesignContainer'>
					Design Area
					<div className='LoginLogoContainer'>
						<div className='SvgContainer'>
							<object width='100%' height='100%' className='SvgContent'>
								<svg
									className='LoginLine1'
									width='251'
									height='105'
									viewBox='0 0 251 105'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M63.5708 63.4374C58.3479 46.5537 40.4269 37.1007 23.5432 42.3237C6.65944 47.5466 -2.79351 65.4676 2.42942 82.3513C7.65234 99.235 25.5733 108.688 42.457 103.465C59.3408 98.2421 68.7937 80.3211 63.5708 63.4374ZM246.616 0.532433L31.2269 67.1623L34.7733 78.6263L250.162 11.9964L246.616 0.532433Z' />
								</svg>
							</object>
						</div>
						<div className='SvgContainer'>
							<object width='100%' height='100%' className='SvgContent'>
								<svg
									width='241'
									height='284'
									viewBox='0 0 241 284'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										className='LoginLine2'
										d='M229.203 7.31885C215.572 -3.92989 195.403 -1.99867 184.154 11.6324C172.905 25.2634 174.836 45.4324 188.467 56.6811C202.098 67.9299 222.267 65.9987 233.516 52.3676C244.765 38.7366 242.834 18.5676 229.203 7.31885ZM204.207 28.1811L0.146059 275.459L9.40149 283.097L213.463 35.8189L204.207 28.1811Z'
									/>
								</svg>
							</object>
						</div>
						<div className='SvgContainer'>
							<object width='100%' height='100%' className='SvgContent'>
								<svg
									width='240'
									height='227'
									viewBox='0 0 240 227'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										className='LoginLine3'
										d='M230.946 216.624C243.024 203.721 242.355 183.471 229.452 171.394C216.55 159.316 196.3 159.985 184.222 172.887C172.145 185.79 172.814 206.04 185.716 218.117C198.618 230.195 218.869 229.526 230.946 216.624ZM211.685 190.375L8.50731 0.188082L0.306714 8.9488L203.484 199.136L211.685 190.375Z'
									/>
								</svg>
							</object>
						</div>
					</div>
					<h1 className='AppTitle'>
						Gest<mark>o</mark>r de laboratorio
					</h1>
				</div>
				<div className='LoginContainer'>
					login area
					<DarkLightButton></DarkLightButton>
				</div>
			</div>
		</>
	);
}

export default Login;
