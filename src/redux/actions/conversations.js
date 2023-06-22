import axios from 'axios';
import {
	GET_ALL_CONVERSATION_SUCCESS,
	GET_ALL_CONVERSATION_FAIL,
	GET_ALL_CONVERSATION_ADMIN_SUCCESS,
	GET_ALL_CONVERSATION_ADMIN_FAIL,
	GET_ALL_CONVERSATION_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_CONVERSATION_ADMIN_ACCOUNT_FAIL,
	GET_CONVERSATION_DETAIL_SUCCESS,
	GET_CONVERSATION_DETAIL_FAIL,
	SEARCH_CONVERSATION_SUCCESS,
	SEARCH_CONVERSATION_FAIL,
	POST_CONVERSATION_SUCCESS,
	POST_CONVERSATION_FAIL,
	PUT_CONVERSATION_SUCCESS,
	PUT_CONVERSATION_FAIL,
	DELETE_CONVERSATION_SUCCESS,
	DELETE_CONVERSATION_FAIL,
} from '../constants/conversations';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostConversation = (data) => {
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/conversation`, data)
			.then((res) => {
				dispatch(action(POST_CONVERSATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const conversation = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_CONVERSATION_FAIL, conversation));
			});
	};
};

export const GetConversations = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/conversation`)
				.then((res) => {
					dispatch(action(GET_ALL_CONVERSATION_SUCCESS, res.data));
				})
				.catch((err) => {
					const conversation = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_CONVERSATION_FAIL, conversation));
				});
	
	};
};


export const GetAdminConversations = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/conversation/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_CONVERSATION_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const conversation = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CONVERSATION_ADMIN_FAIL, conversation));
				});
	
	};
};
export const GetAdminAccountConversations = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/conversation/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_CONVERSATION_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const conversation = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_CONVERSATION_ADMIN_ACCOUNT_FAIL, conversation));
				});
	
	};
};
export const GetConversation = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/conversation/${id}`)
			.then((res) => {
				dispatch(action(GET_CONVERSATION_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const conversation = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_CONVERSATION_DETAIL_FAIL, conversation));
			});
	};
};

export const SearchConversation = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/conversation/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_CONVERSATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const conversation = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_CONVERSATION_FAIL, conversation));
			});
	};
};

export const PutConversation = (id, data) => {
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/conversation/${id}`, data)
			.then((res) => {
				dispatch(action(PUT_CONVERSATION_SUCCESS, res.data));
			})
			.catch((err) => {
				const conversation = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_CONVERSATION_FAIL, conversation));
			});
	};
};

export const DeleteConversation = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/conversation/${id}`)
			.then((res) => {
				dispatch(action(DELETE_CONVERSATION_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const conversation = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_CONVERSATION_FAIL, conversation));
			});
	};
};
