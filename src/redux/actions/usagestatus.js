import axios from 'axios';
import {
	GET_ALL_USAGESTATUS_SUCCESS,
	GET_ALL_USAGESTATUS_FAIL,
	GET_ALL_USAGESTATUS_ADMIN_SUCCESS,
	GET_ALL_USAGESTATUS_ADMIN_FAIL,
	GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_FAIL,
	GET_USAGESTATUS_DETAIL_SUCCESS,
	GET_USAGESTATUS_DETAIL_FAIL,
	SEARCH_USAGESTATUS_SUCCESS,
	SEARCH_USAGESTATUS_FAIL,
	POST_USAGESTATUS_SUCCESS,
	POST_USAGESTATUS_FAIL,
	PUT_USAGESTATUS_SUCCESS,
	PUT_USAGESTATUS_FAIL,
	DELETE_USAGESTATUS_SUCCESS,
	DELETE_USAGESTATUS_FAIL,
	START_QUERY,
} from '../constants/usagestatus';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostUsageStatus = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/usagestatus`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_USAGESTATUS_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_USAGESTATUS_FAIL, usagestatus));
			});
	};
};

export const GetUsageStatuss = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/usagestatus`)
			.then((res) => {
				dispatch(action(GET_ALL_USAGESTATUS_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_USAGESTATUS_FAIL, usagestatus));
			});
	};
};

export const GetAdminUsageStatuss = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/usagestatus/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_USAGESTATUS_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_USAGESTATUS_ADMIN_FAIL, usagestatus));
			});
	};
};
export const GetAdminAccountUsageStatuss = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/usagestatus/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_FAIL, usagestatus));
			});
	};
};
export const GetUsageStatus = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/usagestatus/${id}`)
			.then((res) => {
				dispatch(action(GET_USAGESTATUS_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_USAGESTATUS_DETAIL_FAIL, usagestatus));
			});
	};
};

export const SearchUsageStatus = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/usagestatus/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_USAGESTATUS_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_USAGESTATUS_FAIL, usagestatus));
			});
	};
};

export const PutUsageStatus = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/usagestatus/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_USAGESTATUS_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_USAGESTATUS_FAIL, usagestatus));
			});
	};
};

export const DeleteUsageStatus = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/usagestatus/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_USAGESTATUS_SUCCESS, res.data));
			})
			.catch((err) => {
				const usagestatus = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_USAGESTATUS_FAIL, usagestatus));
			});
	};
};
