import {
	GET_ALL_TYPEWARRANTY_SUCCESS,
	GET_ALL_TYPEWARRANTY_FAIL,
	GET_TYPEWARRANTY_DETAIL_SUCCESS,
	GET_TYPEWARRANTY_DETAIL_FAIL,
	POST_TYPEWARRANTY_SUCCESS,
	POST_TYPEWARRANTY_FAIL,
	PUT_TYPEWARRANTY_SUCCESS,
	PUT_TYPEWARRANTY_FAIL,
	DELETE_TYPEWARRANTY_SUCCESS,
	DELETE_TYPEWARRANTY_FAIL,
	START_QUERY,
} from '../../constants/utils/typewarrantys';

const intialState = {
	isPutTypeWarrannty: false,
	isPostTypeWarrannty: false,
	isDeleteTypeWarrannty: false,
};

const TypeWarranntyReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutTypeWarrannty: false, isPostTypeWarrannty: false, isDeleteTypeWarrannty: false };
		case GET_ALL_TYPEWARRANTY_SUCCESS:
			return { ...state, TypeWarranntyList: payload };
		case GET_ALL_TYPEWARRANTY_FAIL:
			return { ...state };
		case GET_TYPEWARRANTY_DETAIL_SUCCESS:
			return { ...state, TypeWarranntyDetail: payload };
		case GET_TYPEWARRANTY_DETAIL_FAIL:
			return { ...state };
		case POST_TYPEWARRANTY_SUCCESS:
			return { ...state, isPostTypeWarrannty: payload };
		case POST_TYPEWARRANTY_FAIL:
			return { ...state, isPostTypeWarrannty: payload };
		case PUT_TYPEWARRANTY_SUCCESS:
			return { ...state, isPutTypeWarrannty: payload };
		case PUT_TYPEWARRANTY_FAIL:
			return { ...state, isPutTypeWarrannty: payload };
		case DELETE_TYPEWARRANTY_SUCCESS:
			return { ...state, isDeleteTypeWarrannty: payload };
		case DELETE_TYPEWARRANTY_FAIL:
			return { ...state, isDeleteTypeWarrannty: payload };
		default:
			return { ...state };
	}
};

export default TypeWarranntyReducer;
