import axios from 'axios';
import {
	GET_ALL_RAM_SUCCESS,
	GET_ALL_RAM_FAIL,
	GET_RAM_DETAIL_SUCCESS,
	GET_RAM_DETAIL_FAIL,
	POST_RAM_SUCCESS,
	POST_RAM_FAIL,
	PUT_RAM_SUCCESS,
	PUT_RAM_FAIL,
	DELETE_RAM_SUCCESS,
	DELETE_RAM_FAIL,
	START_QUERY,
} from '../../constants/utils/rams';
import action from '../action';



export const PostRam = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/ram`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_RAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const ram = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_RAM_FAIL, ram));
			});
	};
};

export const GetRams = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/ram`)
			.then((res) => {
				dispatch(action(GET_ALL_RAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const ram = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_RAM_FAIL, ram));
			});
	};
};


export const GetRam = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/ram/${id}`)
			.then((res) => {
				dispatch(action(GET_RAM_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const ram = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_RAM_DETAIL_FAIL, ram));
			});
	};
};



export const PutRam = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/ram/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_RAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const ram = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_RAM_FAIL, ram));
			});
	};
};

export const DeleteRam = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/ram/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_RAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const ram = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_RAM_FAIL, ram));
			});
	};
};
