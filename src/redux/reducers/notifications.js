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

// const intialState = {
// 	isPostNOTIFICATION: false,
// };

const NotificationReducer = (state , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_NOTIFICATION_SUCCESS:
			return { ...state, notificationList: payload };
		case GET_ALL_NOTIFICATION_FAIL:
			return { ...state };

		case GET_ALL_NOTIFICATION_ADMIN_SUCCESS:
			return { ...state, notificationAdminList: payload };
		case GET_ALL_NOTIFICATION_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, notificationAdminAccountList: payload };
		case GET_ALL_NOTIFICATION_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_NOTIFICATION_DETAIL_SUCCESS:
			return { ...state, notificationDetail: payload };
		case GET_NOTIFICATION_DETAIL_FAIL:
			return { ...state };
		case SEARCH_NOTIFICATION_SUCCESS:
			return { ...state, notificationListSearch: payload };
		case SEARCH_NOTIFICATION_FAIL:
			return { ...state };
		case POST_NOTIFICATION_SUCCESS:
			return { ...state, isPostNotification: true };
		case POST_NOTIFICATION_FAIL:
			return { ...state, isPostNotification: false };
		case PUT_NOTIFICATION_SUCCESS:
			return { ...state, isPutnotification: true };
		case PUT_NOTIFICATION_FAIL:
			return { ...state, isPutnotification: false };
		case DELETE_NOTIFICATION_SUCCESS:
			return { ...state, notification: payload };
		case DELETE_NOTIFICATION_FAIL:
			return { ...state, notification: payload };
		default:
			return { ...state };
	}
};

export default NotificationReducer;
