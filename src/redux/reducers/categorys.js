import {
	GET_ALL_CATEGORY_SUCCESS,
	GET_ALL_CATEGORY_FAIL,
	GET_ALL_CATEGORY_ADMIN_SUCCESS,
	GET_ALL_CATEGORY_ADMIN_FAIL,
	GET_ALL_CATEGORY_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_CATEGORY_ADMIN_ACCOUNT_FAIL,
	GET_CATEGORY_DETAIL_SUCCESS,
	GET_CATEGORY_DETAIL_FAIL,
	SEARCH_CATEGORY_SUCCESS,
	SEARCH_CATEGORY_FAIL,
	POST_CATEGORY_SUCCESS,
	POST_CATEGORY_FAIL,
	PUT_CATEGORY_SUCCESS,
	PUT_CATEGORY_FAIL,
	DELETE_CATEGORY_SUCCESS,
	DELETE_CATEGORY_FAIL,
	START_QUERY

} from '../constants/categorys';

const intialState = {
	isPutCategory: false,
	isPostCategory: false,
	isDeleteCategory: false
  };

const CategoryReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutCategory: false, isPostCategory: false , isDeleteCategory: false};
		case GET_ALL_CATEGORY_SUCCESS:
			return { ...state, categoryList: payload };
		case GET_ALL_CATEGORY_FAIL:
			return { ...state };

		case GET_ALL_CATEGORY_ADMIN_SUCCESS:
			return { ...state, categoryAdminList: payload };
		case GET_ALL_CATEGORY_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_CATEGORY_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, categoryAdminAccountList: payload };
		case GET_ALL_CATEGORY_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_CATEGORY_DETAIL_SUCCESS:
			return { ...state, categoryDetail: payload };
		case GET_CATEGORY_DETAIL_FAIL:
			return { ...state };
		case SEARCH_CATEGORY_SUCCESS:
			return { ...state, categoryListSearch: payload };
		case SEARCH_CATEGORY_FAIL:
			return { ...state };
		case POST_CATEGORY_SUCCESS:
			return { ...state, isPostCategory: payload };
		case POST_CATEGORY_FAIL:
			return { ...state, isPostCategory: payload };
		case PUT_CATEGORY_SUCCESS:
			return { ...state, isPutCategory: payload };
		case PUT_CATEGORY_FAIL:
			return { ...state, isPutCategory: payload };
		case DELETE_CATEGORY_SUCCESS:
			return { ...state, isDeleteCategory: payload };
		case DELETE_CATEGORY_FAIL:
			return { ...state, isDeleteCategory: payload };
		default:
			return { ...state };
	}
};

export default CategoryReducer;
