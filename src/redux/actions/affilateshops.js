import axios from 'axios';
import {
	GET_ALL_AFFILATESHOP_SUCCESS,
	GET_ALL_AFFILATESHOP_FAIL,
	GET_ALL_AFFILATESHOP_ADMIN_SUCCESS,
	GET_ALL_AFFILATESHOP_ADMIN_FAIL,
	GET_ALL_AFFILATESHOP_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_AFFILATESHOP_ADMIN_ACCOUNT_FAIL,
	GET_AFFILATESHOP_DETAIL_SUCCESS,
	GET_AFFILATESHOP_DETAIL_FAIL,
	SEARCH_AFFILATESHOP_SUCCESS,
	SEARCH_AFFILATESHOP_FAIL,
	POST_AFFILATESHOP_SUCCESS,
	POST_AFFILATESHOP_FAIL,
	PUT_AFFILATESHOP_SUCCESS,
	PUT_AFFILATESHOP_FAIL,
	DELETE_AFFILATESHOP_SUCCESS,
	DELETE_AFFILATESHOP_FAIL,
	START_QUERY
} from '../constants/affilateshops';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostAffilateshop = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/affilateshop`, data,  {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res,'res')
				dispatch(action(POST_AFFILATESHOP_SUCCESS, res.data));
			})
			.catch((err) => {
				const affilateshop = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(POST_AFFILATESHOP_FAIL, affilateshop));
			});
	};
};

export const GetAffilateshops = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/affilateshop`)
				.then((res) => {
					dispatch(action(GET_ALL_AFFILATESHOP_SUCCESS, res.data));
				})
				.catch((err) => {
					const affilateshop = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_AFFILATESHOP_FAIL, affilateshop));
				});
	
	};
};


export const GetAdminAffilateshops = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/affilateshop/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_AFFILATESHOP_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const affilateshop = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_AFFILATESHOP_ADMIN_FAIL, affilateshop));
				});
	
	};
};
export const GetAdminAccountAffilateshops = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/affilateshop/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_AFFILATESHOP_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const affilateshop = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_AFFILATESHOP_ADMIN_ACCOUNT_FAIL, affilateshop));
				});
	
	};
};
export const GetAffilateshop = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/affilateshop/${id}`)
			.then((res) => {
				dispatch(action(GET_AFFILATESHOP_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const affilateshop = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_AFFILATESHOP_DETAIL_FAIL, affilateshop));
			});
	};
};

export const SearchAffilateshop = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/affilateshop/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_AFFILATESHOP_SUCCESS, res.data));
			})
			.catch((err) => {
				const affilateshop = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_AFFILATESHOP_FAIL, affilateshop));
			});
	};
};

export const PutAffilateshop = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/affilateshop/${id}`, data,  {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_AFFILATESHOP_SUCCESS, res.data));
			})
			.catch((err) => {
				const affilateshop = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_AFFILATESHOP_FAIL, affilateshop));
			});
	};
};

export const DeleteAffilateshop = (id, token) => {
	

	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/affilateshop/${id}`,  {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_AFFILATESHOP_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const affilateshop = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_AFFILATESHOP_FAIL, affilateshop));
			});
	};
};
