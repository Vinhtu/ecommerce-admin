import {
	SET_NOTE,
	SET_LEANGUAGE,
	GET_PROVINCE_SUCCESS,
	GET_PROVINCE_FAIL,
	GET_DISTRICT_SUCCESS,
	GET_DISTRICT_FAIL,
	GET_WARD_SUCCESS,
	GET_WARD_FAIL,
  } from '../constants/utils';
  
  const intialState = {
	isPutAccount: false,
  };
  
  const UtilsReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;
  
	switch (type) {
	  case SET_NOTE:
		return { ...state, note: payload };
	  case SET_LEANGUAGE:
		return { ...state, language: payload };
  
	  case GET_PROVINCE_SUCCESS:
		return { ...state, provinceList: payload };
	  case GET_PROVINCE_FAIL:
		return { ...state, provinceList: payload };
  
	  case GET_DISTRICT_SUCCESS:
		return { ...state, districtList: payload };
	  case GET_DISTRICT_FAIL:
		return { ...state, districtList: payload };
  
	  case GET_WARD_SUCCESS:
		return { ...state, wardList: payload };
	  case GET_WARD_FAIL:
		return { ...state, wardList: payload };
	  default:
		return { ...state };
	}
  };
  
  export default UtilsReducer;
  