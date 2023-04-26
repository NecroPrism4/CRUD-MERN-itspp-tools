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
					return [
						...new Set([...prevTableData, ...res.data.map((b) => b.item_id)]),
					];
				});
				console.log(...res.data.map((b) => b.item_id));
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});
		return () => cancel();
	}, [query, pageNumber, queryRoute, method]);

	return { loading, error, tableData, hasMore };
}
