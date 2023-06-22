import {
	GET_ALL_COLORADMIN_SUCCESS,
	GET_ALL_COLORADMIN_FAIL,
	GET_ALL_COLORADMIN_ADMIN_SUCCESS,
	GET_ALL_COLORADMIN_ADMIN_FAIL,
	GET_ALL_COLORADMIN_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_COLORADMIN_ADMIN_ACCOUNT_FAIL,
	GET_COLORADMIN_DETAIL_SUCCESS,
	GET_COLORADMIN_DETAIL_FAIL,
	SEARCH_COLORADMIN_SUCCESS,
	SEARCH_COLORADMIN_FAIL,
	POST_COLORADMIN_SUCCESS,
	POST_COLORADMIN_FAIL,
	PUT_COLORADMIN_SUCCESS,
	PUT_COLORADMIN_FAIL,
	DELETE_COLORADMIN_SUCCESS,
	DELETE_COLORADMIN_FAIL,
	START_QUERY,
} from '../constants/coloradmins';

const intialState = {
	isPutColoradmin: false,
	isPostColoradmin: false,
	isDeleteColoradmin: false
  };
const ColoradminReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutColoradmin: false, isPostColoradmin: false , isDeleteColoradmin: false};
		case GET_ALL_COLORADMIN_SUCCESS:
			return { ...state, coloradminList: payload };
		case GET_ALL_COLORADMIN_FAIL:
			return { ...state };

		case GET_ALL_COLORADMIN_ADMIN_SUCCESS:
			return { ...state, coloradminAdminList: payload };
		case GET_ALL_COLORADMIN_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_COLORADMIN_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, coloradminAdminAccountList: payload };
		case GET_ALL_COLORADMIN_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_COLORADMIN_DETAIL_SUCCESS:
			return { ...state, coloradminDetail: payload };
		case GET_COLORADMIN_DETAIL_FAIL:
			return { ...state };
		case SEARCH_COLORADMIN_SUCCESS:
			return { ...state, coloradminListSearch: payload };
		case SEARCH_COLORADMIN_FAIL:
			return { ...state };
		case POST_COLORADMIN_SUCCESS:
			return { ...state, isPostColoradmin: payload };
		case POST_COLORADMIN_FAIL:
			return { ...state, isPostColoradmin: payload };
		case PUT_COLORADMIN_SUCCESS:
			return { ...state, isPutColoradmin: payload };
		case PUT_COLORADMIN_FAIL:
			return { ...state, isPutColoradmin: payload };
		case DELETE_COLORADMIN_SUCCESS:
			return { ...state, isDeleteColoradmin: payload };
		case DELETE_COLORADMIN_FAIL:
			return { ...state, isDeleteColoradmin: payload };
		default:
			return { ...state };
	}
};

export default ColoradminReducer;
