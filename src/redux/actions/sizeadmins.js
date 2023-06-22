import axios from 'axios';
import {
	GET_ALL_SIZEADMIN_SUCCESS,
	GET_ALL_SIZEADMIN_FAIL,
	GET_ALL_SIZEADMIN_ADMIN_SUCCESS,
	GET_ALL_SIZEADMIN_ADMIN_FAIL,
	GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_FAIL,
	GET_SIZEADMIN_DETAIL_SUCCESS,
	GET_SIZEADMIN_DETAIL_FAIL,
	SEARCH_SIZEADMIN_SUCCESS,
	SEARCH_SIZEADMIN_FAIL,
	POST_SIZEADMIN_SUCCESS,
	POST_SIZEADMIN_FAIL,
	PUT_SIZEADMIN_SUCCESS,
	PUT_SIZEADMIN_FAIL,
	DELETE_SIZEADMIN_SUCCESS,
	DELETE_SIZEADMIN_FAIL,
	START_QUERY,
} from '../constants/sizeadmins';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostSizeadmin = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/sizeadmin`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SIZEADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SIZEADMIN_FAIL, sizeadmin));
			});
	};
};

export const GetSizeadmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/sizeadmin`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZEADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SIZEADMIN_FAIL, sizeadmin));
			});
	};
};

export const GetAdminSizeadmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/sizeadmin/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZEADMIN_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_SIZEADMIN_ADMIN_FAIL, sizeadmin));
			});
	};
};
export const GetAdminAccountSizeadmins = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/sizeadmin/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_FAIL, sizeadmin));
			});
	};
};
export const GetSizeadmin = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/sizeadmin/${id}`)
			.then((res) => {
				dispatch(action(GET_SIZEADMIN_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SIZEADMIN_DETAIL_FAIL, sizeadmin));
			});
	};
};

export const SearchSizeadmin = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/sizeadmin/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_SIZEADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_SIZEADMIN_FAIL, sizeadmin));
			});
	};
};

export const PutSizeadmin = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/sizeadmin/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SIZEADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SIZEADMIN_FAIL, sizeadmin));
			});
	};
};

export const DeleteSizeadmin = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/sizeadmin/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SIZEADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const sizeadmin = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SIZEADMIN_FAIL, sizeadmin));
			});
	};
};
