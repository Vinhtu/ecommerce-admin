import axios from 'axios';
import {
	GET_ALL_CATEGORY_SUCCESS,
	GET_ALL_CATEGORY_FAIL,
	GET_ALL_CATEGORY_ADMIN_SUCCESS,
	GET_ALL_CATEGORY_ADMIN_FAIL,
	GET_ALL_CATEGORY_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_CATEGORY_ADMIN_ACCOUNT_FAIL,
	GET_CATEGORY_DETAIL_SUCCESS,
	GET_CATEGORY_DETAIL_FAIL,
	SEARCH_CATEGORY_SUCCESS,
	SEARCH_CATEGORY_FAIL,
	POST_CATEGORY_SUCCESS,
	POST_CATEGORY_FAIL,
	PUT_CATEGORY_SUCCESS,
	PUT_CATEGORY_FAIL,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAIL,
	START_QUERY,

} from '../constants/categorys';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostCategory = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));
		axios
			.post(`http://localhost:8080/api/category`, data,{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_CATEGORY_SUCCESS, res.data));
			})
			.catch((err) => {
				const category = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_CATEGORY_FAIL, category));
			});
	};
};

export const GetCategorys = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));
			await axios
				.get(`http://localhost:8080/api/category`)
				.then((res) => {
					dispatch(action(GET_ALL_CATEGORY_SUCCESS, res.data));
				})
				.catch((err) => {
					const category = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_CATEGORY_FAIL, category));
				});
	
	};
};


export const GetAdminCategorys = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));
			await axios
				.get(`http://localhost:8080/api/category/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_CATEGORY_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const category = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CATEGORY_ADMIN_FAIL, category));
				});
	
	};
};
export const GetAdminAccountCategorys = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));
			await axios
				.get(`http://localhost:8080/api/category/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_CATEGORY_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const category = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CATEGORY_ADMIN_ACCOUNT_FAIL, category));
				});
	
	};
};
export const GetCategory = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));
		axios
			.get(`http://localhost:8080/api/category/${id}`)
			.then((res) => {
				dispatch(action(GET_CATEGORY_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const category = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_CATEGORY_DETAIL_FAIL, category));
			});
	};
};

export const SearchCategory = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));
		axios
			.get(`http://localhost:8080/api/category/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_CATEGORY_SUCCESS, res.data));
			})
			.catch((err) => {
				const category = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_CATEGORY_FAIL, category));
			});
	};
};

export const PutCategory = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));
		axios
			.put(`http://localhost:8080/api/category/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_CATEGORY_SUCCESS, res.data));
			})
			.catch((err) => {
				const category = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_CATEGORY_FAIL, category));
			});
	};
};

export const DeleteCategory = (id, token) => {
	
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/category/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_CATEGORY_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const category = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_CATEGORY_FAIL, category));
			});
	};
};
