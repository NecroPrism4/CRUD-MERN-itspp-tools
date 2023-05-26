import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload,
			};

		case 'LOGOUT':
			localStorage.removeItem('user');
			return {
				user: null,
			};
		default:
			return state;
	}
};

function AuthContextProvider({ children }) {
	const storedUser = JSON.parse(localStorage.getItem('user'));

	const [state, dispatch] = useReducer(authReducer, {
		user: storedUser || null,
	});

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContextProvider };
