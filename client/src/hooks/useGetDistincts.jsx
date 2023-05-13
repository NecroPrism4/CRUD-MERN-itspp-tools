import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

function useGetDistincts(api, index, name) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	useEffect(() => {
		let cancel;
		axios({
			method: `get`,
			url: `${API_URL}${api}`,
			cancelToken: new axios.CancelToken((c) => (cancel = c)),
		})
			.then((res) => {
				setData(res.data);
			})
			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
				console.log(e);
			});
	}, [api]);

	const distincts = useMemo(() => {
		if (!error) {
			return data.map((item) => {
				return { value: item[index], label: item[name] };
			});
		}
	}, [data]);

	return { distincts, error };
}

export default useGetDistincts;
