import {
	GET_ALL_SIZE_SUCCESS,
	GET_ALL_SIZE_FAIL,
	GET_ALL_SIZE_ADMIN_SUCCESS,
	GET_ALL_SIZE_ADMIN_FAIL,
	GET_ALL_SIZE_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_SIZE_ADMIN_ACCOUNT_FAIL,
	GET_SIZE_DETAIL_SUCCESS,
	GET_SIZE_DETAIL_FAIL,
	SEARCH_SIZE_SUCCESS,
	SEARCH_SIZE_FAIL,
	POST_SIZE_SUCCESS,
	POST_SIZE_FAIL,
	PUT_SIZE_SUCCESS,
	PUT_SIZE_FAIL,
	DELETE_SIZE_SUCCESS,
	DELETE_SIZE_FAIL,
	START_QUERY
} from '../constants/sizes';

const intialState = {
	isPutSize: false,
	isPostSize: false,
	isDeleteSize: false
  };

const SizeReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutSize: false, isPostSize: false , isDeleteSize: false};
		case GET_ALL_SIZE_SUCCESS:
			return { ...state, sizeList: payload };
		case GET_ALL_SIZE_FAIL:
			return { ...state };

		case GET_ALL_SIZE_ADMIN_SUCCESS:
			return { ...state, sizeAdminList: payload };
		case GET_ALL_SIZE_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_SIZE_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, sizeAdminAccountList: payload };
		case GET_ALL_SIZE_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_SIZE_DETAIL_SUCCESS:
			return { ...state, sizeDetail: payload };
		case GET_SIZE_DETAIL_FAIL:
			return { ...state };
		case SEARCH_SIZE_SUCCESS:
			return { ...state, sizeListSearch: payload };
		case SEARCH_SIZE_FAIL:
			return { ...state };
		case POST_SIZE_SUCCESS:
			return { ...state, isPostSize: payload };
		case POST_SIZE_FAIL:
			return { ...state, isPostSize: payload };
		case PUT_SIZE_SUCCESS:
			return { ...state, isPutSize: payload };
		case PUT_SIZE_FAIL:
			return { ...state, isPutSize: payload };
		case DELETE_SIZE_SUCCESS:
			return { ...state, isDeleteSize: payload };
		case DELETE_SIZE_FAIL:
			return { ...state, isDeleteSize: payload };
		default:
			return { ...state };
	}
};

export default SizeReducer;
