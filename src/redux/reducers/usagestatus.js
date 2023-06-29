import {
	GET_ALL_USAGESTATUS_SUCCESS,
	GET_ALL_USAGESTATUS_FAIL,
	GET_ALL_USAGESTATUS_ADMIN_SUCCESS,
	GET_ALL_USAGESTATUS_ADMIN_FAIL,
	GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_FAIL,
	GET_USAGESTATUS_DETAIL_SUCCESS,
	GET_USAGESTATUS_DETAIL_FAIL,
	SEARCH_USAGESTATUS_SUCCESS,
	SEARCH_USAGESTATUS_FAIL,
	POST_USAGESTATUS_SUCCESS,
	POST_USAGESTATUS_FAIL,
	PUT_USAGESTATUS_SUCCESS,
	PUT_USAGESTATUS_FAIL,
	DELETE_USAGESTATUS_SUCCESS,
	DELETE_USAGESTATUS_FAIL,
	START_QUERY
} from '../constants/usagestatus';

const intialState = {
	isPutUsageStatus: false,
	isPostUsageStatus: false,
	isDeleteUsageStatus: false
  };

const UsageStatusReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutUsageStatus: false, isPostUsageStatus: false , isDeleteUsageStatus: false};
		case GET_ALL_USAGESTATUS_SUCCESS:
			return { ...state, usagestatusList: payload };
		case GET_ALL_USAGESTATUS_FAIL:
			return { ...state };

		case GET_ALL_USAGESTATUS_ADMIN_SUCCESS:
			return { ...state, usagestatusAdminList: payload };
		case GET_ALL_USAGESTATUS_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, usagestatusAdminAccountList: payload };
		case GET_ALL_USAGESTATUS_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_USAGESTATUS_DETAIL_SUCCESS:
			return { ...state, usagestatusDetail: payload };
		case GET_USAGESTATUS_DETAIL_FAIL:
			return { ...state };
		case SEARCH_USAGESTATUS_SUCCESS:
			return { ...state, usagestatusListSearch: payload };
		case SEARCH_USAGESTATUS_FAIL:
			return { ...state };
		case POST_USAGESTATUS_SUCCESS:
			return { ...state, isPostUsageStatus: payload };
		case POST_USAGESTATUS_FAIL:
			return { ...state, isPostUsageStatus: payload };
		case PUT_USAGESTATUS_SUCCESS:
			return { ...state, isPutUsageStatus: payload };
		case PUT_USAGESTATUS_FAIL:
			return { ...state, isPutUsageStatus: payload };
		case DELETE_USAGESTATUS_SUCCESS:
			return { ...state, isDeleteUsageStatus: payload };
		case DELETE_USAGESTATUS_FAIL:
			return { ...state, isDeleteUsageStatus: payload };
		default:
			return { ...state };
	}
};

export default UsageStatusReducer;
