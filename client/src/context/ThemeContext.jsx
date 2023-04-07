import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

//Get the theme from the local storage
const currentTheme = localStorage.getItem('theme')
	? localStorage.getItem('theme')
	: 'dark';

const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(currentTheme);

	const handleTheme = () => {
		const updateTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(updateTheme);
		localStorage.setItem('theme', updateTheme);
	};

	const data = {
		theme,
		handleTheme,
	};

	return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeContextProvider };
export default ThemeContext;
