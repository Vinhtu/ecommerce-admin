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

// const intialState = {
// 	isPostNOTIFICATION: false,
// };

const MessageReducer = (state , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_MESSAGE_SUCCESS:
			return { ...state, messageList: payload };
		case GET_ALL_MESSAGE_FAIL:
			return { ...state };

		case GET_ALL_MESSAGE_ADMIN_SUCCESS:
			return { ...state, messageAdminList: payload };
		case GET_ALL_MESSAGE_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_MESSAGE_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, messageAdminAccountList: payload };
		case GET_ALL_MESSAGE_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_MESSAGE_DETAIL_SUCCESS:
			return { ...state, messageDetail: payload };
		case GET_MESSAGE_DETAIL_FAIL:
			return { ...state };
		case SEARCH_MESSAGE_SUCCESS:
			return { ...state, messageListSearch: payload };
		case SEARCH_MESSAGE_FAIL:
			return { ...state };
		case POST_MESSAGE_SUCCESS:
			return { ...state, isPostMessage: true };
		case POST_MESSAGE_FAIL:
			return { ...state, isPostMessage: false };
		case PUT_MESSAGE_SUCCESS:
			return { ...state, isPutMessage: true };
		case PUT_MESSAGE_FAIL:
			return { ...state, isPutMessage: false };
		case DELETE_MESSAGE_SUCCESS:
			return { ...state, message: payload };
		case DELETE_MESSAGE_FAIL:
			return { ...state, message: payload };
		default:
			return { ...state };
	}
};

export default MessageReducer;
