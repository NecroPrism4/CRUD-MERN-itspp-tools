import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import DarkLightButton from '../components/MainPage/ButtonLightDark/DarkLightButton.jsx';

function Home() {
	const { theme } = useContext(ThemeContext);
	return (
		<div data-theme={theme}>
			Home
			<DarkLightButton></DarkLightButton>
		</div>
	);
}

export default Home;
