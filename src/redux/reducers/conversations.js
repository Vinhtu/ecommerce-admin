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

// const intialState = {
// 	isPostNOTIFICATION: false,
// };

const ConversationReducer = (state , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_CONVERSATION_SUCCESS:
			return { ...state, conversationList: payload };
		case GET_ALL_CONVERSATION_FAIL:
			return { ...state };

		case GET_ALL_CONVERSATION_ADMIN_SUCCESS:
			return { ...state, conversationAdminList: payload };
		case GET_ALL_CONVERSATION_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_CONVERSATION_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, conversationAdminAccountList: payload };
		case GET_ALL_CONVERSATION_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_CONVERSATION_DETAIL_SUCCESS:
			return { ...state, conversationDetail: payload };
		case GET_CONVERSATION_DETAIL_FAIL:
			return { ...state };
		case SEARCH_CONVERSATION_SUCCESS:
			return { ...state, conversationListSearch: payload };
		case SEARCH_CONVERSATION_FAIL:
			return { ...state };
		case POST_CONVERSATION_SUCCESS:
			return { ...state, isPostConversation: true };
		case POST_CONVERSATION_FAIL:
			return { ...state, isPostConversation: false };
		case PUT_CONVERSATION_SUCCESS:
			return { ...state, isPutConversation: true };
		case PUT_CONVERSATION_FAIL:
			return { ...state, isPutConversation: false };
		case DELETE_CONVERSATION_SUCCESS:
			return { ...state, conversation: payload };
		case DELETE_CONVERSATION_FAIL:
			return { ...state, conversation: payload };
		default:
			return { ...state };
	}
};

export default ConversationReducer;
