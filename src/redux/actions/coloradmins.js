import axios from 'axios';
import {
	GET_ALL_COLORADMIN_SUCCESS,
	GET_ALL_COLORADMIN_FAIL,
	GET_ALL_COLORADMIN_ADMIN_SUCCESS,
	GET_ALL_COLORADMIN_ADMIN_FAIL,
	GET_ALL_COLORADMIN_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_COLORADMIN_ADMIN_ACCOUNT_FAIL,
	GET_COLORADMIN_DETAIL_SUCCESS,
	GET_COLORADMIN_DETAIL_FAIL,
	SEARCH_COLORADMIN_SUCCESS,
	SEARCH_COLORADMIN_FAIL,
	POST_COLORADMIN_SUCCESS,
	POST_COLORADMIN_FAIL,
	PUT_COLORADMIN_SUCCESS,
	PUT_COLORADMIN_FAIL,
	DELETE_COLORADMIN_SUCCESS,
	DELETE_COLORADMIN_FAIL,
	START_QUERY,
} from '../constants/coloradmins';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostColoradmin = (data, token) => {
	console.log("daa")
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/coloradmin`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_COLORADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_COLORADMIN_FAIL, coloradmin));
			});
	};
};

export const GetColoradmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/coloradmin`)
			.then((res) => {
				dispatch(action(GET_ALL_COLORADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_COLORADMIN_FAIL, coloradmin));
			});
	};
};

export const GetAdminColoradmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/coloradmin/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_COLORADMIN_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_COLORADMIN_ADMIN_FAIL, coloradmin));
			});
	};
};
export const GetAdminAccountColoradmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/coloradmin/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_COLORADMIN_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_COLORADMIN_ADMIN_ACCOUNT_FAIL, coloradmin));
			});
	};
};
export const GetColoradmin = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/coloradmin/${id}`)
			.then((res) => {
				dispatch(action(GET_COLORADMIN_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_COLORADMIN_DETAIL_FAIL, coloradmin));
			});
	};
};

export const SearchColoradmin = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/coloradmin/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_COLORADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_COLORADMIN_FAIL, coloradmin));
			});
	};
};

export const PutColoradmin = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/coloradmin/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_COLORADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_COLORADMIN_FAIL, coloradmin));
			});
	};
};

export const DeleteColoradmin = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/coloradmin/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_COLORADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const coloradmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_COLORADMIN_FAIL, coloradmin));
			});
	};
};
