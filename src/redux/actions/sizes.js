import axios from 'axios';
import {
	GET_ALL_SIZE_SUCCESS,
	GET_ALL_SIZE_FAIL,
	GET_ALL_SIZE_ADMIN_SUCCESS,
	GET_ALL_SIZE_ADMIN_FAIL,
	GET_ALL_SIZE_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_SIZE_ADMIN_ACCOUNT_FAIL,
	GET_SIZE_DETAIL_SUCCESS,
	GET_SIZE_DETAIL_FAIL,
	SEARCH_SIZE_SUCCESS,
	SEARCH_SIZE_FAIL,
	POST_SIZE_SUCCESS,
	POST_SIZE_FAIL,
	PUT_SIZE_SUCCESS,
	PUT_SIZE_FAIL,
	DELETE_SIZE_SUCCESS,
	DELETE_SIZE_FAIL,
	START_QUERY,
} from '../constants/sizes';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostSize = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/size`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SIZE_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SIZE_FAIL, size));
			});
	};
};

export const GetSizes = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/size`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZE_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SIZE_FAIL, size));
			});
	};
};

export const GetAdminSizes = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/size/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZE_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_SIZE_ADMIN_FAIL, size));
			});
	};
};
export const GetAdminAccountSizes = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/size/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_SIZE_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_SIZE_ADMIN_ACCOUNT_FAIL, size));
			});
	};
};
export const GetSize = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/size/${id}`)
			.then((res) => {
				dispatch(action(GET_SIZE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SIZE_DETAIL_FAIL, size));
			});
	};
};

export const SearchSize = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/size/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_SIZE_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_SIZE_FAIL, size));
			});
	};
};

export const PutSize = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/size/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SIZE_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SIZE_FAIL, size));
			});
	};
};

export const DeleteSize = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/size/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SIZE_SUCCESS, res.data));
			})
			.catch((err) => {
				const size = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SIZE_FAIL, size));
			});
	};
};
