import axios from 'axios';
import {
	GET_ALL_TYPESHELL_SUCCESS,
	GET_ALL_TYPESHELL_FAIL,
	GET_TYPESHELL_DETAIL_SUCCESS,
	GET_TYPESHELL_DETAIL_FAIL,
	POST_TYPESHELL_SUCCESS,
	POST_TYPESHELL_FAIL,
	PUT_TYPESHELL_SUCCESS,
	PUT_TYPESHELL_FAIL,
	DELETE_TYPESHELL_SUCCESS,
	DELETE_TYPESHELL_FAIL,
	START_QUERY,
} from '../../constants/utils/typeshells';
import action from '../action';

export const PostTypeShell = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/typeshell`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_TYPESHELL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typeshell = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_TYPESHELL_FAIL, typeshell));
			});
	};
};

export const GetTypeShells = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/typeshell`)
			.then((res) => {
				dispatch(action(GET_ALL_TYPESHELL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typeshell = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_TYPESHELL_FAIL, typeshell));
			});
	};
};


export const GetTypeShell = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/typeshell/${id}`)
			.then((res) => {
				dispatch(action(GET_TYPESHELL_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typeshell = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_TYPESHELL_DETAIL_FAIL, typeshell));
			});
	};
};



export const PutTypeShell = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/typeshell/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_TYPESHELL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typeshell = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_TYPESHELL_FAIL, typeshell));
			});
	};
};

export const DeleteTypeShell = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/typeshell/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_TYPESHELL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typeshell = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_TYPESHELL_FAIL, typeshell));
			});
	};
};
