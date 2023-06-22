import {
	GET_ALL_COLOR_SUCCESS,
	GET_ALL_COLOR_FAIL,
	GET_ALL_COLOR_ADMIN_SUCCESS,
	GET_ALL_COLOR_ADMIN_FAIL,
	GET_ALL_COLOR_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_COLOR_ADMIN_ACCOUNT_FAIL,
	GET_COLOR_DETAIL_SUCCESS,
	GET_COLOR_DETAIL_FAIL,
	SEARCH_COLOR_SUCCESS,
	SEARCH_COLOR_FAIL,
	POST_COLOR_SUCCESS,
	POST_COLOR_FAIL,
	PUT_COLOR_SUCCESS,
	PUT_COLOR_FAIL,
	DELETE_COLOR_SUCCESS,
	DELETE_COLOR_FAIL,
	START_QUERY,
} from '../constants/colors';

const intialState = {
	isPutColor: false,
	isPostColor: false,
	isDeleteColor: false
  };
const ColorReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutColor: false, isPostColor: false , isDeleteColor: false};
		case GET_ALL_COLOR_SUCCESS:
			return { ...state, colorList: payload };
		case GET_ALL_COLOR_FAIL:
			return { ...state };

		case GET_ALL_COLOR_ADMIN_SUCCESS:
			return { ...state, colorAdminList: payload };
		case GET_ALL_COLOR_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_COLOR_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, colorAdminAccountList: payload };
		case GET_ALL_COLOR_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_COLOR_DETAIL_SUCCESS:
			return { ...state, colorDetail: payload };
		case GET_COLOR_DETAIL_FAIL:
			return { ...state };
		case SEARCH_COLOR_SUCCESS:
			return { ...state, colorListSearch: payload };
		case SEARCH_COLOR_FAIL:
			return { ...state };
		case POST_COLOR_SUCCESS:
			return { ...state, isPostColor: payload };
		case POST_COLOR_FAIL:
			return { ...state, isPostColor: payload };
		case PUT_COLOR_SUCCESS:
			return { ...state, isPutColor: payload };
		case PUT_COLOR_FAIL:
			return { ...state, isPutColor: payload };
		case DELETE_COLOR_SUCCESS:
			return { ...state, isDeleteColor: payload };
		case DELETE_COLOR_FAIL:
			return { ...state, isDeleteColor: payload };
		default:
			return { ...state };
	}
};

export default ColorReducer;
