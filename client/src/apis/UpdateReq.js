import axios from 'axios';
import { API_URL } from '../../config';

export const UpdateReq = (api, data) => {
	axios.put(`${API_URL}${api}`, data);
};
