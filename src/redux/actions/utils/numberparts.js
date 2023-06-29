import axios from 'axios';
import {
	GET_ALL_NUMBERPART_SUCCESS,
	GET_ALL_NUMBERPART_FAIL,
	GET_NUMBERPART_DETAIL_SUCCESS,
	GET_NUMBERPART_DETAIL_FAIL,
	POST_NUMBERPART_SUCCESS,
	POST_NUMBERPART_FAIL,
	PUT_NUMBERPART_SUCCESS,
	PUT_NUMBERPART_FAIL,
	DELETE_NUMBERPART_SUCCESS,
	DELETE_NUMBERPART_FAIL,
	START_QUERY,
} from '../../constants/utils/numberparts';
import action from '../action';



export const PostNumberPart = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/numberpart`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_NUMBERPART_SUCCESS, res.data));
			})
			.catch((err) => {
				const numberpart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_NUMBERPART_FAIL, numberpart));
			});
	};
};

export const GetNumberParts = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/numberpart`)
			.then((res) => {
				dispatch(action(GET_ALL_NUMBERPART_SUCCESS, res.data));
			})
			.catch((err) => {
				const numberpart = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_NUMBERPART_FAIL, numberpart));
			});
	};
};


export const GetNumberPart = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/numberpart/${id}`)
			.then((res) => {
				dispatch(action(GET_NUMBERPART_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const numberpart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_NUMBERPART_DETAIL_FAIL, numberpart));
			});
	};
};



export const PutNumberPart = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/numberpart/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_NUMBERPART_SUCCESS, res.data));
			})
			.catch((err) => {
				const numberpart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_NUMBERPART_FAIL, numberpart));
			});
	};
};

export const DeleteNumberPart = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/numberpart/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_NUMBERPART_SUCCESS, res.data));
			})
			.catch((err) => {
				const numberpart = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_NUMBERPART_FAIL, numberpart));
			});
	};
};
