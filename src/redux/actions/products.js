import axios from 'axios';
import {
	GET_ALL_PRODUCT_SUCCESS,
	GET_ALL_PRODUCT_FAIL,
	GET_ALL_PRODUCT_ADMIN_SUCCESS,
	GET_ALL_PRODUCT_ADMIN_FAIL,
	GET_ALL_PRODUCT_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_PRODUCT_ADMIN_ACCOUNT_FAIL,
	GET_PRODUCT_DETAIL_SUCCESS,
	GET_PRODUCT_DETAIL_FAIL,
	SEARCH_PRODUCT_SUCCESS,
	SEARCH_PRODUCT_FAIL,
	POST_PRODUCT_SUCCESS,
	POST_PRODUCT_FAIL,
	PUT_PRODUCT_SUCCESS,
	PUT_PRODUCT_FAIL,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	START_QUERY,
} from '../constants/products';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostProduct = (data) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/product`, data)
			.then((res) => {
				console.log(res, 'res product');
				dispatch(action(POST_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_PRODUCT_FAIL, product));
			});
	};
};

export const GetProducts = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/product`)
			.then((res) => {
				dispatch(action(GET_ALL_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_PRODUCT_FAIL, product));
			});
	};
};

export const GetAdminProducts = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/product/admin/all`)
			.then((res) => {
				dispatch(action(GET_ALL_PRODUCT_ADMIN_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_PRODUCT_ADMIN_FAIL, product));
			});
	};
};
export const GetAdminAccountProducts = () => {
	return async (dispatch) => {
		await axios
			.get(`http://localhost:8080/api/product/admin/account`)
			.then((res) => {
				dispatch(action(GET_ALL_PRODUCT_ADMIN_ACCOUNT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ALL_PRODUCT_ADMIN_ACCOUNT_FAIL, product));
			});
	};
};
export const GetProduct = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/product/${id}`)
			.then((res) => {
				dispatch(action(GET_PRODUCT_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_PRODUCT_DETAIL_FAIL, product));
			});
	};
};

export const GetProductCode = (code) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/product/code/${code}`)
			.then((res) => {
				dispatch(action(GET_PRODUCT_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_PRODUCT_DETAIL_FAIL, product));
			});
	};
};

export const SearchProduct = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/product/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_PRODUCT_FAIL, product));
			});
	};
};

export const PutProduct = (id, data, token) => {
	console.log(id, data, token, 'data token');
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/product/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_PRODUCT_FAIL, product));
			});
	};
};

export const PutProductAll = (id, data, token) => {
	console.log(id, data, token, 'data token');
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/product/all/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_PRODUCT_FAIL, product));
			});
	};
};

export const DeleteProduct = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/product/${id}`)
			.then((res) => {
				dispatch(action(DELETE_PRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const product = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_PRODUCT_FAIL, product));
			});
	};
};
