import axios from 'axios';
import { API_URL } from '../../config.js';

const UpdateReq = async (api, data) => {
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

export default UpdateReq;

/* 	axios.put(`${API_URL}${api}`, data) */
