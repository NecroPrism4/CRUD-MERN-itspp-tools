import { useContext, useState } from 'react';

function Login() {
	const [showRegisterForm, setShowRegisterForm] = useState(false);

	const handleRegisterClick = () => {
		setShowRegisterForm(true);
	};

	const handleBackClick = () => {
		setShowRegisterForm(false);
	};

	return (
		<>
			<div className='container'>
				<div className='design'>
					Design Area
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
