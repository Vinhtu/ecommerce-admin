import {
	GET_ALL_TYPELOCK_SUCCESS,
	GET_ALL_TYPELOCK_FAIL,
	GET_TYPELOCK_DETAIL_SUCCESS,
	GET_TYPELOCK_DETAIL_FAIL,
	POST_TYPELOCK_SUCCESS,
	POST_TYPELOCK_FAIL,
	PUT_TYPELOCK_SUCCESS,
	PUT_TYPELOCK_FAIL,
	DELETE_TYPELOCK_SUCCESS,
	DELETE_TYPELOCK_FAIL,
	START_QUERY,
} from '../../constants/utils/typelocks';

const intialState = {
	isPutTypeLock: false,
	isPostTypeLock: false,
	isDeleteTypeLock: false,
};

const TypeLockReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutTypeLock: false, isPostTypeLock: false, isDeleteTypeLock: false };
		case GET_ALL_TYPELOCK_SUCCESS:
			return { ...state, TypeLockList: payload };
		case GET_ALL_TYPELOCK_FAIL:
			return { ...state };
		case GET_TYPELOCK_DETAIL_SUCCESS:
			return { ...state, TypeLockDetail: payload };
		case GET_TYPELOCK_DETAIL_FAIL:
			return { ...state };
		case POST_TYPELOCK_SUCCESS:
			return { ...state, isPostTypeLock: payload };
		case POST_TYPELOCK_FAIL:
			return { ...state, isPostTypeLock: payload };
		case PUT_TYPELOCK_SUCCESS:
			return { ...state, isPutTypeLock: payload };
		case PUT_TYPELOCK_FAIL:
			return { ...state, isPutTypeLock: payload };
		case DELETE_TYPELOCK_SUCCESS:
			return { ...state, isDeleteTypeLock: payload };
		case DELETE_TYPELOCK_FAIL:
			return { ...state, isDeleteTypeLock: payload };
		default:
			return { ...state };
	}
};

export default TypeLockReducer;
