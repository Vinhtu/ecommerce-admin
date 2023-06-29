import {
	GET_ALL_RAM_SUCCESS,
	GET_ALL_RAM_FAIL,
	GET_RAM_DETAIL_SUCCESS,
	GET_RAM_DETAIL_FAIL,
	POST_RAM_SUCCESS,
	POST_RAM_FAIL,
	PUT_RAM_SUCCESS,
	PUT_RAM_FAIL,
	DELETE_RAM_SUCCESS,
	DELETE_RAM_FAIL,
	START_QUERY,
} from '../../constants/utils/rams';

const intialState = {
	isPutRam: false,
	isPostRam: false,
	isDeleteRam: false,
};

const RamReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutRam: false, isPostRam: false, isDeleteRam: false };
		case GET_ALL_RAM_SUCCESS:
			return { ...state, RamList: payload };
		case GET_ALL_RAM_FAIL:
			return { ...state };
		case GET_RAM_DETAIL_SUCCESS:
			return { ...state, RamDetail: payload };
		case GET_RAM_DETAIL_FAIL:
			return { ...state };
		case POST_RAM_SUCCESS:
			return { ...state, isPostRam: payload };
		case POST_RAM_FAIL:
			return { ...state, isPostRam: payload };
		case PUT_RAM_SUCCESS:
			return { ...state, isPutRam: payload };
		case PUT_RAM_FAIL:
			return { ...state, isPutRam: payload };
		case DELETE_RAM_SUCCESS:
			return { ...state, isDeleteRam: payload };
		case DELETE_RAM_FAIL:
			return { ...state, isDeleteRam: payload };
		default:
			return { ...state };
	}
};

export default RamReducer;
