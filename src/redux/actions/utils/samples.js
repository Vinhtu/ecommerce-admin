import axios from 'axios';
import {
	GET_ALL_SAMPLE_SUCCESS,
	GET_ALL_SAMPLE_FAIL,
	GET_SAMPLE_DETAIL_SUCCESS,
	GET_SAMPLE_DETAIL_FAIL,
	POST_SAMPLE_SUCCESS,
	POST_SAMPLE_FAIL,
	PUT_SAMPLE_SUCCESS,
	PUT_SAMPLE_FAIL,
	DELETE_SAMPLE_SUCCESS,
	DELETE_SAMPLE_FAIL,
	START_QUERY,
} from '../../constants/utils/samples';
import action from '../action';



export const PostSample = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/sample`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_SAMPLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const sample = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_SAMPLE_FAIL, sample));
			});
	};
};

export const GetSamples = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/sample`)
			.then((res) => {
				dispatch(action(GET_ALL_SAMPLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const sample = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_SAMPLE_FAIL, sample));
			});
	};
};


export const GetSample = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/sample/${id}`)
			.then((res) => {
				dispatch(action(GET_SAMPLE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const sample = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_SAMPLE_DETAIL_FAIL, sample));
			});
	};
};



export const PutSample = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/sample/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_SAMPLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const sample = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_SAMPLE_FAIL, sample));
			});
	};
};

export const DeleteSample = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/sample/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_SAMPLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const sample = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_SAMPLE_FAIL, sample));
			});
	};
};
