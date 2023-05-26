import { useState } from 'react';
import { useAuthContext } from '../useAuthContext';
import axios from 'axios';
import { API_URL } from '../../../config';

function useSignup() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const { dispatch } = useAuthContext();

	const signup = async (data) => {
		setIsLoading(true);
		setError(false);
		try {
			const response = await axios({
				method: 'post',
				url: `${API_URL}/api/auth/signup`,
				data: data,
			});
			console.log(response);
			if (!response.status != 200) {
				setIsLoading(false);
				setError(true);
			}
			if (response.status == 200) {
				setIsLoading(false);
				setError(false);
				localStorage.setItem('user', JSON.stringify(response.data));
				console.log(localStorage.getItem('user'));
				dispatch({ type: 'LOGIN', payload: response.data });
			}
			return response;
		} catch (err) {
			setError(err);
			console.error(err);
		}
	};

	return { signup, error, isLoading };
}

export default useSignup;
