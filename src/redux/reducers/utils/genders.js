import {
	GET_ALL_GENDER_SUCCESS,
	GET_ALL_GENDER_FAIL,
	GET_GENDER_DETAIL_SUCCESS,
	GET_GENDER_DETAIL_FAIL,
	POST_GENDER_SUCCESS,
	POST_GENDER_FAIL,
	PUT_GENDER_SUCCESS,
	PUT_GENDER_FAIL,
	DELETE_GENDER_SUCCESS,
	DELETE_GENDER_FAIL,
	START_QUERY,
} from '../../constants/utils/genders';

const intialState = {
	isPutGender: false,
	isPostGender: false,
	isDeleteGender: false,
};

const GenderReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutGender: false, isPostGender: false, isDeleteGender: false };
		case GET_ALL_GENDER_SUCCESS:
			return { ...state, GenderList: payload };
		case GET_ALL_GENDER_FAIL:
			return { ...state };
		case GET_GENDER_DETAIL_SUCCESS:
			return { ...state, GenderDetail: payload };
		case GET_GENDER_DETAIL_FAIL:
			return { ...state };
		case POST_GENDER_SUCCESS:
			return { ...state, isPostGender: payload };
		case POST_GENDER_FAIL:
			return { ...state, isPostGender: payload };
		case PUT_GENDER_SUCCESS:
			return { ...state, isPutGender: payload };
		case PUT_GENDER_FAIL:
			return { ...state, isPutGender: payload };
		case DELETE_GENDER_SUCCESS:
			return { ...state, isDeleteGender: payload };
		case DELETE_GENDER_FAIL:
			return { ...state, isDeleteGender: payload };
		default:
			return { ...state };
	}
};

export default GenderReducer;
