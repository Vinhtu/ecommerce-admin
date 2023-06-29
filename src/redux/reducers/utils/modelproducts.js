import {
	GET_ALL_MODELPRODUCT_SUCCESS,
	GET_ALL_MODELPRODUCT_FAIL,

	GET_MODELPRODUCT_DETAIL_SUCCESS,
	GET_MODELPRODUCT_DETAIL_FAIL,

	POST_MODELPRODUCT_SUCCESS,
	POST_MODELPRODUCT_FAIL,
	PUT_MODELPRODUCT_SUCCESS,
	PUT_MODELPRODUCT_FAIL,
	DELETE_MODELPRODUCT_SUCCESS,
	DELETE_MODELPRODUCT_FAIL,
	START_QUERY,
} from '../../constants/utils/modelproducts';

const intialState = {
	isPutModelProduct: false,
	isPostModelProduct: false,
	isDeleteModelProduct: false,
};

const ModelProductReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutModelProduct: false, isPostModelProduct: false, isDeleteModelProduct: false };
		case GET_ALL_MODELPRODUCT_SUCCESS:
			return { ...state, ModelProductList: payload };
		case GET_ALL_MODELPRODUCT_FAIL:
			return { ...state };
		case GET_MODELPRODUCT_DETAIL_SUCCESS:
			return { ...state, ModelProductDetail: payload };
		case GET_MODELPRODUCT_DETAIL_FAIL:
			return { ...state };
		case POST_MODELPRODUCT_SUCCESS:
			return { ...state, isPostModelProduct: payload };
		case POST_MODELPRODUCT_FAIL:
			return { ...state, isPostModelProduct: payload };
		case PUT_MODELPRODUCT_SUCCESS:
			return { ...state, isPutModelProduct: payload };
		case PUT_MODELPRODUCT_FAIL:
			return { ...state, isPutModelProduct: payload };
		case DELETE_MODELPRODUCT_SUCCESS:
			return { ...state, isDeleteModelProduct: payload };
		case DELETE_MODELPRODUCT_FAIL:
			return { ...state, isDeleteModelProduct: payload };
		default:
			return { ...state };
	}
};

export default ModelProductReducer;
