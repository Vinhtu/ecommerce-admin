import {
	GET_ALL_FEATURE_SUCCESS,
	GET_ALL_FEATURE_FAIL,
	GET_FEATURE_DETAIL_SUCCESS,
	GET_FEATURE_DETAIL_FAIL,
	POST_FEATURE_SUCCESS,
	POST_FEATURE_FAIL,
	PUT_FEATURE_SUCCESS,
	PUT_FEATURE_FAIL,
	DELETE_FEATURE_SUCCESS,
	DELETE_FEATURE_FAIL,
	START_QUERY,
} from '../../constants/utils/features';

const intialState = {
	isPutFeature: false,
	isPostFeature: false,
	isDeleteFeature: false,
};

const FeatureReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutFeature: false, isPostFeature: false, isDeleteFeature: false };
		case GET_ALL_FEATURE_SUCCESS:
			return { ...state, FeatureList: payload };
		case GET_ALL_FEATURE_FAIL:
			return { ...state };
		case GET_FEATURE_DETAIL_SUCCESS:
			return { ...state, FeatureDetail: payload };
		case GET_FEATURE_DETAIL_FAIL:
			return { ...state };
		case POST_FEATURE_SUCCESS:
			return { ...state, isPostFeature: payload };
		case POST_FEATURE_FAIL:
			return { ...state, isPostFeature: payload };
		case PUT_FEATURE_SUCCESS:
			return { ...state, isPutFeature: payload };
		case PUT_FEATURE_FAIL:
			return { ...state, isPutFeature: payload };
		case DELETE_FEATURE_SUCCESS:
			return { ...state, isDeleteFeature: payload };
		case DELETE_FEATURE_FAIL:
			return { ...state, isDeleteFeature: payload };
		default:
			return { ...state };
	}
};

export default FeatureReducer;
