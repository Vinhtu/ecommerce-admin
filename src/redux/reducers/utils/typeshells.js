import {
	GET_ALL_TYPESHELL_SUCCESS,
	GET_ALL_TYPESHELL_FAIL,
	GET_TYPESHELL_DETAIL_SUCCESS,
	GET_TYPESHELL_DETAIL_FAIL,
	POST_TYPESHELL_SUCCESS,
	POST_TYPESHELL_FAIL,
	PUT_TYPESHELL_SUCCESS,
	PUT_TYPESHELL_FAIL,
	DELETE_TYPESHELL_SUCCESS,
	DELETE_TYPESHELL_FAIL,
	START_QUERY,
} from '../../constants/utils/typeshells';

const intialState = {
	isPutTypeShell: false,
	isPostTypeShell: false,
	isDeleteTypeShell: false,
};

const TypeShellReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutTypeShell: false, isPostTypeShell: false, isDeleteTypeShell: false };
		case GET_ALL_TYPESHELL_SUCCESS:
			return { ...state, TypeShellList: payload };
		case GET_ALL_TYPESHELL_FAIL:
			return { ...state };
		case GET_TYPESHELL_DETAIL_SUCCESS:
			return { ...state, TypeShellDetail: payload };
		case GET_TYPESHELL_DETAIL_FAIL:
			return { ...state };
		case POST_TYPESHELL_SUCCESS:
			return { ...state, isPostTypeShell: payload };
		case POST_TYPESHELL_FAIL:
			return { ...state, isPostTypeShell: payload };
		case PUT_TYPESHELL_SUCCESS:
			return { ...state, isPutTypeShell: payload };
		case PUT_TYPESHELL_FAIL:
			return { ...state, isPutTypeShell: payload };
		case DELETE_TYPESHELL_SUCCESS:
			return { ...state, isDeleteTypeShell: payload };
		case DELETE_TYPESHELL_FAIL:
			return { ...state, isDeleteTypeShell: payload };
		default:
			return { ...state };
	}
};

export default TypeShellReducer;
