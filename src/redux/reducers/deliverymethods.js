import {
	GET_ALL_DELIVERYMETHOD_SUCCESS,
	GET_ALL_DELIVERYMETHOD_FAIL,
	GET_ALL_DELIVERYMETHOD_ADMIN_SUCCESS,
	GET_ALL_DELIVERYMETHOD_ADMIN_FAIL,
	GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_FAIL,
	GET_DELIVERYMETHOD_DETAIL_SUCCESS,
	GET_DELIVERYMETHOD_DETAIL_FAIL,
	SEARCH_DELIVERYMETHOD_SUCCESS,
	SEARCH_DELIVERYMETHOD_FAIL,
	POST_DELIVERYMETHOD_SUCCESS,
	POST_DELIVERYMETHOD_FAIL,
	PUT_DELIVERYMETHOD_SUCCESS,
	PUT_DELIVERYMETHOD_FAIL,
	DELETE_DELIVERYMETHOD_SUCCESS,
	DELETE_DELIVERYMETHOD_FAIL,
	START_QUERY
} from '../constants/deliverymethods';

const intialState = {
	isPutDeliveryMethod: false,
	isPostDeliveryMethod: false,
	isDeleteDeliveryMethod: false
  };

const DeliveryMethodReducer = (state = intialState , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutDeliveryMethod: false, isPostDeliveryMethod: false , isDeleteDeliveryMethod: false};
		case GET_ALL_DELIVERYMETHOD_SUCCESS:
			return { ...state, deliverymethodList: payload };
		case GET_ALL_DELIVERYMETHOD_FAIL:
			return { ...state };

		case GET_ALL_DELIVERYMETHOD_ADMIN_SUCCESS:
			return { ...state, deliverymethodAdminList: payload };
		case GET_ALL_DELIVERYMETHOD_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, deliverymethodAdminAccountList: payload };
		case GET_ALL_DELIVERYMETHOD_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_DELIVERYMETHOD_DETAIL_SUCCESS:
			return { ...state, deliverymethodDetail: payload };
		case GET_DELIVERYMETHOD_DETAIL_FAIL:
			return { ...state };
		case SEARCH_DELIVERYMETHOD_SUCCESS:
			return { ...state, deliverymethodListSearch: payload };
		case SEARCH_DELIVERYMETHOD_FAIL:
			return { ...state };
		case POST_DELIVERYMETHOD_SUCCESS:
			return { ...state, isPostDeliveryMethod: payload };
		case POST_DELIVERYMETHOD_FAIL:
			return { ...state, isPostDeliveryMethod: payload };
		case PUT_DELIVERYMETHOD_SUCCESS:
			return { ...state, isPutDeliveryMethod: payload };
		case PUT_DELIVERYMETHOD_FAIL:
			return { ...state, isPutDeliveryMethod: payload };
		case DELETE_DELIVERYMETHOD_SUCCESS:
			return { ...state, isDeleteDeliveryMethod: payload };
		case DELETE_DELIVERYMETHOD_FAIL:
			return { ...state, isDeleteDeliveryMethod: payload };
		default:
			return { ...state };
	}
};

export default DeliveryMethodReducer;
