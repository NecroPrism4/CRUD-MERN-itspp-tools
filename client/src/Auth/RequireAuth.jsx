import React from 'react';

function RequireAuth(props) {
	var auth = 'useAuth()';
	var location = 'useLocation()';

	if (!auth.user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return props.children;
}

export default RequireAuth;
