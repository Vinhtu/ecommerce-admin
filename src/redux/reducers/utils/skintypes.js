import {
	GET_ALL_SKINTYPE_SUCCESS,
	GET_ALL_SKINTYPE_FAIL,
	GET_SKINTYPE_DETAIL_SUCCESS,
	GET_SKINTYPE_DETAIL_FAIL,
	POST_SKINTYPE_SUCCESS,
	POST_SKINTYPE_FAIL,
	PUT_SKINTYPE_SUCCESS,
	PUT_SKINTYPE_FAIL,
	DELETE_SKINTYPE_SUCCESS,
	DELETE_SKINTYPE_FAIL,
	START_QUERY,
} from '../../constants/utils/skintypes';

const intialState = {
	isPutSkinType: false,
	isPostSkinType: false,
	isDeleteSkinType: false,
};

const SkinTypeReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutSkinType: false, isPostSkinType: false, isDeleteSkinType: false };
		case GET_ALL_SKINTYPE_SUCCESS:
			return { ...state, SkinTypeList: payload };
		case GET_ALL_SKINTYPE_FAIL:
			return { ...state };
		case GET_SKINTYPE_DETAIL_SUCCESS:
			return { ...state, SkinTypeDetail: payload };
		case GET_SKINTYPE_DETAIL_FAIL:
			return { ...state };
		case POST_SKINTYPE_SUCCESS:
			return { ...state, isPostSkinType: payload };
		case POST_SKINTYPE_FAIL:
			return { ...state, isPostSkinType: payload };
		case PUT_SKINTYPE_SUCCESS:
			return { ...state, isPutSkinType: payload };
		case PUT_SKINTYPE_FAIL:
			return { ...state, isPutSkinType: payload };
		case DELETE_SKINTYPE_SUCCESS:
			return { ...state, isDeleteSkinType: payload };
		case DELETE_SKINTYPE_FAIL:
			return { ...state, isDeleteSkinType: payload };
		default:
			return { ...state };
	}
};

export default SkinTypeReducer;
