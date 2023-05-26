import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

function PrivateRoute({ element: Element, elementName }) {
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, [user]);
	// Si isLoading es true, muestra un indicador de carga o un mensaje de espera
	if (isLoading) {
		return '';
	}

	const validUser =
		user && (user.user_type == 'admin' || user.user_type == 'normal');

	/* console.log(validUser);
	console.log(elementName); */

	if (elementName == 'Home' && !user) {
		console.log('if 1');
		return <Navigate to='/login' replace />;
	}
	if (elementName == 'Home' && user && !validUser) {
		console.log('if 2');
		return <Navigate to='/nonAuthorized' replace />;
	}
	if (elementName == 'NonAuth' && !user) {
		console.log('if 2');
		return <Navigate to='/login' replace />;
	}
	if (elementName == 'NonAuth' && validUser) {
		console.log('if 3');
		return <Navigate to='/home' replace />;
	}
	if (elementName == 'NonAuth' && !user) {
		console.log('if 4');
		return <Navigate to='/login' replace />;
	}
	if (elementName == 'Login' && user && !validUser) {
		console.log('if 5');
		return <Navigate to='/nonAuthorized' replace />;
	}
	if (elementName == 'Login' && user && validUser) {
		console.log('if 6');
		return <Navigate to='/home' replace />;
	}
	return <Element />;
}

export default PrivateRoute;
