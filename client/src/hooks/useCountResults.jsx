import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config.js';

function useCountResults(api, conditional, queryOption, query) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [countData, setCountData] = useState();

	/* Every time we change the searchTerm(also named variable 'query') the table is reseted to show the coincidences*/
	useEffect(() => {
		setCountData(0);
	}, [query, conditional, queryOption]);

	/* The logic for querying the database dinamically */
	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: `get`,
			url: `${API_URL}${api}`,
			params: {
				conditional: conditional,
				queryOption: queryOption,
				searchTerm: query,
			},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setLoading(false);
				return setCountData(res.data);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setLoading(false);
				setError(true);
			});
		return () => cancel();
	}, [api, query, queryOption, conditional]);

	return { loading, error, countData };
}

export default useCountResults;
