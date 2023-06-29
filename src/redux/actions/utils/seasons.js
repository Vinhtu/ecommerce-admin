import axios from 'axios';
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
import action from '../action';



export const PostSeason = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/season`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SEASON_SUCCESS, res.data));
			})
			.catch((err) => {
				const season = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SEASON_FAIL, season));
			});
	};
};

export const GetSeasons = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/season`)
			.then((res) => {
				dispatch(action(GET_ALL_SEASON_SUCCESS, res.data));
			})
			.catch((err) => {
				const season = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SEASON_FAIL, season));
			});
	};
};


export const GetSeason = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/season/${id}`)
			.then((res) => {
				dispatch(action(GET_SEASON_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const season = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SEASON_DETAIL_FAIL, season));
			});
	};
};



export const PutSeason = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/season/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SEASON_SUCCESS, res.data));
			})
			.catch((err) => {
				const season = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SEASON_FAIL, season));
			});
	};
};

export const DeleteSeason = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/season/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SEASON_SUCCESS, res.data));
			})
			.catch((err) => {
				const season = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SEASON_FAIL, season));
			});
	};
};
