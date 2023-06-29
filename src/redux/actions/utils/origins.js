import axios from 'axios';
import {
	GET_ALL_ORIGIN_SUCCESS,
	GET_ALL_ORIGIN_FAIL,
	GET_ORIGIN_DETAIL_SUCCESS,
	GET_ORIGIN_DETAIL_FAIL,
	POST_ORIGIN_SUCCESS,
	POST_ORIGIN_FAIL,
	PUT_ORIGIN_SUCCESS,
	PUT_ORIGIN_FAIL,
	DELETE_ORIGIN_SUCCESS,
	DELETE_ORIGIN_FAIL,
	START_QUERY,
} from '../../constants/utils/origins';
import action from '../action';



export const PostOrigin = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/origin`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_ORIGIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const origin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_ORIGIN_FAIL, origin));
			});
	};
};

export const GetOrigins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/origin`)
			.then((res) => {
				dispatch(action(GET_ALL_ORIGIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const origin = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_ORIGIN_FAIL, origin));
			});
	};
};


export const GetOrigin = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/origin/${id}`)
			.then((res) => {
				dispatch(action(GET_ORIGIN_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const origin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ORIGIN_DETAIL_FAIL, origin));
			});
	};
};



export const PutOrigin = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/origin/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_ORIGIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const origin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_ORIGIN_FAIL, origin));
			});
	};
};

export const DeleteOrigin = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/origin/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_ORIGIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const origin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_ORIGIN_FAIL, origin));
			});
	};
};
