import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePopulateTable(
	query,
	identifier,
	queryRoute,
	method,
	pageNumber
) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	/* Every time we change the searchTerm(also named variable 'query') the table is reseted to show the coincidences*/
	useEffect(() => {
		setTableData([]);
	}, [query]);

	/* The logic for querying the database dinamically */

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: `${method}`,
			url: `${import.meta.env.VITE_REACT_APP_API_BASE_URL}${queryRoute}`,
			params: {
				page: pageNumber,
				pageSize: 10,
				searchTerm: query,
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
				if (axios.isCancel(e)) return;
				setLoading(false);
				setError(true);
			});
		return () => cancel();
	}, [query, pageNumber, queryRoute, method]);

	return { loading, error, tableData, hasMore };
}
