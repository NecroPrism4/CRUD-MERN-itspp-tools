import axios from 'axios';
export function GetById(api, id) {
	let cancel;
	return axios({
		method: 'get',
		url: `http://${window.location.hostname}:3000${api}`,
		params: {
			Id: id,
		},
		cancelToken: new axios.CancelToken((e) => (cancel = e)),
	})
		.then((res) => {
			return console.log(res.data);
		})
		.catch((e) => {
			if (axios.isCancel(e)) return;
		});
}
