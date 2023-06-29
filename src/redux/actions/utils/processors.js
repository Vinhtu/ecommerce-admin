import axios from 'axios';
import {
	GET_ALL_PROCESSOR_SUCCESS,
	GET_ALL_PROCESSOR_FAIL,
	GET_PROCESSOR_DETAIL_SUCCESS,
	GET_PROCESSOR_DETAIL_FAIL,
	POST_PROCESSOR_SUCCESS,
	POST_PROCESSOR_FAIL,
	PUT_PROCESSOR_SUCCESS,
	PUT_PROCESSOR_FAIL,
	DELETE_PROCESSOR_SUCCESS,
	DELETE_PROCESSOR_FAIL,
	START_QUERY,
} from '../../constants/utils/processors';
import action from '../action';


export const PostProcessor = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/processor`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_PROCESSOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const processor = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_PROCESSOR_FAIL, processor));
			});
	};
};

export const GetProcessors = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/processor`)
			.then((res) => {
				dispatch(action(GET_ALL_PROCESSOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const processor = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_PROCESSOR_FAIL, processor));
			});
	};
};


export const GetProcessor = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/processor/${id}`)
			.then((res) => {
				dispatch(action(GET_PROCESSOR_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const processor = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_PROCESSOR_DETAIL_FAIL, processor));
			});
	};
};



export const PutProcessor = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/processor/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_PROCESSOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const processor = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_PROCESSOR_FAIL, processor));
			});
	};
};

export const DeleteProcessor = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/processor/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_PROCESSOR_SUCCESS, res.data));
			})
			.catch((err) => {
				const processor = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_PROCESSOR_FAIL, processor));
			});
	};
};
