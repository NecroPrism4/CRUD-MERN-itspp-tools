import { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import localeConfig from '../../date-fns.locale.js';

function useDateFormater(ISODate) {
	const [relativeDate, setRelativeDate] = useState('');
	const [formatedDate, setFormatedDate] = useState('');

	useEffect(() => {
		if (ISODate) {
			setRelativeDate(
				formatDistanceToNow(parseISO(ISODate), {
					addSuffix: true,
					...localeConfig,
				})
			);
			setFormatedDate(
				format(parseISO(ISODate), "d 'de' MMMM 'del' yyyy, hh:mm a", {
					...localeConfig,
				})
			);
		}
	}, [ISODate]);
	return { relativeDate, formatedDate };
}

export default useDateFormater;
