import axios from 'axios';
import {
	GET_ALL_BRAND_SUCCESS,
	GET_ALL_BRAND_FAIL,
	GET_ALL_BRAND_ADMIN_SUCCESS,
	GET_ALL_BRAND_ADMIN_FAIL,
	GET_ALL_BRAND_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_BRAND_ADMIN_ACCOUNT_FAIL,
	GET_BRAND_DETAIL_SUCCESS,
	GET_BRAND_DETAIL_FAIL,
	SEARCH_BRAND_SUCCESS,
	SEARCH_BRAND_FAIL,
	POST_BRAND_SUCCESS,
	POST_BRAND_FAIL,
	PUT_BRAND_SUCCESS,
	PUT_BRAND_FAIL,
	DELETE_BRAND_SUCCESS,
	DELETE_BRAND_FAIL,
	START_QUERY,
} from '../constants/brands';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostBrand = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/brand`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_BRAND_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_BRAND_FAIL, brand));
			});
	};
};

export const GetBrands = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/brand`)
			.then((res) => {
				dispatch(action(GET_ALL_BRAND_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_BRAND_FAIL, brand));
			});
	};
};

export const GetAdminBrands = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/brand/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_BRAND_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_BRAND_ADMIN_FAIL, brand));
			});
	};
};
export const GetAdminAccountBrands = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/brand/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_BRAND_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_BRAND_ADMIN_ACCOUNT_FAIL, brand));
			});
	};
};
export const GetBrand = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/brand/${id}`)
			.then((res) => {
				dispatch(action(GET_BRAND_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_BRAND_DETAIL_FAIL, brand));
			});
	};
};

export const SearchBrand = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/brand/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(SEARCH_BRAND_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_BRAND_FAIL, brand));
			});
	};
};

export const PutBrand = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/brand/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_BRAND_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_BRAND_FAIL, brand));
			});
	};
};

export const DeleteBrand = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/brand/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_BRAND_SUCCESS, res.data));
			})
			.catch((err) => {
				const brand = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_BRAND_FAIL, brand));
			});
	};
};
