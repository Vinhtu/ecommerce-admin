import axios from 'axios';
import {
	GET_ALL_TYPEWARRANTY_SUCCESS,
	GET_ALL_TYPEWARRANTY_FAIL,
	GET_TYPEWARRANTY_DETAIL_SUCCESS,
	GET_TYPEWARRANTY_DETAIL_FAIL,
	POST_TYPEWARRANTY_SUCCESS,
	POST_TYPEWARRANTY_FAIL,
	PUT_TYPEWARRANTY_SUCCESS,
	PUT_TYPEWARRANTY_FAIL,
	DELETE_TYPEWARRANTY_SUCCESS,
	DELETE_TYPEWARRANTY_FAIL,
	START_QUERY,
} from '../../constants/utils/typewarrantys';
import action from '../action';


export const PostTypeWarranty = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/typewarranty`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_TYPEWARRANTY_SUCCESS, res.data));
			})
			.catch((err) => {
				const typewarranty = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_TYPEWARRANTY_FAIL, typewarranty));
			});
	};
};

export const GetTypeWarrantys = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/typewarranty`)
			.then((res) => {
				dispatch(action(GET_ALL_TYPEWARRANTY_SUCCESS, res.data));
			})
			.catch((err) => {
				const typewarranty = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_TYPEWARRANTY_FAIL, typewarranty));
			});
	};
};

export const GetTypeWarranty = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/typewarranty/${id}`)
			.then((res) => {
				dispatch(action(GET_TYPEWARRANTY_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typewarranty = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_TYPEWARRANTY_DETAIL_FAIL, typewarranty));
			});
	};
};


export const PutTypeWarranty = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/typewarranty/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_TYPEWARRANTY_SUCCESS, res.data));
			})
			.catch((err) => {
				const typewarranty = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_TYPEWARRANTY_FAIL, typewarranty));
			});
	};
};

export const DeleteTypeWarranty = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/typewarranty/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_TYPEWARRANTY_SUCCESS, res.data));
			})
			.catch((err) => {
				const typewarranty = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_TYPEWARRANTY_FAIL, typewarranty));
			});
	};
};
