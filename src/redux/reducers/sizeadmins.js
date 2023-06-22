import {
	GET_ALL_SIZEADMIN_SUCCESS,
	GET_ALL_SIZEADMIN_FAIL,
	GET_ALL_SIZEADMIN_ADMIN_SUCCESS,
	GET_ALL_SIZEADMIN_ADMIN_FAIL,
	GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_FAIL,
	GET_SIZEADMIN_DETAIL_SUCCESS,
	GET_SIZEADMIN_DETAIL_FAIL,
	SEARCH_SIZEADMIN_SUCCESS,
	SEARCH_SIZEADMIN_FAIL,
	POST_SIZEADMIN_SUCCESS,
	POST_SIZEADMIN_FAIL,
	PUT_SIZEADMIN_SUCCESS,
	PUT_SIZEADMIN_FAIL,
	DELETE_SIZEADMIN_SUCCESS,
	DELETE_SIZEADMIN_FAIL,
	START_QUERY
} from '../constants/sizeadmins';

const intialState = {
	isPutSizeadmin: false,
	isPostSizeadmin: false,
	isDeleteSizeadmin: false
  };

const SizeadminReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutSizeadmin: false, isPostSizeadmin: false , isDeleteSizeadmin: false};
		case GET_ALL_SIZEADMIN_SUCCESS:
			return { ...state, sizeadminList: payload };
		case GET_ALL_SIZEADMIN_FAIL:
			return { ...state };

		case GET_ALL_SIZEADMIN_ADMIN_SUCCESS:
			return { ...state, sizeadminAdminList: payload };
		case GET_ALL_SIZEADMIN_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, sizeadminAdminAccountList: payload };
		case GET_ALL_SIZEADMIN_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_SIZEADMIN_DETAIL_SUCCESS:
			return { ...state, sizeadminDetail: payload };
		case GET_SIZEADMIN_DETAIL_FAIL:
			return { ...state };
		case SEARCH_SIZEADMIN_SUCCESS:
			return { ...state, sizeadminListSearch: payload };
		case SEARCH_SIZEADMIN_FAIL:
			return { ...state };
		case POST_SIZEADMIN_SUCCESS:
			return { ...state, isPostSizeadmin: payload };
		case POST_SIZEADMIN_FAIL:
			return { ...state, isPostSizeadmin: payload };
		case PUT_SIZEADMIN_SUCCESS:
			return { ...state, isPutSizeadmin: payload };
		case PUT_SIZEADMIN_FAIL:
			return { ...state, isPutSizeadmin: payload };
		case DELETE_SIZEADMIN_SUCCESS:
			return { ...state, isDeleteSizeadmin: payload };
		case DELETE_SIZEADMIN_FAIL:
			return { ...state, isDeleteSizeadmin: payload };
		default:
			return { ...state };
	}
};

export default SizeadminReducer;
