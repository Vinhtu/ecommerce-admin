import {
	GET_ALL_NUMBERPART_SUCCESS,
	GET_ALL_NUMBERPART_FAIL,
	GET_NUMBERPART_DETAIL_SUCCESS,
	GET_NUMBERPART_DETAIL_FAIL,
	POST_NUMBERPART_SUCCESS,
	POST_NUMBERPART_FAIL,
	PUT_NUMBERPART_SUCCESS,
	PUT_NUMBERPART_FAIL,
	DELETE_NUMBERPART_SUCCESS,
	DELETE_NUMBERPART_FAIL,
	START_QUERY,
} from '../../constants/utils/numberparts';

const intialState = {
	isPutNumberPart: false,
	isPostNumberPart: false,
	isDeleteNumberPart: false,
};

const NumberPartReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutNumberPart: false, isPostNumberPart: false, isDeleteNumberPart: false };
		case GET_ALL_NUMBERPART_SUCCESS:
			return { ...state, NumberPartList: payload };
		case GET_ALL_NUMBERPART_FAIL:
			return { ...state };
		case GET_NUMBERPART_DETAIL_SUCCESS:
			return { ...state, NumberPartDetail: payload };
		case GET_NUMBERPART_DETAIL_FAIL:
			return { ...state };
		case POST_NUMBERPART_SUCCESS:
			return { ...state, isPostNumberPart: payload };
		case POST_NUMBERPART_FAIL:
			return { ...state, isPostNumberPart: payload };
		case PUT_NUMBERPART_SUCCESS:
			return { ...state, isPutNumberPart: payload };
		case PUT_NUMBERPART_FAIL:
			return { ...state, isPutNumberPart: payload };
		case DELETE_NUMBERPART_SUCCESS:
			return { ...state, isDeleteNumberPart: payload };
		case DELETE_NUMBERPART_FAIL:
			return { ...state, isDeleteNumberPart: payload };
		default:
			return { ...state };
	}
};

export default NumberPartReducer;
