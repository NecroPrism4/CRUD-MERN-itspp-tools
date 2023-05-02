import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGetById(method, api, id, isEditing) {
	const [loadingItem, setLoadingItem] = useState(false);
	const [error, setError] = useState(false);
	const [objectData, setObjectData] = useState({});

	axios({
		method: method,
		url: `http://${window.location.hostname}:3000${api}`,
		params: {
			id: id,
		},
		cancelToken: new axios.CancelToken((e) => (cancel = e)),
	})
		.then((res) => {
			console.log(res.data);
			setObjectData(res.data);
		})
		.catch((e) => {
			if (axios.isCancel(e)) return;
			setLoadingItem(false);
			setError(true);
		});

	return { loadingItem, error, objectData };
}
