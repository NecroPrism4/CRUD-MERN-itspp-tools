import { useRouteError } from 'react-router-dom';

const NotFound = () => {
	const error = useRouteError();
	console.log(error);
	return <div>You've landed on a wrong planet: 404</div>;
};

export default NotFound;
