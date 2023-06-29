import axios from 'axios';
import {
	GET_ALL_TYPELOCK_SUCCESS,
	GET_ALL_TYPELOCK_FAIL,
	GET_TYPELOCK_DETAIL_SUCCESS,
	GET_TYPELOCK_DETAIL_FAIL,
	POST_TYPELOCK_SUCCESS,
	POST_TYPELOCK_FAIL,
	PUT_TYPELOCK_SUCCESS,
	PUT_TYPELOCK_FAIL,
	DELETE_TYPELOCK_SUCCESS,
	DELETE_TYPELOCK_FAIL,
	START_QUERY,
} from '../../constants/utils/typelocks';
import action from '../action';


export const PostTypeLock = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/typelock`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_TYPELOCK_SUCCESS, res.data));
			})
			.catch((err) => {
				const typelock = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_TYPELOCK_FAIL, typelock));
			});
	};
};

export const GetTypeLocks = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/typelock`)
			.then((res) => {
				dispatch(action(GET_ALL_TYPELOCK_SUCCESS, res.data));
			})
			.catch((err) => {
				const typelock = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_TYPELOCK_FAIL, typelock));
			});
	};
};


export const GetTypeLock = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/typelock/${id}`)
			.then((res) => {
				dispatch(action(GET_TYPELOCK_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typelock = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_TYPELOCK_DETAIL_FAIL, typelock));
			});
	};
};



export const PutTypeLock = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/typelock/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_TYPELOCK_SUCCESS, res.data));
			})
			.catch((err) => {
				const typelock = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_TYPELOCK_FAIL, typelock));
			});
	};
};

export const DeleteTypeLock = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/typelock/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_TYPELOCK_SUCCESS, res.data));
			})
			.catch((err) => {
				const typelock = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_TYPELOCK_FAIL, typelock));
			});
	};
};
