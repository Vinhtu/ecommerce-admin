import axios from 'axios';
import {
	GET_ALL_WARRANTYPERIOD_SUCCESS,
	GET_ALL_WARRANTYPERIOD_FAIL,
	GET_WARRANTYPERIOD_DETAIL_SUCCESS,
	GET_WARRANTYPERIOD_DETAIL_FAIL,
	POST_WARRANTYPERIOD_SUCCESS,
	POST_WARRANTYPERIOD_FAIL,
	PUT_WARRANTYPERIOD_SUCCESS,
	PUT_WARRANTYPERIOD_FAIL,
	DELETE_WARRANTYPERIOD_SUCCESS,
	DELETE_WARRANTYPERIOD_FAIL,
	START_QUERY,
} from '../../constants/utils/warrantyperiods';
import action from '../action';

export const PostWarrantyPeriod = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/warrantyperiod`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_WARRANTYPERIOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const warrantyperiod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_WARRANTYPERIOD_FAIL, warrantyperiod));
			});
	};
};

export const GetWarrantyPeriods = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/warrantyperiod`)
			.then((res) => {
				dispatch(action(GET_ALL_WARRANTYPERIOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const warrantyperiod = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_WARRANTYPERIOD_FAIL, warrantyperiod));
			});
	};
};

export const GetWarrantyPeriod = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/warrantyperiod/${id}`)
			.then((res) => {
				dispatch(action(GET_WARRANTYPERIOD_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const warrantyperiod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_WARRANTYPERIOD_DETAIL_FAIL, warrantyperiod));
			});
	};
};

export const PutWarrantyPeriod = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/warrantyperiod/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_WARRANTYPERIOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const warrantyperiod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_WARRANTYPERIOD_FAIL, warrantyperiod));
			});
	};
};

export const DeleteWarrantyPeriod = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/warrantyperiod/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_WARRANTYPERIOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const warrantyperiod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_WARRANTYPERIOD_FAIL, warrantyperiod));
			});
	};
};
