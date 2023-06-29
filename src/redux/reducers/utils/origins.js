import {
	GET_ALL_ORIGIN_SUCCESS,
	GET_ALL_ORIGIN_FAIL,
	GET_ORIGIN_DETAIL_SUCCESS,
	GET_ORIGIN_DETAIL_FAIL,
	POST_ORIGIN_SUCCESS,
	POST_ORIGIN_FAIL,
	PUT_ORIGIN_SUCCESS,
	PUT_ORIGIN_FAIL,
	DELETE_ORIGIN_SUCCESS,
	DELETE_ORIGIN_FAIL,
	START_QUERY,
} from '../../constants/utils/origins';

const intialState = {
	isPutOrigin: false,
	isPostOrigin: false,
	isDeleteOrigin: false,
};

const OriginReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutOrigin: false, isPostOrigin: false, isDeleteOrigin: false };
		case GET_ALL_ORIGIN_SUCCESS:
			return { ...state, OriginList: payload };
		case GET_ALL_ORIGIN_FAIL:
			return { ...state };
		case GET_ORIGIN_DETAIL_SUCCESS:
			return { ...state, OriginDetail: payload };
		case GET_ORIGIN_DETAIL_FAIL:
			return { ...state };
		case POST_ORIGIN_SUCCESS:
			return { ...state, isPostOrigin: payload };
		case POST_ORIGIN_FAIL:
			return { ...state, isPostOrigin: payload };
		case PUT_ORIGIN_SUCCESS:
			return { ...state, isPutOrigin: payload };
		case PUT_ORIGIN_FAIL:
			return { ...state, isPutOrigin: payload };
		case DELETE_ORIGIN_SUCCESS:
			return { ...state, isDeleteOrigin: payload };
		case DELETE_ORIGIN_FAIL:
			return { ...state, isDeleteOrigin: payload };
		default:
			return { ...state };
	}
};

export default OriginReducer;
