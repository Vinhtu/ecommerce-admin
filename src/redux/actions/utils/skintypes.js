import axios from 'axios';
import {
	GET_ALL_SKINTYPE_SUCCESS,
	GET_ALL_SKINTYPE_FAIL,
	GET_SKINTYPE_DETAIL_SUCCESS,
	GET_SKINTYPE_DETAIL_FAIL,
	POST_SKINTYPE_SUCCESS,
	POST_SKINTYPE_FAIL,
	PUT_SKINTYPE_SUCCESS,
	PUT_SKINTYPE_FAIL,
	DELETE_SKINTYPE_SUCCESS,
	DELETE_SKINTYPE_FAIL,
	START_QUERY,
} from '../../constants/utils/skintypes';
import action from '../action';

export const PostSkinType = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/skintype`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SKINTYPE_SUCCESS, res.data));
			})
			.catch((err) => {
				const skintype = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SKINTYPE_FAIL, skintype));
			});
	};
};

export const GetSkinTypes = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/skintype`)
			.then((res) => {
				dispatch(action(GET_ALL_SKINTYPE_SUCCESS, res.data));
			})
			.catch((err) => {
				const skintype = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SKINTYPE_FAIL, skintype));
			});
	};
};

export const GetSkinType = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/skintype/${id}`)
			.then((res) => {
				dispatch(action(GET_SKINTYPE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const skintype = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SKINTYPE_DETAIL_FAIL, skintype));
			});
	};
};

export const PutSkinType = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/skintype/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SKINTYPE_SUCCESS, res.data));
			})
			.catch((err) => {
				const skintype = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SKINTYPE_FAIL, skintype));
			});
	};
};

export const DeleteSkinType = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/skintype/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SKINTYPE_SUCCESS, res.data));
			})
			.catch((err) => {
				const skintype = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SKINTYPE_FAIL, skintype));
			});
	};
};
