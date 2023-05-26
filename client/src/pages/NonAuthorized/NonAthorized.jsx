import './NonAthorized.css';
import { useAuthContext } from '../../hooks/useAuthContext';

function NonAthorized() {
	const { dispatch } = useAuthContext();
	const handleLogout = () => {
		console.log('logout');
		dispatch({
			type: 'LOGOUT',
		});
	};
	return (
		<div>
			<h1>NonAthorized</h1>
			<button className='RoundedRect LogOut' onClick={handleLogout}>
				Cerrar sesión
			</button>
		</div>
	);
}

export default NonAthorized;
