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
	const [error, SetError] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setLoading(true);
		SetError(false);
		let cancel;
		axios({
			method: `${method}`,
			url: `${import.meta.env.VITE_REACT_APP_API_BASE_URL}${queryRoute}`,
			params: { q: query, page: pageNumber },
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				console.log(res.data);
				setTableData((prevTableData) => {
					return [
						...new Set([
							...prevTableData,
							...res.data.map((b) => b[identifier]),
						]),
					];
				});
				setHasMore(res.data.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				SetError(true);
			});
		return () => cancel();
	}, [query, pageNumber]);

	return { loading, error, tableData, hasMore };
}
