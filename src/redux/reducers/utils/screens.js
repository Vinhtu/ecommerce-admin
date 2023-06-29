import {
	GET_ALL_SCREEN_SUCCESS,
	GET_ALL_SCREEN_FAIL,
	GET_SCREEN_DETAIL_SUCCESS,
	GET_SCREEN_DETAIL_FAIL,
	POST_SCREEN_SUCCESS,
	POST_SCREEN_FAIL,
	PUT_SCREEN_SUCCESS,
	PUT_SCREEN_FAIL,
	DELETE_SCREEN_SUCCESS,
	DELETE_SCREEN_FAIL,
	START_QUERY,
} from '../../constants/utils/screens';

const intialState = {
	isPutScreen: false,
	isPostScreen: false,
	isDeleteScreen: false,
};

const ScreenReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutScreen: false, isPostScreen: false, isDeleteScreen: false };
		case GET_ALL_SCREEN_SUCCESS:
			return { ...state, ScreenList: payload };
		case GET_ALL_SCREEN_FAIL:
			return { ...state };
		case GET_SCREEN_DETAIL_SUCCESS:
			return { ...state, ScreenDetail: payload };
		case GET_SCREEN_DETAIL_FAIL:
			return { ...state };
		case POST_SCREEN_SUCCESS:
			return { ...state, isPostScreen: payload };
		case POST_SCREEN_FAIL:
			return { ...state, isPostScreen: payload };
		case PUT_SCREEN_SUCCESS:
			return { ...state, isPutScreen: payload };
		case PUT_SCREEN_FAIL:
			return { ...state, isPutScreen: payload };
		case DELETE_SCREEN_SUCCESS:
			return { ...state, isDeleteScreen: payload };
		case DELETE_SCREEN_FAIL:
			return { ...state, isDeleteScreen: payload };
		default:
			return { ...state };
	}
};

export default ScreenReducer;
