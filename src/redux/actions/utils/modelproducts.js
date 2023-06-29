import axios from 'axios';
import {
	GET_ALL_MODELPRODUCT_SUCCESS,
	GET_ALL_MODELPRODUCT_FAIL,
	GET_MODELPRODUCT_DETAIL_SUCCESS,
	GET_MODELPRODUCT_DETAIL_FAIL,
	POST_MODELPRODUCT_SUCCESS,
	POST_MODELPRODUCT_FAIL,
	PUT_MODELPRODUCT_SUCCESS,
	PUT_MODELPRODUCT_FAIL,
	DELETE_MODELPRODUCT_SUCCESS,
	DELETE_MODELPRODUCT_FAIL,
	START_QUERY,
} from '../../constants/utils/modelproducts';
import action from '../action';



export const PostModelProduct = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/modelproduct`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_MODELPRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const modelproduct = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_MODELPRODUCT_FAIL, modelproduct));
			});
	};
};

export const GetModelProducts = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/modelproduct`)
			.then((res) => {
				dispatch(action(GET_ALL_MODELPRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const modelproduct = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_MODELPRODUCT_FAIL, modelproduct));
			});
	};
};

export const GetModelProduct = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/modelproduct/${id}`)
			.then((res) => {
				dispatch(action(GET_MODELPRODUCT_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const modelproduct = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_MODELPRODUCT_DETAIL_FAIL, modelproduct));
			});
	};
};

export const PutModelProduct = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/modelproduct/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_MODELPRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const modelproduct = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_MODELPRODUCT_FAIL, modelproduct));
			});
	};
};

export const DeleteModelProduct = (id, token) => {
	console.log(id, 'id');
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/modelproduct/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_MODELPRODUCT_SUCCESS, res.data));
			})
			.catch((err) => {
				const modelproduct = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_MODELPRODUCT_FAIL, modelproduct));
			});
	};
};
