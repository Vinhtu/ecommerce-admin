import axios from 'axios';
import {
	GET_ALL_NOTIFICATION_SUCCESS,
	GET_ALL_NOTIFICATION_FAIL,
	GET_ALL_NOTIFICATION_ADMIN_SUCCESS,
	GET_ALL_NOTIFICATION_ADMIN_FAIL,
	GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_FAIL,
	GET_NOTIFICATION_DETAIL_SUCCESS,
	GET_NOTIFICATION_DETAIL_FAIL,
	SEARCH_NOTIFICATION_SUCCESS,
	SEARCH_NOTIFICATION_FAIL,
	POST_NOTIFICATION_SUCCESS,
	POST_NOTIFICATION_FAIL,
	PUT_NOTIFICATION_SUCCESS,
	PUT_NOTIFICATION_FAIL,
	DELETE_NOTIFICATION_SUCCESS,
	DELETE_NOTIFICATION_FAIL,
} from '../constants/notifications';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostNotification = (data) => {
	console.log('data vo regiter');
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/notification/register`, data)
			.then((res) => {
				console.log(res, 'x register');
				dispatch(action(POST_NOTIFICATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const notification = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_NOTIFICATION_FAIL, notification));
			});
	};
};

export const GetNotifications = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/notification`)
				.then((res) => {
					dispatch(action(GET_ALL_NOTIFICATION_SUCCESS, res.data));
				})
				.catch((err) => {
					const notification = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_NOTIFICATION_FAIL, notification));
				});
	
	};
};


export const GetAdminNotifications = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/notification/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_NOTIFICATION_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const notification = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_NOTIFICATION_ADMIN_FAIL, notification));
				});
	
	};
};
export const GetAdminAccountNotifications = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/notification/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const notification = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_FAIL, notification));
				});
	
	};
};
export const GetNotification = (id) => {
	console.log(id, 'get id');
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/notification/${id}`)
			.then((res) => {
				console.log(res, 'id');
				dispatch(action(GET_NOTIFICATION_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const notification = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_NOTIFICATION_DETAIL_FAIL, notification));
			});
	};
};

export const SearchNotification = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/notification/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_NOTIFICATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const notification = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_NOTIFICATION_FAIL, notification));
			});
	};
};

export const PutNotification = (id, data) => {
	console.log(id, data, 'data')
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/notification/${id}`, data)
			.then((res) => {
				console.log(res, 'res put');
				dispatch(action(PUT_NOTIFICATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const notification = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_NOTIFICATION_FAIL, notification));
			});
	};
};

export const DeleteNotification = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/notification/${id}`)
			.then((res) => {
				dispatch(action(DELETE_NOTIFICATION_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const notification = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_NOTIFICATION_FAIL, notification));
			});
	};
};
