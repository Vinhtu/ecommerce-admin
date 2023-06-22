import axios from 'axios';
import {
	GET_ALL_CART_SUCCESS,
	GET_ALL_CART_FAIL,
	GET_ALL_CART_ADMIN_SUCCESS,
	GET_ALL_CART_ADMIN_FAIL,
	GET_ALL_CART_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_CART_ADMIN_ACCOUNT_FAIL,
	GET_CART_DETAIL_SUCCESS,
	GET_CART_DETAIL_FAIL,
	SEARCH_CART_SUCCESS,
	SEARCH_CART_FAIL,
	POST_CART_SUCCESS,
	POST_CART_FAIL,
	PUT_CART_SUCCESS,
	PUT_CART_FAIL,
	DELETE_CART_SUCCESS,
	DELETE_CART_FAIL,
} from '../constants/carts';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostCart = (data) => {
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/cart`, data)
			.then((res) => {
				dispatch(action(POST_CART_SUCCESS, res.data));
			})
			.catch((err) => {
				const cart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_CART_FAIL, cart));
			});
	};
};

export const GetCarts = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/cart`)
				.then((res) => {
					dispatch(action(GET_ALL_CART_SUCCESS, res.data));
				})
				.catch((err) => {
					const cart = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_CART_FAIL, cart));
				});
	
	};
};


export const GetAdminCarts = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/cart/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_CART_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const cart = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CART_ADMIN_FAIL, cart));
				});
	
	};
};
export const GetAdminAccountCarts = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/cart/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_CART_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const cart = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CART_ADMIN_ACCOUNT_FAIL, cart));
				});
	
	};
};
export const GetCart = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/cart/${id}`)
			.then((res) => {
				dispatch(action(GET_CART_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const cart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_CART_DETAIL_FAIL, cart));
			});
	};
};

export const SearchCart = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/cart/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_CART_SUCCESS, res.data));
			})
			.catch((err) => {
				const cart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_CART_FAIL, cart));
			});
	};
};

export const PutCart = (id, data) => {
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/cart/${id}`, data)
			.then((res) => {
				dispatch(action(PUT_CART_SUCCESS, res.data));
			})
			.catch((err) => {
				const cart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_CART_FAIL, cart));
			});
	};
};

export const DeleteCart = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/cart/${id}`)
			.then((res) => {
				dispatch(action(DELETE_CART_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const cart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_CART_FAIL, cart));
			});
	};
};
