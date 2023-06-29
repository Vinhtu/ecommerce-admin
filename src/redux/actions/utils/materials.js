import axios from 'axios';
import {
	GET_ALL_MATERIAL_SUCCESS,
	GET_ALL_MATERIAL_FAIL,
	GET_MATERIAL_DETAIL_SUCCESS,
	GET_MATERIAL_DETAIL_FAIL,
	POST_MATERIAL_SUCCESS,
	POST_MATERIAL_FAIL,
	PUT_MATERIAL_SUCCESS,
	PUT_MATERIAL_FAIL,
	DELETE_MATERIAL_SUCCESS,
	DELETE_MATERIAL_FAIL,
	START_QUERY,
} from '../../constants/utils/materials';
import action from '../action';


export const PostMaterial = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/material`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_MATERIAL_SUCCESS, res.data));
			})
			.catch((err) => {
				const material = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_MATERIAL_FAIL, material));
			});
	};
};

export const GetMaterials = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/material`)
			.then((res) => {
				dispatch(action(GET_ALL_MATERIAL_SUCCESS, res.data));
			})
			.catch((err) => {
				const material = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_MATERIAL_FAIL, material));
			});
	};
};

export const GetMaterial = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/material/${id}`)
			.then((res) => {
				dispatch(action(GET_MATERIAL_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const material = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_MATERIAL_DETAIL_FAIL, material));
			});
	};
};

export const PutMaterial = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/material/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_MATERIAL_SUCCESS, res.data));
			})
			.catch((err) => {
				const material = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_MATERIAL_FAIL, material));
			});
	};
};

export const DeleteMaterial = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));
		axios
			.delete(`http://localhost:8080/api/material/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_MATERIAL_SUCCESS, res.data));
			})
			.catch((err) => {
				const material = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_MATERIAL_FAIL, material));
			});
	};
};
