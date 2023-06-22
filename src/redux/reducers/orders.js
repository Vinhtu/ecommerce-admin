import {
	START_QUERY,
	END_QUERY,
	GET_ALL_ORDER_SUCCESS,
	GET_ALL_ORDER_FAIL,
	GET_ALL_ORDER_ADMIN_SUCCESS,
	GET_ALL_ORDER_ADMIN_FAIL,
	GET_ALL_ORDER_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_ORDER_ADMIN_ACCOUNT_FAIL,
	GET_ORDER_DETAIL_SUCCESS,
	GET_ORDER_DETAIL_FAIL,
	SEARCH_ORDER_SUCCESS,
	SEARCH_ORDER_FAIL,
	POST_ORDER_SUCCESS,
	POST_ORDER_FAIL,
	PUT_ORDER_SUCCESS,
	PUT_ORDER_FAIL,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAIL,
} from '../constants/orders';

const intialState = {
	isPostOrder: false,
	isPutOrder: false,
};

const OrderReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPostOrder: false, isPutOrder: false };
		case END_QUERY:
			return { ...state, isPostOrder: false, isPutOrder: false };
		case GET_ALL_ORDER_SUCCESS:
			return { ...state, orderList: payload };
		case GET_ALL_ORDER_FAIL:
			return { ...state };

		case GET_ALL_ORDER_ADMIN_SUCCESS:
			return { ...state, orderAdminList: payload };
		case GET_ALL_ORDER_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_ORDER_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, orderAdminAccountList: payload };
		case GET_ALL_ORDER_ADMIN_ACCOUNT_FAIL:
			return { ...state };

		case GET_ORDER_DETAIL_SUCCESS:
			return { ...state, orderDetail: payload };
		case GET_ORDER_DETAIL_FAIL:
			return { ...state };
		case SEARCH_ORDER_SUCCESS:
			return { ...state, orderListSearch: payload };
		case SEARCH_ORDER_FAIL:
			return { ...state };
		case POST_ORDER_SUCCESS:
			return { ...state, isPostOrder: payload };
		case POST_ORDER_FAIL:
			return { ...state, isPostOrder: payload };
		case PUT_ORDER_SUCCESS:
			return { ...state, isPutOrder: payload };
		case PUT_ORDER_FAIL:
			return { ...state, isPutOrder: "fail" };
		case DELETE_ORDER_SUCCESS:
			return { ...state, order: payload };
		case DELETE_ORDER_FAIL:
			return { ...state, order: payload };
		default:
			return { ...state };
	}
};

export default OrderReducer;
