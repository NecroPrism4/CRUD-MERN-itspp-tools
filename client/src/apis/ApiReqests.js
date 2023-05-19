import axios from 'axios';
import { API_URL } from '../../config.js';

export const UpdateReq = async (api, data) => {
	return axios({
		method: 'put',
		url: `${API_URL}${api}`,
		params: data,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
};

export const CreateReq = async (api, data) => {
	console.log(data);
	return axios
		.post({
			method: 'post',
			url: `${API_URL}${api}`,
			params: data,
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
};
