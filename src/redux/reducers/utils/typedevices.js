import {
	GET_ALL_TYPEDEVICE_SUCCESS,
	GET_ALL_TYPEDEVICE_FAIL,
	GET_TYPEDEVICE_DETAIL_SUCCESS,
	GET_TYPEDEVICE_DETAIL_FAIL,
	POST_TYPEDEVICE_SUCCESS,
	POST_TYPEDEVICE_FAIL,
	PUT_TYPEDEVICE_SUCCESS,
	PUT_TYPEDEVICE_FAIL,
	DELETE_TYPEDEVICE_SUCCESS,
	DELETE_TYPEDEVICE_FAIL,
	START_QUERY,
} from '../../constants/utils/typedevices';

const intialState = {
	isPutTypeDevice: false,
	isPostTypeDevice: false,
	isDeleteTypeDevice: false,
};

const TypeDeviceReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutTypeDevice: false, isPostTypeDevice: false, isDeleteTypeDevice: false };
		case GET_ALL_TYPEDEVICE_SUCCESS:
			return { ...state, TypeDeviceList: payload };
		case GET_ALL_TYPEDEVICE_FAIL:
			return { ...state };
		case GET_TYPEDEVICE_DETAIL_SUCCESS:
			return { ...state, TypeDeviceDetail: payload };
		case GET_TYPEDEVICE_DETAIL_FAIL:
			return { ...state };
		case POST_TYPEDEVICE_SUCCESS:
			return { ...state, isPostTypeDevice: payload };
		case POST_TYPEDEVICE_FAIL:
			return { ...state, isPostTypeDevice: payload };
		case PUT_TYPEDEVICE_SUCCESS:
			return { ...state, isPutTypeDevice: payload };
		case PUT_TYPEDEVICE_FAIL:
			return { ...state, isPutTypeDevice: payload };
		case DELETE_TYPEDEVICE_SUCCESS:
			return { ...state, isDeleteTypeDevice: payload };
		case DELETE_TYPEDEVICE_FAIL:
			return { ...state, isDeleteTypeDevice: payload };
		default:
			return { ...state };
	}
};

export default TypeDeviceReducer;
