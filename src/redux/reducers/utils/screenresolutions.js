import {
	GET_ALL_SCREENRESOLUTION_SUCCESS,
	GET_ALL_SCREENRESOLUTION_FAIL,
	GET_SCREENRESOLUTION_DETAIL_SUCCESS,
	GET_SCREENRESOLUTION_DETAIL_FAIL,
	POST_SCREENRESOLUTION_SUCCESS,
	POST_SCREENRESOLUTION_FAIL,
	PUT_SCREENRESOLUTION_SUCCESS,
	PUT_SCREENRESOLUTION_FAIL,
	DELETE_SCREENRESOLUTION_SUCCESS,
	DELETE_SCREENRESOLUTION_FAIL,
	START_QUERY,
} from '../../constants/utils/screenresolutions';

const intialState = {
	isPutScreenResolution: false,
	isPostScreenResolution: false,
	isDeleteScreenResolution: false,
};

const ScreenResolutionReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutScreenResolution: false, isPostScreenResolution: false, isDeleteScreenResolution: false };
		case GET_ALL_SCREENRESOLUTION_SUCCESS:
			return { ...state, ScreenResolutionList: payload };
		case GET_ALL_SCREENRESOLUTION_FAIL:
			return { ...state };
		case GET_SCREENRESOLUTION_DETAIL_SUCCESS:
			return { ...state, ScreenResolutionDetail: payload };
		case GET_SCREENRESOLUTION_DETAIL_FAIL:
			return { ...state };
		case POST_SCREENRESOLUTION_SUCCESS:
			return { ...state, isPostScreenResolution: payload };
		case POST_SCREENRESOLUTION_FAIL:
			return { ...state, isPostScreenResolution: payload };
		case PUT_SCREENRESOLUTION_SUCCESS:
			return { ...state, isPutScreenResolution: payload };
		case PUT_SCREENRESOLUTION_FAIL:
			return { ...state, isPutScreenResolution: payload };
		case DELETE_SCREENRESOLUTION_SUCCESS:
			return { ...state, isDeleteScreenResolution: payload };
		case DELETE_SCREENRESOLUTION_FAIL:
			return { ...state, isDeleteScreenResolution: payload };
		default:
			return { ...state };
	}
};

export default ScreenResolutionReducer;
