import axios from 'axios';
import {
	GET_ALL_BANNER_SUCCESS,
	GET_ALL_BANNER_FAIL,
	GET_ALL_BANNER_ADMIN_SUCCESS,
	GET_ALL_BANNER_ADMIN_FAIL,
	GET_ALL_BANNER_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_BANNER_ADMIN_ACCOUNT_FAIL,
	GET_BANNER_DETAIL_SUCCESS,
	GET_BANNER_DETAIL_FAIL,
	SEARCH_BANNER_SUCCESS,
	SEARCH_BANNER_FAIL,
	POST_BANNER_SUCCESS,
	POST_BANNER_FAIL,
	PUT_BANNER_SUCCESS,
	PUT_BANNER_FAIL,
	DELETE_BANNER_SUCCESS,
	DELETE_BANNER_FAIL,
	START_QUERY
} from '../constants/banners';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostBanner = (data, token) => {

	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/banner`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_BANNER_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_BANNER_FAIL, banner));
			});
	};
};

export const GetBanners = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/banner`)
			.then((res) => {
				dispatch(action(GET_ALL_BANNER_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_BANNER_FAIL, banner));
			});
	};
};

export const GetAdminBanners = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/banner/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_BANNER_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_BANNER_ADMIN_FAIL, banner));
			});
	};
};
export const GetAdminAccountBanners = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/banner/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_BANNER_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_BANNER_ADMIN_ACCOUNT_FAIL, banner));
			});
	};
};
export const GetBanner = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/banner/${id}`)
			.then((res) => {
				dispatch(action(GET_BANNER_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_BANNER_DETAIL_FAIL, banner));
			});
	};
};

export const SearchBanner = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/banner/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_BANNER_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_BANNER_FAIL, banner));
			});
	};
};

export const PutBanner = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/banner/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_BANNER_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_BANNER_FAIL, banner));
			});
	};
};

export const DeleteBanner = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/banner/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_BANNER_SUCCESS, res.data));
			})
			.catch((err) => {
				const banner = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_BANNER_FAIL, banner));
			});
	};
};
