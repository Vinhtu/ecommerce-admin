import {
	GET_ALL_PROCESSOR_SUCCESS,
	GET_ALL_PROCESSOR_FAIL,
	GET_PROCESSOR_DETAIL_SUCCESS,
	GET_PROCESSOR_DETAIL_FAIL,
	POST_PROCESSOR_SUCCESS,
	POST_PROCESSOR_FAIL,
	PUT_PROCESSOR_SUCCESS,
	PUT_PROCESSOR_FAIL,
	DELETE_PROCESSOR_SUCCESS,
	DELETE_PROCESSOR_FAIL,
	START_QUERY,
} from '../../constants/utils/processors';

const intialState = {
	isPutProcessor: false,
	isPostProcessor: false,
	isDeleteProcessor: false,
};

const ProcessorReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutProcessor: false, isPostProcessor: false, isDeleteProcessor: false };
		case GET_ALL_PROCESSOR_SUCCESS:
			return { ...state, ProcessorList: payload };
		case GET_ALL_PROCESSOR_FAIL:
			return { ...state };
		case GET_PROCESSOR_DETAIL_SUCCESS:
			return { ...state, ProcessorDetail: payload };
		case GET_PROCESSOR_DETAIL_FAIL:
			return { ...state };
		case POST_PROCESSOR_SUCCESS:
			return { ...state, isPostProcessor: payload };
		case POST_PROCESSOR_FAIL:
			return { ...state, isPostProcessor: payload };
		case PUT_PROCESSOR_SUCCESS:
			return { ...state, isPutProcessor: payload };
		case PUT_PROCESSOR_FAIL:
			return { ...state, isPutProcessor: payload };
		case DELETE_PROCESSOR_SUCCESS:
			return { ...state, isDeleteProcessor: payload };
		case DELETE_PROCESSOR_FAIL:
			return { ...state, isDeleteProcessor: payload };
		default:
			return { ...state };
	}
};

export default ProcessorReducer;
