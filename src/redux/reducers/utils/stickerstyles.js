import {
	GET_ALL_STICKERSTYLE_SUCCESS,
	GET_ALL_STICKERSTYLE_FAIL,
	GET_STICKERSTYLE_DETAIL_SUCCESS,
	GET_STICKERSTYLE_DETAIL_FAIL,
	POST_STICKERSTYLE_SUCCESS,
	POST_STICKERSTYLE_FAIL,
	PUT_STICKERSTYLE_SUCCESS,
	PUT_STICKERSTYLE_FAIL,
	DELETE_STICKERSTYLE_SUCCESS,
	DELETE_STICKERSTYLE_FAIL,
	START_QUERY,
} from '../../constants/utils/stickerstyles';

const intialState = {
	isPutStickerStyle: false,
	isPostStickerStyle: false,
	isDeleteStickerStyle: false,
};

const StickerStyleReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutStickerStyle: false, isPostStickerStyle: false, isDeleteStickerStyle: false };
		case GET_ALL_STICKERSTYLE_SUCCESS:
			return { ...state, StickerStyleList: payload };
		case GET_ALL_STICKERSTYLE_FAIL:
			return { ...state };
		case GET_STICKERSTYLE_DETAIL_SUCCESS:
			return { ...state, StickerStyleDetail: payload };
		case GET_STICKERSTYLE_DETAIL_FAIL:
			return { ...state };
		case POST_STICKERSTYLE_SUCCESS:
			return { ...state, isPostStickerStyle: payload };
		case POST_STICKERSTYLE_FAIL:
			return { ...state, isPostStickerStyle: payload };
		case PUT_STICKERSTYLE_SUCCESS:
			return { ...state, isPutStickerStyle: payload };
		case PUT_STICKERSTYLE_FAIL:
			return { ...state, isPutStickerStyle: payload };
		case DELETE_STICKERSTYLE_SUCCESS:
			return { ...state, isDeleteStickerStyle: payload };
		case DELETE_STICKERSTYLE_FAIL:
			return { ...state, isDeleteStickerStyle: payload };
		default:
			return { ...state };
	}
};

export default StickerStyleReducer;
