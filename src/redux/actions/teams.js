import axios from 'axios';
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
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))



export const PostTeam = (data) => {
	return (dispatch) => {
		axios
			.post(`http://localhost:8080/api/team`, data)
			.then((res) => {
				dispatch(action(POST_TEAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const team = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_TEAM_FAIL, team));
			});
	};
};

export const GetTeams = () => {
	return async (dispatch) => {
		
			await axios
				.get(`http://localhost:8080/api/team`)
				.then((res) => {
					dispatch(action(GET_ALL_TEAM_SUCCESS, res.data));
				})
				.catch((err) => {
					const team = {
						open: true,
						severity: 'error',
						message: err,
					};
					dispatch(action(GET_ALL_TEAM_FAIL, team));
				});
	
	};
};


export const GetAdminTeams = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/team/admin/all`)
				.then((res) => {
					dispatch(action(GET_ALL_TEAM_ADMIN_SUCCESS, res.data));
				})
				.catch((err) => {
					const team = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_TEAM_ADMIN_FAIL, team));
				});
	
	};
};
export const GetAdminAccountTeams = () => {
	return async (dispatch) => {
			await axios
				.get(`http://localhost:8080/api/team/admin/account`)
				.then((res) => {
					dispatch(action(GET_ALL_TEAM_ADMIN_ACCOUNT_SUCCESS, res.data));
				})
				.catch((err) => {
					const team = {
						open: true,
						severity: 'error',
						message: err.request.responseText,
					};
					dispatch(action(GET_ALL_TEAM_ADMIN_ACCOUNT_FAIL, team));
				});
	
	};
};
export const GetTeam = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/team/${id}`)
			.then((res) => {
				dispatch(action(GET_TEAM_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const team = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_TEAM_DETAIL_FAIL, team));
			});
	};
};

export const SearchTeam = (id) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:8080/api/team/${id}`)
			.then((res) => {
				dispatch(action(SEARCH_TEAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const team = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(SEARCH_TEAM_FAIL, team));
			});
	};
};

export const PutTeam = (id, data) => {
	return (dispatch) => {
		axios
			.put(`http://localhost:8080/api/team/${id}`, data)
			.then((res) => {
				dispatch(action(PUT_TEAM_SUCCESS, res.data));
			})
			.catch((err) => {
				const team = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_TEAM_FAIL, team));
			});
	};
};

export const DeleteTeam = (id) => {
	

	return (dispatch) => {
		axios
			.delete(`http://localhost:8080/api/team/${id}`)
			.then((res) => {
				dispatch(action(DELETE_TEAM_SUCCESS, res.data));
				
			})
			.catch((err) => {
				const team = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_TEAM_FAIL, team));
			});
	};
};
