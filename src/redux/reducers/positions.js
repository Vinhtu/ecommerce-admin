import {
	GET_ALL_POSITION_SUCCESS,
	GET_ALL_POSITION_FAIL,
	GET_ALL_POSITION_ADMIN_SUCCESS,
	GET_ALL_POSITION_ADMIN_FAIL,
	GET_ALL_POSITION_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_POSITION_ADMIN_ACCOUNT_FAIL,
	GET_POSITION_DETAIL_SUCCESS,
	GET_POSITION_DETAIL_FAIL,
	SEARCH_POSITION_SUCCESS,
	SEARCH_POSITION_FAIL,
	POST_POSITION_SUCCESS,
	POST_POSITION_FAIL,
	PUT_POSITION_SUCCESS,
	PUT_POSITION_FAIL,
	DELETE_POSITION_SUCCESS,
	DELETE_POSITION_FAIL,
} from '../constants/positions';

// const intialState = {
// 	isPostPOSITION: false,
// };

const PositionReducer = (state , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_POSITION_SUCCESS:
			return { ...state, positionList: payload };
		case GET_ALL_POSITION_FAIL:
			return { ...state };

		case GET_ALL_POSITION_ADMIN_SUCCESS:
			return { ...state, positionAdminList: payload };
		case GET_ALL_POSITION_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_POSITION_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, positionAdminAccountList: payload };
		case GET_ALL_POSITION_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_POSITION_DETAIL_SUCCESS:
			return { ...state, positionDetail: payload };
		case GET_POSITION_DETAIL_FAIL:
			return { ...state };
		case SEARCH_POSITION_SUCCESS:
			return { ...state, positionListSearch: payload };
		case SEARCH_POSITION_FAIL:
			return { ...state };
		case POST_POSITION_SUCCESS:
			return { ...state, isPostPosition: true };
		case POST_POSITION_FAIL:
			return { ...state, isPostPosition: false };
		case PUT_POSITION_SUCCESS:
			return { ...state, isPutPosition: true };
		case PUT_POSITION_FAIL:
			return { ...state, isPutPosition: false };
		case DELETE_POSITION_SUCCESS:
			return { ...state, position: payload };
		case DELETE_POSITION_FAIL:
			return { ...state, position: payload };
		default:
			return { ...state };
	}
};

export default PositionReducer;
