import axios from 'axios';
import {
	GET_ALL_MESSAGE_SUCCESS,
	GET_ALL_MESSAGE_FAIL,
	GET_ALL_MESSAGE_ADMIN_SUCCESS,
	GET_ALL_MESSAGE_ADMIN_FAIL,
	GET_ALL_MESSAGE_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_MESSAGE_ADMIN_ACCOUNT_FAIL,
	GET_MESSAGE_DETAIL_SUCCESS,
	GET_MESSAGE_DETAIL_FAIL,
	SEARCH_MESSAGE_SUCCESS,
	SEARCH_MESSAGE_FAIL,
	POST_MESSAGE_SUCCESS,
	POST_MESSAGE_FAIL,
	PUT_MESSAGE_SUCCESS,
	PUT_MESSAGE_FAIL,
	DELETE_MESSAGE_SUCCESS,
	DELETE_MESSAGE_FAIL,
} from '../constants/messages';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostMessage = (data) => {
	console.log(data,'data post messsage')
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/message`, data)
			.then((res) => {
				dispatch(action(POST_MESSAGE_SUCCESS, res.data));
			})
			.catch((err) => {
				const message = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_MESSAGE_FAIL, message));
			});
	};
};

export const GetMessages = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/message`)
				.then((res) => {
					dispatch(action(GET_ALL_MESSAGE_SUCCESS, res.data));
				})
				.catch((err) => {
					const message = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_MESSAGE_FAIL, message));
				});
	
	};
};


export const GetAdminMessages = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/message/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_MESSAGE_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const message = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_MESSAGE_ADMIN_FAIL, message));
				});
	
	};
};
export const GetAdminAccountMessages = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/message/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_MESSAGE_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const message = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_MESSAGE_ADMIN_ACCOUNT_FAIL, message));
				});
	
	};
};
export const GetMessage = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/message/${id}`)
			.then((res) => {
				dispatch(action(GET_MESSAGE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const message = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_MESSAGE_DETAIL_FAIL, message));
			});
	};
};

export const SearchMessage = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/message/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_MESSAGE_SUCCESS, res.data));
			})
			.catch((err) => {
				const message = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_MESSAGE_FAIL, message));
			});
	};
};

export const PutMessage = (id, data) => {
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/message/${id}`, data)
			.then((res) => {
				dispatch(action(PUT_MESSAGE_SUCCESS, res.data));
			})
			.catch((err) => {
				const message = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_MESSAGE_FAIL, message));
			});
	};
};

export const DeleteMessage = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/message/${id}`)
			.then((res) => {
				dispatch(action(DELETE_MESSAGE_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const message = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_MESSAGE_FAIL, message));
			});
	};
};
