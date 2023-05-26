import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config.js';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

function usePopulateTable(
	method,
	api,
	pageNumber,
	conditional,
	queryOption,
	query,
	dateFilter
) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	const { user, dispatch } = useAuthContext();
	/* useEffect(() => {
		if (!user) {
			// Si no hay usuario, no se realiza la llamada a la API
			return;
		}
	}, []); */

	/* Every time we change the searchTerm(also named variable 'query') the table is reseted to show the coincidences*/
	useEffect(() => {
		setTableData([]);
	}, [query, conditional, dateFilter, queryOption]);

	/* The logic for querying the database dinamically */
	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			headers: {
				'x-access-token': user.token,
			},
			method: `${method}`,
			url: `${API_URL}${api}`,
			params: {
				page: pageNumber,
				pageSize: 10,
				conditional: conditional,
				queryOption: queryOption,
				searchTerm: query,
				dateFilter: dateFilter,
			},
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setTableData((prevTableData) => {
					return [...new Set([...prevTableData, ...res.data])];
				});
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				if (e.response?.status == 404) {
					dispatch({ type: 'LOGOUT' });
				}
				if (axios.isCancel(e)) return;
				setLoading(false);
				setError(true);
			});
		return () => cancel();
	}, [query, pageNumber, api, method, conditional, dateFilter, queryOption]);

	return { loading, error, tableData, hasMore, setTableData };
}

export default usePopulateTable;
