import axios from 'axios';
import { API_URL } from '../../config.js';

export const UpdateReq = async (api, data, token) => {
	return await axios({
		headers: {
			'x-access-token': token,
		},
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
