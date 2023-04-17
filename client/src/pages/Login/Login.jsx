import { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

import './Login.css';

import RegisterUserForm from '../../components/Login/RegisterUserForm/RegisterUserForm.jsx';
import LoginUserForm from '../../components/Login/LoginUserForm/LoginUserForm.jsx';

import tecnmLogo from '../../assets/logoTecNM 1.png';
import itsppLogo from '../../assets/logo itspp.png';

function Login() {
	const { theme, handleTheme } = useContext(ThemeContext);
	const [showLogin, setShowLogin] = useState('ShowLogin');

	const handleShow = () => {
		showLogin === 'ShowLogin'
			? setShowLogin('HideLogin')
			: setShowLogin('ShowLogin');
	};

	return (
		<>
			<div className='LoginPrimaryContainer' data-theme={theme}>
				<div className={`${showLogin} LoginDesignContainer`}>
					{/* #Region LeftSide/Logo/Register */}
					<div className={`${showLogin} WaveBackgroundContainer`}>
						<svg
							className={`WaveBackground`}
							preserveAspectRatio='none'
							width='1113'
							height='2160'
							viewBox='0 0 1113 2160'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								id='WaveBackgroundPath'
								d='M0 4.99208e-06C0 4.99208e-06 1056.71 -6.24009e-06 1044.06 4.99208e-06C1037.4 1.09006e-05 943.864 285 1032.78 467C1145.87 656.5 1086.38 823.153 1051.06 1046.5C1002.81 1351.5 1151.94 1420.5 1101.5 1670C1051.06 1919.5 1015.61 1990.5 1051.06 2160H0V4.99208e-06Z'
								fill='url(#paintSvg)'
							/>
							{theme === 'dark' ? (
								<defs>
									<linearGradient
										id='paintSvg'
										x1='722.846'
										y1='579.223'
										x2='-101.04'
										y2='984.272'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#337FF6' />
										<stop offset='1' stopColor='#739BD9' />
									</linearGradient>
								</defs>
							) : (
								<defs>
									<linearGradient
										id='paintSvg'
										x1='722.846'
										y1='579.223'
										x2='-101.04'
										y2='984.272'
										gradientUnits='userSpaceOnUse'
									>
										<stop stopColor='#eeeefb' />
										<stop offset='1' stopColor='#eeeefb' />
									</linearGradient>
								</defs>
							)}
						</svg>
					</div>
					<div className={`${showLogin} RegisterContainer`}>
						<h1 className='RegisterText'>Cree una cuenta</h1>
						<RegisterUserForm btnValue='Registrar'></RegisterUserForm>
						<button className='BackButton' onClick={handleShow}>
							Volver
						</button>
					</div>
					<hr className={`${showLogin} solidBorder`}></hr>
					<div className={`${showLogin} LoginLogoContainer`}>
						<svg
							width='778'
							height='769'
							viewBox='0 0 778 769'
							preserveAspectRatio='xMidYMid meet'
							xmlns='http://www.w3.org/2000/svg'
							onClick={handleTheme}
							style={{ cursor: 'pointer' }}
						>
							<g id='LogoApp'>
								<g id='logo-lines'>
									<path
										id='line1'
										d='M177.86 452.773C171.579 436.254 153.095 427.954 136.576 434.235C120.057 440.516 111.757 458.999 118.038 475.519C124.319 492.038 142.802 500.338 159.322 494.057C175.841 487.776 184.141 469.293 177.86 452.773ZM356.557 378.41L145.816 458.538L150.081 469.754L360.822 389.627L356.557 378.41Z'
									/>
									<path
										id='line2'
										d='M613.604 77.3253C599.288 66.9618 579.282 70.1656 568.918 84.4812C558.555 98.7968 561.759 118.803 576.074 129.167C590.39 139.53 610.396 136.326 620.76 122.011C631.123 107.695 627.92 87.6888 613.604 77.3253ZM589.979 99.7276L401.976 359.424L411.697 366.461L599.699 106.764L589.979 99.7276Z'
									/>
									<path
										id='line3'
										d='M643.219 595.795C654.456 582.154 652.507 561.987 638.866 550.75C625.225 539.513 605.058 541.462 593.821 555.103C582.584 568.744 584.533 588.912 598.174 600.148C611.815 611.385 631.983 609.436 643.219 595.795ZM622.335 570.818L407.529 393.871L399.899 403.133L614.705 580.08L622.335 570.818Z'
									/>
								</g>
								<g id='Text-Logo'>
									<text
										transform='translate(91.9153 324.78)'
										fontSize='128'
										fontWeight='500'
										letterSpacing='0em'
									>
										<tspan x='0' y='87.888'>
											Gest
										</tspan>
										<tspan x='330.375' y='87.888'>
											r de{' '}
										</tspan>
										<tspan x='0' y='187.888'>
											laboratorio
										</tspan>
									</text>
									<text
										transform='translate(91.9153 324.78)'
										fontSize='128'
										fontWeight='500'
										letterSpacing='0em'
									>
										<tspan x='258.5' y='87.888'>
											o
										</tspan>
									</text>
								</g>
							</g>
						</svg>
					</div>
					{/* #Endregion LeftSide/Logo/Register */}
				</div>
				<div className={`${showLogin} LoginContainer`}>
					<h1 className='RegisterText'>¡Bienvenido!</h1>
					<LoginUserForm btnValue='Iniciar Sesión'></LoginUserForm>
					<button className='BackButton' onClick={handleShow}>
						¿No tiene cuenta?
					</button>
				</div>
			</div>
			<footer className='LoginFooter'>
				<img src={tecnmLogo}></img>
				<p className='p1'>Tecnológico Nacional de México</p>
				<hr className='solidBorder'></hr>
				<img src={itsppLogo}></img>
				<p>Instituto Tecnológico Superior de Puerto Peñasco</p>
			</footer>
		</>
	);
}

export default Login;
