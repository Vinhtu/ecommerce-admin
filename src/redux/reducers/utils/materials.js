import {
	GET_ALL_MATERIAL_SUCCESS,
	GET_ALL_MATERIAL_FAIL,
	GET_MATERIAL_DETAIL_SUCCESS,
	GET_MATERIAL_DETAIL_FAIL,
	POST_MATERIAL_SUCCESS,
	POST_MATERIAL_FAIL,
	PUT_MATERIAL_SUCCESS,
	PUT_MATERIAL_FAIL,
	DELETE_MATERIAL_SUCCESS,
	DELETE_MATERIAL_FAIL,
	START_QUERY,
} from '../../constants/utils/materials';

const intialState = {
	isPutMaterial: false,
	isPostMaterial: false,
	isDeleteMaterial: false,
};

const MaterialReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutMaterial: false, isPostMaterial: false, isDeleteMaterial: false };
		case GET_ALL_MATERIAL_SUCCESS:
			return { ...state, MaterialList: payload };
		case GET_ALL_MATERIAL_FAIL:
			return { ...state };
		case GET_MATERIAL_DETAIL_SUCCESS:
			return { ...state, MaterialDetail: payload };
		case GET_MATERIAL_DETAIL_FAIL:
			return { ...state };
		case POST_MATERIAL_SUCCESS:
			return { ...state, isPostMaterial: payload };
		case POST_MATERIAL_FAIL:
			return { ...state, isPostMaterial: payload };
		case PUT_MATERIAL_SUCCESS:
			return { ...state, isPutMaterial: payload };
		case PUT_MATERIAL_FAIL:
			return { ...state, isPutMaterial: payload };
		case DELETE_MATERIAL_SUCCESS:
			return { ...state, isDeleteMaterial: payload };
		case DELETE_MATERIAL_FAIL:
			return { ...state, isDeleteMaterial: payload };
		default:
			return { ...state };
	}
};

export default MaterialReducer;
