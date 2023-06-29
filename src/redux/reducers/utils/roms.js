import {
	GET_ALL_ROM_SUCCESS,
	GET_ALL_ROM_FAIL,
	GET_ROM_DETAIL_SUCCESS,
	GET_ROM_DETAIL_FAIL,
	POST_ROM_SUCCESS,
	POST_ROM_FAIL,
	PUT_ROM_SUCCESS,
	PUT_ROM_FAIL,
	DELETE_ROM_SUCCESS,
	DELETE_ROM_FAIL,
	START_QUERY,
} from '../../constants/utils/roms';

const intialState = {
	isPutRom: false,
	isPostRom: false,
	isDeleteRom: false,
};

const RomReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutRom: false, isPostRom: false, isDeleteRom: false };
		case GET_ALL_ROM_SUCCESS:
			return { ...state, RomList: payload };
		case GET_ALL_ROM_FAIL:
			return { ...state };
		case GET_ROM_DETAIL_SUCCESS:
			return { ...state, RomDetail: payload };
		case GET_ROM_DETAIL_FAIL:
			return { ...state };
		case POST_ROM_SUCCESS:
			return { ...state, isPostRom: payload };
		case POST_ROM_FAIL:
			return { ...state, isPostRom: payload };
		case PUT_ROM_SUCCESS:
			return { ...state, isPutRom: payload };
		case PUT_ROM_FAIL:
			return { ...state, isPutRom: payload };
		case DELETE_ROM_SUCCESS:
			return { ...state, isDeleteRom: payload };
		case DELETE_ROM_FAIL:
			return { ...state, isDeleteRom: payload };
		default:
			return { ...state };
	}
};

export default RomReducer;
