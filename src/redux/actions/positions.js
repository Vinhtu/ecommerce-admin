import axios from 'axios';
import {
	GET_ALL_POSITION_SUCCESS,
	GET_ALL_POSITION_FAIL,
	GET_ALL_POSITION_ADMIN_SUCCESS,
	GET_ALL_POSITION_ADMIN_FAIL,
	GET_ALL_POSITION_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_POSITION_ADMIN_ACCOUNT_FAIL,
	GET_POSITION_DETAIL_SUCCESS,
	GET_POSITION_DETAIL_FAIL,
	SEARCH_POSITION_SUCCESS,
	SEARCH_POSITION_FAIL,
	POST_POSITION_SUCCESS,
	POST_POSITION_FAIL,
	PUT_POSITION_SUCCESS,
	PUT_POSITION_FAIL,
	DELETE_POSITION_SUCCESS,
	DELETE_POSITION_FAIL,
} from '../constants/positions';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostPosition = (data) => {
	console.log('data vo regiter');
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/position`, data)
			.then((res) => {
				console.log(res, 'x register');
				dispatch(action(POST_POSITION_SUCCESS, res.data));
			})
			.catch((err) => {
				const position = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_POSITION_FAIL, position));
			});
	};
};

export const GetPositions = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/position`)
				.then((res) => {
					dispatch(action(GET_ALL_POSITION_SUCCESS, res.data));
				})
				.catch((err) => {
					const position = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_POSITION_FAIL, position));
				});
	
	};
};


export const GetAdminPositions = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/position/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_POSITION_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const position = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_POSITION_ADMIN_FAIL, position));
				});
	
	};
};
export const GetAdminAccountPositions = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/position/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_POSITION_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const position = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_POSITION_ADMIN_ACCOUNT_FAIL, position));
				});
	
	};
};
export const GetPosition = (id) => {
	console.log(id, 'get id');
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/position/${id}`)
			.then((res) => {
				console.log(res, 'id');
				dispatch(action(GET_POSITION_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const position = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_POSITION_DETAIL_FAIL, position));
			});
	};
};

export const SearchPosition = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/position/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_POSITION_SUCCESS, res.data));
			})
			.catch((err) => {
				const position = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_POSITION_FAIL, position));
			});
	};
};

export const PutPosition = (id, data) => {
	console.log(id, data, 'data')
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/position/${id}`, data)
			.then((res) => {
				console.log(res, 'res put');
				dispatch(action(PUT_POSITION_SUCCESS, res.data));
			})
			.catch((err) => {
				const position = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_POSITION_FAIL, position));
			});
	};
};

export const DeletePosition = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/position/${id}`)
			.then((res) => {
				dispatch(action(DELETE_POSITION_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const position = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_POSITION_FAIL, position));
			});
	};
};
