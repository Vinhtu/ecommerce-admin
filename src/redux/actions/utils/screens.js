import axios from 'axios';
import {
	GET_ALL_SCREEN_SUCCESS,
	GET_ALL_SCREEN_FAIL,
	GET_SCREEN_DETAIL_SUCCESS,
	GET_SCREEN_DETAIL_FAIL,
	POST_SCREEN_SUCCESS,
	POST_SCREEN_FAIL,
	PUT_SCREEN_SUCCESS,
	PUT_SCREEN_FAIL,
	DELETE_SCREEN_SUCCESS,
	DELETE_SCREEN_FAIL,
	START_QUERY,
} from '../../constants/utils/screens';
import action from '../action';

export const PostScreen = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/screen`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SCREEN_SUCCESS, res.data));
			})
			.catch((err) => {
				const screen = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SCREEN_FAIL, screen));
			});
	};
};

export const GetScreens = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/screen`)
			.then((res) => {
				dispatch(action(GET_ALL_SCREEN_SUCCESS, res.data));
			})
			.catch((err) => {
				const screen = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SCREEN_FAIL, screen));
			});
	};
};

export const GetScreen = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/screen/${id}`)
			.then((res) => {
				dispatch(action(GET_SCREEN_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const screen = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SCREEN_DETAIL_FAIL, screen));
			});
	};
};

export const PutScreen = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/screen/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SCREEN_SUCCESS, res.data));
			})
			.catch((err) => {
				const screen = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SCREEN_FAIL, screen));
			});
	};
};

export const DeleteScreen = (id, token) => {
	console.log(id, 'id');
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/screen/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SCREEN_SUCCESS, res.data));
			})
			.catch((err) => {
				const screen = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SCREEN_FAIL, screen));
			});
	};
};
