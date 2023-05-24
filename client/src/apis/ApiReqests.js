import axios from 'axios';
import { API_URL } from '../../config.js';

export const UpdateReq = async (api, data) => {
	return await axios({
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
	console.log(api);
	console.log(API_URL);
	return axios({
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
