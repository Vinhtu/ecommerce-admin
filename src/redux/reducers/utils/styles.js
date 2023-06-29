import {
	GET_ALL_STYLE_SUCCESS,
	GET_ALL_STYLE_FAIL,
	GET_STYLE_DETAIL_SUCCESS,
	GET_STYLE_DETAIL_FAIL,
	POST_STYLE_SUCCESS,
	POST_STYLE_FAIL,
	PUT_STYLE_SUCCESS,
	PUT_STYLE_FAIL,
	DELETE_STYLE_SUCCESS,
	DELETE_STYLE_FAIL,
	START_QUERY,
} from '../../constants/utils/styles';

const intialState = {
	isPutStyle: false,
	isPostStyle: false,
	isDeleteStyle: false,
};

const StyleReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutStyle: false, isPostStyle: false, isDeleteStyle: false };
		case GET_ALL_STYLE_SUCCESS:
			return { ...state, StyleList: payload };
		case GET_ALL_STYLE_FAIL:
			return { ...state };
		case GET_STYLE_DETAIL_SUCCESS:
			return { ...state, StyleDetail: payload };
		case GET_STYLE_DETAIL_FAIL:
			return { ...state };
		case POST_STYLE_SUCCESS:
			return { ...state, isPostStyle: payload };
		case POST_STYLE_FAIL:
			return { ...state, isPostStyle: payload };
		case PUT_STYLE_SUCCESS:
			return { ...state, isPutStyle: payload };
		case PUT_STYLE_FAIL:
			return { ...state, isPutStyle: payload };
		case DELETE_STYLE_SUCCESS:
			return { ...state, isDeleteStyle: payload };
		case DELETE_STYLE_FAIL:
			return { ...state, isDeleteStyle: payload };
		default:
			return { ...state };
	}
};

export default StyleReducer;
