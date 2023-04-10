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
					<div className='LoginLogoContainer'>
						<svg
							width='629'
							height='537'
							viewBox='0 0 629 537'
							xmlns='http://www.w3.org/2000/svg'
						>
							<g id='LogoApp '>
								<g id='logo-lines'>
									<path
										id='line1'
										d='M80.5708 354.437C75.3479 337.554 57.4269 328.101 40.5432 333.324C23.6594 338.547 14.2065 356.468 19.4294 373.351C24.6523 390.235 42.5733 399.688 59.457 394.465C76.3408 389.242 85.7937 371.321 80.5708 354.437ZM263.616 291.532L48.2269 358.162L51.7733 369.626L267.162 302.996L263.616 291.532Z'
									/>
									<path
										id='line2'
										d='M539.202 7.31885C525.571 -3.92989 505.402 -1.99867 494.154 11.6324C482.905 25.2634 484.836 45.4324 498.467 56.6811C512.098 67.9299 532.267 65.9987 543.516 52.3676C554.765 38.7366 552.834 18.5676 539.202 7.31885ZM514.207 28.1811L310.146 275.459L319.401 283.097L523.463 35.8189L514.207 28.1811Z'
									/>
									<path
										id='line3'
										d='M535.946 526.624C548.024 513.721 547.355 493.471 534.452 481.394C521.55 469.316 501.3 469.985 489.222 482.887C477.145 495.79 477.813 516.04 490.716 528.117C503.618 540.195 523.869 539.526 535.946 526.624ZM516.684 500.375L313.507 310.188L305.307 318.949L508.484 509.136L516.684 500.375Z'
									/>
								</g>
								<g id='Text-Logo'>
									<text fontSize='128' fontWeight='500' letterSpacing='0em'>
										<tspan x='0' y='321.888'>
											Gest
										</tspan>
										<tspan x='330.375' y='321.888'>
											r de{' '}
										</tspan>
										<tspan x='0' y='421.888'>
											laboratorio
										</tspan>
									</text>
									<text
										id='o'
										fontSize='128'
										fontWeight='500'
										letterSpacing='0em'
									>
										<tspan x='258.5' y='321.888'>
											o
										</tspan>
									</text>
								</g>
							</g>
						</svg>
					</div>
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
