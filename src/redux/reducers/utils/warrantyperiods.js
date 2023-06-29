import {
	GET_ALL_WARRANTYPERIOD_SUCCESS,
	GET_ALL_WARRANTYPERIOD_FAIL,
	GET_WARRANTYPERIOD_DETAIL_SUCCESS,
	GET_WARRANTYPERIOD_DETAIL_FAIL,
	POST_WARRANTYPERIOD_SUCCESS,
	POST_WARRANTYPERIOD_FAIL,
	PUT_WARRANTYPERIOD_SUCCESS,
	PUT_WARRANTYPERIOD_FAIL,
	DELETE_WARRANTYPERIOD_SUCCESS,
	DELETE_WARRANTYPERIOD_FAIL,
	START_QUERY,
} from '../../constants/utils/warrantyperiods';

const intialState = {
	isPutWarrantyPeriod: false,
	isPostWarrantyPeriod: false,
	isDeleteWarrantyPeriod: false,
};

const WarrantyPeriodReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutWarrantyPeriod: false, isPostWarrantyPeriod: false, isDeleteWarrantyPeriod: false };
		case GET_ALL_WARRANTYPERIOD_SUCCESS:
			return { ...state, WarrantyPeriodList: payload };
		case GET_ALL_WARRANTYPERIOD_FAIL:
			return { ...state };
		case GET_WARRANTYPERIOD_DETAIL_SUCCESS:
			return { ...state, WarrantyPeriodDetail: payload };
		case GET_WARRANTYPERIOD_DETAIL_FAIL:
			return { ...state };
		case POST_WARRANTYPERIOD_SUCCESS:
			return { ...state, isPostWarrantyPeriod: payload };
		case POST_WARRANTYPERIOD_FAIL:
			return { ...state, isPostWarrantyPeriod: payload };
		case PUT_WARRANTYPERIOD_SUCCESS:
			return { ...state, isPutWarrantyPeriod: payload };
		case PUT_WARRANTYPERIOD_FAIL:
			return { ...state, isPutWarrantyPeriod: payload };
		case DELETE_WARRANTYPERIOD_SUCCESS:
			return { ...state, isDeleteWarrantyPeriod: payload };
		case DELETE_WARRANTYPERIOD_FAIL:
			return { ...state, isDeleteWarrantyPeriod: payload };
		default:
			return { ...state };
	}
};

export default WarrantyPeriodReducer;
