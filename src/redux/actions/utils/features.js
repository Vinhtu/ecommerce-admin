import axios from 'axios';
import {
	GET_ALL_FEATURE_SUCCESS,
	GET_ALL_FEATURE_FAIL,
	GET_FEATURE_DETAIL_SUCCESS,
	GET_FEATURE_DETAIL_FAIL,
	POST_FEATURE_SUCCESS,
	POST_FEATURE_FAIL,
	PUT_FEATURE_SUCCESS,
	PUT_FEATURE_FAIL,
	DELETE_FEATURE_SUCCESS,
	DELETE_FEATURE_FAIL,
	START_QUERY,
} from '../../constants/utils/features';
import action from '../action';



export const PostFeature = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/feature`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_FEATURE_SUCCESS, res.data));
			})
			.catch((err) => {
				const feature = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_FEATURE_FAIL, feature));
			});
	};
};

export const GetFeatures = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/feature`)
			.then((res) => {
				dispatch(action(GET_ALL_FEATURE_SUCCESS, res.data));
			})
			.catch((err) => {
				const feature = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_FEATURE_FAIL, feature));
			});
	};
};


export const GetFeature = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/feature/${id}`)
			.then((res) => {
				dispatch(action(GET_FEATURE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const feature = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_FEATURE_DETAIL_FAIL, feature));
			});
	};
};



export const PutFeature = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/feature/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_FEATURE_SUCCESS, res.data));
			})
			.catch((err) => {
				const feature = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_FEATURE_FAIL, feature));
			});
	};
};

export const DeleteFeature = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/feature/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_FEATURE_SUCCESS, res.data));
			})
			.catch((err) => {
				const feature = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_FEATURE_FAIL, feature));
			});
	};
};
