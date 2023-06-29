import axios from 'axios';
import {
	GET_ALL_OPERATINGSYSTEM_SUCCESS,
	GET_ALL_OPERATINGSYSTEM_FAIL,
	GET_OPERATINGSYSTEM_DETAIL_SUCCESS,
	GET_OPERATINGSYSTEM_DETAIL_FAIL,
	POST_OPERATINGSYSTEM_SUCCESS,
	POST_OPERATINGSYSTEM_FAIL,
	PUT_OPERATINGSYSTEM_SUCCESS,
	PUT_OPERATINGSYSTEM_FAIL,
	DELETE_OPERATINGSYSTEM_SUCCESS,
	DELETE_OPERATINGSYSTEM_FAIL,
	START_QUERY,
} from '../../constants/utils/operatingsystems';
import action from '../action';



export const PostOperatingSystem = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/operatingsystem`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_OPERATINGSYSTEM_SUCCESS, res.data));
			})
			.catch((err) => {
				const operatingsystem = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_OPERATINGSYSTEM_FAIL, operatingsystem));
			});
	};
};

export const GetOperatingSystems = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/operatingsystem`)
			.then((res) => {
				dispatch(action(GET_ALL_OPERATINGSYSTEM_SUCCESS, res.data));
			})
			.catch((err) => {
				const operatingsystem = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_OPERATINGSYSTEM_FAIL, operatingsystem));
			});
	};
};


export const GetOperatingSystem = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/operatingsystem/${id}`)
			.then((res) => {
				dispatch(action(GET_OPERATINGSYSTEM_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const operatingsystem = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_OPERATINGSYSTEM_DETAIL_FAIL, operatingsystem));
			});
	};
};



export const PutOperatingSystem = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/operatingsystem/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_OPERATINGSYSTEM_SUCCESS, res.data));
			})
			.catch((err) => {
				const operatingsystem = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_OPERATINGSYSTEM_FAIL, operatingsystem));
			});
	};
};

export const DeleteOperatingSystem = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/operatingsystem/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_OPERATINGSYSTEM_SUCCESS, res.data));
			})
			.catch((err) => {
				const operatingsystem = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_OPERATINGSYSTEM_FAIL, operatingsystem));
			});
	};
};
