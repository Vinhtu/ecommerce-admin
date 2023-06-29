import axios from 'axios';
import {
	GET_ALL_STORAGECAPACITY_SUCCESS,
	GET_ALL_STORAGECAPACITY_FAIL,
	GET_STORAGECAPACITY_DETAIL_SUCCESS,
	GET_STORAGECAPACITY_DETAIL_FAIL,
	POST_STORAGECAPACITY_SUCCESS,
	POST_STORAGECAPACITY_FAIL,
	PUT_STORAGECAPACITY_SUCCESS,
	PUT_STORAGECAPACITY_FAIL,
	DELETE_STORAGECAPACITY_SUCCESS,
	DELETE_STORAGECAPACITY_FAIL,
	START_QUERY,
} from '../../constants/utils/storagecapacitys';
import action from '../action';

export const PostStorageCapacity = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/storagecapacity`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_STORAGECAPACITY_SUCCESS, res.data));
			})
			.catch((err) => {
				const storagecapacity = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_STORAGECAPACITY_FAIL, storagecapacity));
			});
	};
};

export const GetStorageCapacitys = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/storagecapacity`)
			.then((res) => {
				dispatch(action(GET_ALL_STORAGECAPACITY_SUCCESS, res.data));
			})
			.catch((err) => {
				const storagecapacity = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_STORAGECAPACITY_FAIL, storagecapacity));
			});
	};
};

export const GetStorageCapacity = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/storagecapacity/${id}`)
			.then((res) => {
				dispatch(action(GET_STORAGECAPACITY_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const storagecapacity = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_STORAGECAPACITY_DETAIL_FAIL, storagecapacity));
			});
	};
};

export const PutStorageCapacity = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/storagecapacity/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_STORAGECAPACITY_SUCCESS, res.data));
			})
			.catch((err) => {
				const storagecapacity = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_STORAGECAPACITY_FAIL, storagecapacity));
			});
	};
};

export const DeleteStorageCapacity = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/storagecapacity/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_STORAGECAPACITY_SUCCESS, res.data));
			})
			.catch((err) => {
				const storagecapacity = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_STORAGECAPACITY_FAIL, storagecapacity));
			});
	};
};
