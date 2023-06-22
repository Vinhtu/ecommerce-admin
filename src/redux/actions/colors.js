import axios from 'axios';
import {
	GET_ALL_COLOR_SUCCESS,
	GET_ALL_COLOR_FAIL,
	GET_ALL_COLOR_ADMIN_SUCCESS,
	GET_ALL_COLOR_ADMIN_FAIL,
	GET_ALL_COLOR_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_COLOR_ADMIN_ACCOUNT_FAIL,
	GET_COLOR_DETAIL_SUCCESS,
	GET_COLOR_DETAIL_FAIL,
	SEARCH_COLOR_SUCCESS,
	SEARCH_COLOR_FAIL,
	POST_COLOR_SUCCESS,
	POST_COLOR_FAIL,
	PUT_COLOR_SUCCESS,
	PUT_COLOR_FAIL,
	DELETE_COLOR_SUCCESS,
	DELETE_COLOR_FAIL,
	START_QUERY,
} from '../constants/colors';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostColor = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/color`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_COLOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_COLOR_FAIL, color));
			});
	};
};

export const GetColors = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/color`)
			.then((res) => {
				dispatch(action(GET_ALL_COLOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_COLOR_FAIL, color));
			});
	};
};

export const GetAdminColors = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/color/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_COLOR_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_COLOR_ADMIN_FAIL, color));
			});
	};
};
export const GetAdminAccountColors = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/color/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_COLOR_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_COLOR_ADMIN_ACCOUNT_FAIL, color));
			});
	};
};
export const GetColor = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/color/${id}`)
			.then((res) => {
				dispatch(action(GET_COLOR_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_COLOR_DETAIL_FAIL, color));
			});
	};
};

export const SearchColor = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/color/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_COLOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_COLOR_FAIL, color));
			});
	};
};

export const PutColor = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/color/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_COLOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_COLOR_FAIL, color));
			});
	};
};

export const DeleteColor = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/color/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_COLOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const color = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_COLOR_FAIL, color));
			});
	};
};
