import {
	GET_ALL_SAMPLE_SUCCESS,
	GET_ALL_SAMPLE_FAIL,
	GET_SAMPLE_DETAIL_SUCCESS,
	GET_SAMPLE_DETAIL_FAIL,
	POST_SAMPLE_SUCCESS,
	POST_SAMPLE_FAIL,
	PUT_SAMPLE_SUCCESS,
	PUT_SAMPLE_FAIL,
	DELETE_SAMPLE_SUCCESS,
	DELETE_SAMPLE_FAIL,
	START_QUERY,
} from '../../constants/utils/samples';

const intialState = {
	isPutSample: false,
	isPostSample: false,
	isDeleteSample: false,
};

const SampleReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutSample: false, isPostSample: false, isDeleteSample: false };
		case GET_ALL_SAMPLE_SUCCESS:
			return { ...state, SampleList: payload };
		case GET_ALL_SAMPLE_FAIL:
			return { ...state };
		case GET_SAMPLE_DETAIL_SUCCESS:
			return { ...state, SampleDetail: payload };
		case GET_SAMPLE_DETAIL_FAIL:
			return { ...state };
		case POST_SAMPLE_SUCCESS:
			return { ...state, isPostSample: payload };
		case POST_SAMPLE_FAIL:
			return { ...state, isPostSample: payload };
		case PUT_SAMPLE_SUCCESS:
			return { ...state, isPutSample: payload };
		case PUT_SAMPLE_FAIL:
			return { ...state, isPutSample: payload };
		case DELETE_SAMPLE_SUCCESS:
			return { ...state, isDeleteSample: payload };
		case DELETE_SAMPLE_FAIL:
			return { ...state, isDeleteSample: payload };
		default:
			return { ...state };
	}
};

export default SampleReducer;
