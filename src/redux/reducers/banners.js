import {
	GET_ALL_BANNER_SUCCESS,
	GET_ALL_BANNER_FAIL,
	GET_ALL_BANNER_ADMIN_SUCCESS,
	GET_ALL_BANNER_ADMIN_FAIL,
	GET_ALL_BANNER_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_BANNER_ADMIN_ACCOUNT_FAIL,
	GET_BANNER_DETAIL_SUCCESS,
	GET_BANNER_DETAIL_FAIL,
	SEARCH_BANNER_SUCCESS,
	SEARCH_BANNER_FAIL,
	POST_BANNER_SUCCESS,
	POST_BANNER_FAIL,
	PUT_BANNER_SUCCESS,
	PUT_BANNER_FAIL,
	DELETE_BANNER_SUCCESS,
	DELETE_BANNER_FAIL,
	START_QUERY
} from '../constants/banners';

const intialState = {
	isPutBanner: false,
	isPostBanner: false,
	isDeleteBannner: false
  };

const BannerReducer = (state =intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutBanner: false, isPostBanner: false , isDeleteBannner: false};
		case GET_ALL_BANNER_SUCCESS:
			return { ...state, bannerList: payload };
		case GET_ALL_BANNER_FAIL:
			return { ...state };

		case GET_ALL_BANNER_ADMIN_SUCCESS:
			return { ...state, bannerAdminList: payload };
		case GET_ALL_BANNER_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_BANNER_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, bannerAdminAccountList: payload };
		case GET_ALL_BANNER_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_BANNER_DETAIL_SUCCESS:
			return { ...state, bannerDetail: payload };
		case GET_BANNER_DETAIL_FAIL:
			return { ...state };
		case SEARCH_BANNER_SUCCESS:
			return { ...state, bannerListSearch: payload };
		case SEARCH_BANNER_FAIL:
			return { ...state };
		case POST_BANNER_SUCCESS:
			return { ...state, isPostBanner: payload };
		case POST_BANNER_FAIL:
			return { ...state, isPostBanner: 'fail' };
		case PUT_BANNER_SUCCESS:
			return { ...state, isPutBanner: payload };
		case PUT_BANNER_FAIL:
			return { ...state, isPutBanner: 'fail' };
		case DELETE_BANNER_SUCCESS:
			return { ...state, isDeleteBanner: payload };
		case DELETE_BANNER_FAIL:
			return { ...state, isDeleteBanner: 'fail' };
		default:
			return { ...state };
	}
};

export default BannerReducer;
