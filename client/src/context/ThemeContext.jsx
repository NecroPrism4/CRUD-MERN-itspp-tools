import { createContext } from 'react';
import { useState } from 'react';

const ThemeContext = createContext();

//Get the theme from the local storage
const currentTheme = localStorage.getItem('theme')
	? localStorage.getItem('theme')
	: 'dark';

const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(currentTheme);

	const handleTheme = (e) => {
		setTheme(e.target.value === 'dark' ? 'light' : 'dark');
		document.documentElement.setAttribute('data-theme', currentTheme);
	};

	const data = { theme, handleTheme };

	return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeContextProvider };
export default ThemeContext;
