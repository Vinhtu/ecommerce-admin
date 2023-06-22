import {
	GET_ALL_TEAM_SUCCESS,
	GET_ALL_TEAM_FAIL,
	GET_ALL_TEAM_ADMIN_SUCCESS,
	GET_ALL_TEAM_ADMIN_FAIL,
	GET_ALL_TEAM_ADMIN_ACCOUNT_SUCCESS,
	GET_ALL_TEAM_ADMIN_ACCOUNT_FAIL,
	GET_TEAM_DETAIL_SUCCESS,
	GET_TEAM_DETAIL_FAIL,
	SEARCH_TEAM_SUCCESS,
	SEARCH_TEAM_FAIL,
	POST_TEAM_SUCCESS,
	POST_TEAM_FAIL,
	PUT_TEAM_SUCCESS,
	PUT_TEAM_FAIL,
	DELETE_TEAM_SUCCESS,
	DELETE_TEAM_FAIL,
} from '../constants/teams';

// const intialState = {
// 	isPostNOTIFICATION: false,
// };

const TeamReducer = (state , action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_TEAM_SUCCESS:
			return { ...state, teamList: payload };
		case GET_ALL_TEAM_FAIL:
			return { ...state };

		case GET_ALL_TEAM_ADMIN_SUCCESS:
			return { ...state, teamAdminList: payload };
		case GET_ALL_TEAM_ADMIN_FAIL:
			return { ...state };
		case GET_ALL_TEAM_ADMIN_ACCOUNT_SUCCESS:
			return { ...state, teamAdminAccountList: payload };
		case GET_ALL_TEAM_ADMIN_ACCOUNT_FAIL:
			return { ...state };
			
		case GET_TEAM_DETAIL_SUCCESS:
			return { ...state, teamDetail: payload };
		case GET_TEAM_DETAIL_FAIL:
			return { ...state };
		case SEARCH_TEAM_SUCCESS:
			return { ...state, teamListSearch: payload };
		case SEARCH_TEAM_FAIL:
			return { ...state };
		case POST_TEAM_SUCCESS:
			return { ...state, isPostTeam: true };
		case POST_TEAM_FAIL:
			return { ...state, isPostTeam: false };
		case PUT_TEAM_SUCCESS:
			return { ...state, isPutTeam: true };
		case PUT_TEAM_FAIL:
			return { ...state, isPutTeam: false };
		case DELETE_TEAM_SUCCESS:
			return { ...state, team: payload };
		case DELETE_TEAM_FAIL:
			return { ...state, team: payload };
		default:
			return { ...state };
	}
};

export default TeamReducer;
