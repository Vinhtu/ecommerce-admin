import {
	GET_ALL_STORAGECAPACITY_SUCCESS,
	GET_ALL_STORAGECAPACITY_FAIL,
	GET_STORAGECAPACITY_DETAIL_SUCCESS,
	GET_STORAGECAPACITY_DETAIL_FAIL,
	POST_STORAGECAPACITY_SUCCESS,
	POST_STORAGECAPACITY_FAIL,
	PUT_STORAGECAPACITY_SUCCESS,
	PUT_STORAGECAPACITY_FAIL,
	DELETE_STORAGECAPACITY_SUCCESS,
	DELETE_STORAGECAPACITY_FAIL,
	START_QUERY,
} from '../../constants/utils/storagecapacitys';

const intialState = {
	isPutStorageCapacity: false,
	isPostStorageCapacity: false,
	isDeleteStorageCapacity: false,
};

const StorageCapacityReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutStorageCapacity: false, isPostStorageCapacity: false, isDeleteStorageCapacity: false };
		case GET_ALL_STORAGECAPACITY_SUCCESS:
			return { ...state, StorageCapacityList: payload };
		case GET_ALL_STORAGECAPACITY_FAIL:
			return { ...state };
		case GET_STORAGECAPACITY_DETAIL_SUCCESS:
			return { ...state, StorageCapacityDetail: payload };
		case GET_STORAGECAPACITY_DETAIL_FAIL:
			return { ...state };
		case POST_STORAGECAPACITY_SUCCESS:
			return { ...state, isPostStorageCapacity: payload };
		case POST_STORAGECAPACITY_FAIL:
			return { ...state, isPostStorageCapacity: payload };
		case PUT_STORAGECAPACITY_SUCCESS:
			return { ...state, isPutStorageCapacity: payload };
		case PUT_STORAGECAPACITY_FAIL:
			return { ...state, isPutStorageCapacity: payload };
		case DELETE_STORAGECAPACITY_SUCCESS:
			return { ...state, isDeleteStorageCapacity: payload };
		case DELETE_STORAGECAPACITY_FAIL:
			return { ...state, isDeleteStorageCapacity: payload };
		default:
			return { ...state };
	}
};

export default StorageCapacityReducer;
