import {
	GET_ALL_PRODUCT_SUCCESS,
	GET_ALL_PRODUCT_FAIL,
	GET_ALL_PRODUCT_ADMIN_SUCCESS,
	GET_ALL_PRODUCT_ADMIN_FAIL,
	GET_ALL_PRODUCT_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_PRODUCT_ADMIN_ACCOUNT_FAIL,
	GET_PRODUCT_DETAIL_SUCCESS,
	GET_PRODUCT_DETAIL_FAIL,
	SEARCH_PRODUCT_SUCCESS,
	SEARCH_PRODUCT_FAIL,
	POST_PRODUCT_SUCCESS,
	POST_PRODUCT_FAIL,
	PUT_PRODUCT_SUCCESS,
	PUT_PRODUCT_FAIL,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	START_QUERY
} from '../constants/products';

const intialState = {
	isPutProduct: false,
	isPostProduct: false,
	isDeleteProduct: false
  };

const ProductReducer = (state = intialState  , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutProduct: false, isPostProduct: false , isDeleteProduct: false};
		case GET_ALL_PRODUCT_SUCCESS:
			return { ...state, productList: payload };
		case GET_ALL_PRODUCT_FAIL:
			return { ...state };

		case GET_ALL_PRODUCT_ADMIN_SUCCESS:
			return { ...state, productAdminList: payload };
		case GET_ALL_PRODUCT_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_PRODUCT_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, productAdminAccountList: payload };
		case GET_ALL_PRODUCT_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_PRODUCT_DETAIL_SUCCESS:
			return { ...state, productDetail: payload };
		case GET_PRODUCT_DETAIL_FAIL:
			return { ...state };
		case SEARCH_PRODUCT_SUCCESS:
			return { ...state, productListSearch: payload };
		case SEARCH_PRODUCT_FAIL:
			return { ...state };
		case POST_PRODUCT_SUCCESS:
			return { ...state, isPostProduct: payload };
		case POST_PRODUCT_FAIL:
			return { ...state, isPostProduct: 'fail' };
		case PUT_PRODUCT_SUCCESS:
			return { ...state, isPutProduct: payload };
		case PUT_PRODUCT_FAIL:
			return { ...state, isPutProduct: 'fail' };
		case DELETE_PRODUCT_SUCCESS:
			return { ...state, isDeleteProduct: payload };
		case DELETE_PRODUCT_FAIL:
			return { ...state, isDeleteProduct: 'fail' };
		default:
			return { ...state };
	}
};

export default ProductReducer;
