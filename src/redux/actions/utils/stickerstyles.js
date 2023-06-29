import axios from 'axios';
import {
	GET_ALL_STICKERSTYLE_SUCCESS,
	GET_ALL_STICKERSTYLE_FAIL,
	GET_STICKERSTYLE_DETAIL_SUCCESS,
	GET_STICKERSTYLE_DETAIL_FAIL,
	POST_STICKERSTYLE_SUCCESS,
	POST_STICKERSTYLE_FAIL,
	PUT_STICKERSTYLE_SUCCESS,
	PUT_STICKERSTYLE_FAIL,
	DELETE_STICKERSTYLE_SUCCESS,
	DELETE_STICKERSTYLE_FAIL,
	START_QUERY,
} from '../../constants/utils/stickerstyles';
import action from '../action';


export const PostStickerStyle = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/stickerstyle`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_STICKERSTYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const stickerstyle = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_STICKERSTYLE_FAIL, stickerstyle));
			});
	};
};

export const GetStickerStyles = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/stickerstyle`)
			.then((res) => {
				dispatch(action(GET_ALL_STICKERSTYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const stickerstyle = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_STICKERSTYLE_FAIL, stickerstyle));
			});
	};
};

export const GetStickerStyle = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/stickerstyle/${id}`)
			.then((res) => {
				dispatch(action(GET_STICKERSTYLE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const stickerstyle = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_STICKERSTYLE_DETAIL_FAIL, stickerstyle));
			});
	};
};

export const PutStickerStyle = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/stickerstyle/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_STICKERSTYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const stickerstyle = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_STICKERSTYLE_FAIL, stickerstyle));
			});
	};
};

export const DeleteStickerStyle = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/stickerstyle/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_STICKERSTYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const stickerstyle = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_STICKERSTYLE_FAIL, stickerstyle));
			});
	};
};
