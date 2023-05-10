import './CustomDateRangePicker.css';
import 'rsuite/dist/rsuite.min.css';
import { useContext } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { CustomProvider, DateRangePicker } from 'rsuite';

function CustomDateRangePicker() {
	const { theme } = useContext(ThemeContext);
	console.log(theme);
	return (
		<>
			<CustomProvider theme={theme}>
				<DateRangePicker />
			</CustomProvider>
		</>
	);
}

export default CustomDateRangePicker;
