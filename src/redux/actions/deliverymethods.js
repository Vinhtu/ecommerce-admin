import axios from 'axios';
import {
	GET_ALL_DELIVERYMETHOD_SUCCESS,
	GET_ALL_DELIVERYMETHOD_FAIL,
	GET_ALL_DELIVERYMETHOD_ADMIN_SUCCESS,
	GET_ALL_DELIVERYMETHOD_ADMIN_FAIL,
	GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_FAIL,
	GET_DELIVERYMETHOD_DETAIL_SUCCESS,
	GET_DELIVERYMETHOD_DETAIL_FAIL,
	SEARCH_DELIVERYMETHOD_SUCCESS,
	SEARCH_DELIVERYMETHOD_FAIL,
	POST_DELIVERYMETHOD_SUCCESS,
	POST_DELIVERYMETHOD_FAIL,
	PUT_DELIVERYMETHOD_SUCCESS,
	PUT_DELIVERYMETHOD_FAIL,
	DELETE_DELIVERYMETHOD_SUCCESS,
	DELETE_DELIVERYMETHOD_FAIL,
	START_QUERY,
} from '../constants/deliverymethods';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostDeliveryMethod = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/deliverymethod`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_DELIVERYMETHOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_DELIVERYMETHOD_FAIL, deliverymethod));
			});
	};
};

export const GetDeliveryMethods = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/deliverymethod`)
			.then((res) => {
				dispatch(action(GET_ALL_DELIVERYMETHOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_DELIVERYMETHOD_FAIL, deliverymethod));
			});
	};
};

export const GetAdminDeliveryMethods = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/deliverymethod/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_DELIVERYMETHOD_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_DELIVERYMETHOD_ADMIN_FAIL, deliverymethod));
			});
	};
};
export const GetAdminAccountDeliveryMethods = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/deliverymethod/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_FAIL, deliverymethod));
			});
	};
};
export const GetDeliveryMethod = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/deliverymethod/${id}`)
			.then((res) => {
				dispatch(action(GET_DELIVERYMETHOD_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_DELIVERYMETHOD_DETAIL_FAIL, deliverymethod));
			});
	};
};

export const SearchDeliveryMethod = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/deliverymethod/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_DELIVERYMETHOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_DELIVERYMETHOD_FAIL, deliverymethod));
			});
	};
};

export const PutDeliveryMethod = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/deliverymethod/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_DELIVERYMETHOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_DELIVERYMETHOD_FAIL, deliverymethod));
			});
	};
};

export const DeleteDeliveryMethod = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/deliverymethod/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_DELIVERYMETHOD_SUCCESS, res.data));
			})
			.catch((err) => {
				const deliverymethod = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_DELIVERYMETHOD_FAIL, deliverymethod));
			});
	};
};
