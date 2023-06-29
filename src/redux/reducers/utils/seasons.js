import {
	GET_ALL_SEASON_SUCCESS,
	GET_ALL_SEASON_FAIL,
	GET_SEASON_DETAIL_SUCCESS,
	GET_SEASON_DETAIL_FAIL,
	POST_SEASON_SUCCESS,
	POST_SEASON_FAIL,
	PUT_SEASON_SUCCESS,
	PUT_SEASON_FAIL,
	DELETE_SEASON_SUCCESS,
	DELETE_SEASON_FAIL,
	START_QUERY,
} from '../../constants/utils/seasons';

const intialState = {
	isPutSeason: false,
	isPostSeason: false,
	isDeleteSeason: false,
};

const SeasonReducer = (state = intialState, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case START_QUERY:
			return { ...state, isPutSeason: false, isPostSeason: false, isDeleteSeason: false };
		case GET_ALL_SEASON_SUCCESS:
			return { ...state, SeasonList: payload };
		case GET_ALL_SEASON_FAIL:
			return { ...state };
		case GET_SEASON_DETAIL_SUCCESS:
			return { ...state, SeasonDetail: payload };
		case GET_SEASON_DETAIL_FAIL:
			return { ...state };
		case POST_SEASON_SUCCESS:
			return { ...state, isPostSeason: payload };
		case POST_SEASON_FAIL:
			return { ...state, isPostSeason: payload };
		case PUT_SEASON_SUCCESS:
			return { ...state, isPutSeason: payload };
		case PUT_SEASON_FAIL:
			return { ...state, isPutSeason: payload };
		case DELETE_SEASON_SUCCESS:
			return { ...state, isDeleteSeason: payload };
		case DELETE_SEASON_FAIL:
			return { ...state, isDeleteSeason: payload };
		default:
			return { ...state };
	}
};

export default SeasonReducer;
