import axios from 'axios';
import {
	GET_ALL_SCREENRESOLUTION_SUCCESS,
	GET_ALL_SCREENRESOLUTION_FAIL,
	GET_SCREENRESOLUTION_DETAIL_SUCCESS,
	GET_SCREENRESOLUTION_DETAIL_FAIL,
	POST_SCREENRESOLUTION_SUCCESS,
	POST_SCREENRESOLUTION_FAIL,
	PUT_SCREENRESOLUTION_SUCCESS,
	PUT_SCREENRESOLUTION_FAIL,
	DELETE_SCREENRESOLUTION_SUCCESS,
	DELETE_SCREENRESOLUTION_FAIL,
	START_QUERY,
} from '../../constants/utils/screenresolutions';
import action from '../action';


export const PostScreenResolution = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/screenresolution`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SCREENRESOLUTION_SUCCESS, res.data));
			})
			.catch((err) => {
				const screenresolution = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SCREENRESOLUTION_FAIL, screenresolution));
			});
	};
};

export const GetScreenResolutions = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/screenresolution`)
			.then((res) => {
				dispatch(action(GET_ALL_SCREENRESOLUTION_SUCCESS, res.data));
			})
			.catch((err) => {
				const screenresolution = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SCREENRESOLUTION_FAIL, screenresolution));
			});
	};
};

export const GetScreenResolution = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/screenresolution/${id}`)
			.then((res) => {
				dispatch(action(GET_SCREENRESOLUTION_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const screenresolution = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SCREENRESOLUTION_DETAIL_FAIL, screenresolution));
			});
	};
};

export const PutScreenResolution = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/screenresolution/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SCREENRESOLUTION_SUCCESS, res.data));
			})
			.catch((err) => {
				const screenresolution = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SCREENRESOLUTION_FAIL, screenresolution));
			});
	};
};

export const DeleteScreenResolution = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/screenresolution/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SCREENRESOLUTION_SUCCESS, res.data));
			})
			.catch((err) => {
				const screenresolution = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SCREENRESOLUTION_FAIL, screenresolution));
			});
	};
};
