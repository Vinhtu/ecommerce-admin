import {
	GET_ALL_BRAND_SUCCESS,
	GET_ALL_BRAND_FAIL,
	GET_ALL_BRAND_ADMIN_SUCCESS,
	GET_ALL_BRAND_ADMIN_FAIL,
	GET_ALL_BRAND_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_BRAND_ADMIN_ACCOUNT_FAIL,
	GET_BRAND_DETAIL_SUCCESS,
	GET_BRAND_DETAIL_FAIL,
	SEARCH_BRAND_SUCCESS,
	SEARCH_BRAND_FAIL,
	POST_BRAND_SUCCESS,
	POST_BRAND_FAIL,
	PUT_BRAND_SUCCESS,
	PUT_BRAND_FAIL,
	DELETE_BRAND_SUCCESS,
	DELETE_BRAND_FAIL,
	START_QUERY
} from '../constants/brands';

const intialState = {
	isPutBrand: false,
	isPostBrand: false,
	isDeleteBrand: false
  };

const BrandReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutBrand: false, isPostBrand: false , isDeleteBrand: false};
		case GET_ALL_BRAND_SUCCESS:
			return { ...state, brandList: payload };
		case GET_ALL_BRAND_FAIL:
			return { ...state };

		case GET_ALL_BRAND_ADMIN_SUCCESS:
			return { ...state, brandAdminList: payload };
		case GET_ALL_BRAND_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_BRAND_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, brandAdminAccountList: payload };
		case GET_ALL_BRAND_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_BRAND_DETAIL_SUCCESS:
			return { ...state, brandDetail: payload };
		case GET_BRAND_DETAIL_FAIL:
			return { ...state };
		case SEARCH_BRAND_SUCCESS:
			return { ...state, brandListSearch: payload };
		case SEARCH_BRAND_FAIL:
			return { ...state };
		case POST_BRAND_SUCCESS:
			return { ...state, isPostBrand: payload };
		case POST_BRAND_FAIL:
			return { ...state, isPostBrand: payload };
		case PUT_BRAND_SUCCESS:
			return { ...state, isPutBrand: payload };
		case PUT_BRAND_FAIL:
			return { ...state, isPutBrand: payload };
		case DELETE_BRAND_SUCCESS:
			return { ...state, isDeleteBrand: payload };
		case DELETE_BRAND_FAIL:
			return { ...state, isDeleteBrand: payload };
		default:
			return { ...state };
	}
};

export default BrandReducer;
