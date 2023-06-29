import {
	GET_ALL_OPERATINGSYSTEM_SUCCESS,
	GET_ALL_OPERATINGSYSTEM_FAIL,
	GET_OPERATINGSYSTEM_DETAIL_SUCCESS,
	GET_OPERATINGSYSTEM_DETAIL_FAIL,
	POST_OPERATINGSYSTEM_SUCCESS,
	POST_OPERATINGSYSTEM_FAIL,
	PUT_OPERATINGSYSTEM_SUCCESS,
	PUT_OPERATINGSYSTEM_FAIL,
	DELETE_OPERATINGSYSTEM_SUCCESS,
	DELETE_OPERATINGSYSTEM_FAIL,
	START_QUERY,
} from '../../constants/utils/operatingsystems';

const intialState = {
	isPutOperatingSystem: false,
	isPostOperatingSystem: false,
	isDeleteOperatingSystem: false,
};

const OperatingSystemReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutOperatingSystem: false, isPostOperatingSystem: false, isDeleteOperatingSystem: false };
		case GET_ALL_OPERATINGSYSTEM_SUCCESS:
			return { ...state, OperatingSystemList: payload };
		case GET_ALL_OPERATINGSYSTEM_FAIL:
			return { ...state };
		case GET_OPERATINGSYSTEM_DETAIL_SUCCESS:
			return { ...state, OperatingSystemDetail: payload };
		case GET_OPERATINGSYSTEM_DETAIL_FAIL:
			return { ...state };
		case POST_OPERATINGSYSTEM_SUCCESS:
			return { ...state, isPostOperatingSystem: payload };
		case POST_OPERATINGSYSTEM_FAIL:
			return { ...state, isPostOperatingSystem: payload };
		case PUT_OPERATINGSYSTEM_SUCCESS:
			return { ...state, isPutOperatingSystem: payload };
		case PUT_OPERATINGSYSTEM_FAIL:
			return { ...state, isPutOperatingSystem: payload };
		case DELETE_OPERATINGSYSTEM_SUCCESS:
			return { ...state, isDeleteOperatingSystem: payload };
		case DELETE_OPERATINGSYSTEM_FAIL:
			return { ...state, isDeleteOperatingSystem: payload };
		default:
			return { ...state };
	}
};

export default OperatingSystemReducer;
