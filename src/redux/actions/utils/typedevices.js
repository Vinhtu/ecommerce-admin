import axios from 'axios';
import {
	GET_ALL_TYPEDEVICE_SUCCESS,
	GET_ALL_TYPEDEVICE_FAIL,
	GET_TYPEDEVICE_DETAIL_SUCCESS,
	GET_TYPEDEVICE_DETAIL_FAIL,
	POST_TYPEDEVICE_SUCCESS,
	POST_TYPEDEVICE_FAIL,
	PUT_TYPEDEVICE_SUCCESS,
	PUT_TYPEDEVICE_FAIL,
	DELETE_TYPEDEVICE_SUCCESS,
	DELETE_TYPEDEVICE_FAIL,
	START_QUERY,
} from '../../constants/utils/typedevices';
import action from '../action';



export const PostTypeDevice = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/typedevice`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_TYPEDEVICE_SUCCESS, res.data));
			})
			.catch((err) => {
				const typedevice = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_TYPEDEVICE_FAIL, typedevice));
			});
	};
};

export const GetTypeDevices = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/typedevice`)
			.then((res) => {
				dispatch(action(GET_ALL_TYPEDEVICE_SUCCESS, res.data));
			})
			.catch((err) => {
				const typedevice = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_TYPEDEVICE_FAIL, typedevice));
			});
	};
};


export const GetTypeDevice = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/typedevice/${id}`)
			.then((res) => {
				dispatch(action(GET_TYPEDEVICE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const typedevice = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_TYPEDEVICE_DETAIL_FAIL, typedevice));
			});
	};
};



export const PutTypeDevice = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/typedevice/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_TYPEDEVICE_SUCCESS, res.data));
			})
			.catch((err) => {
				const typedevice = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_TYPEDEVICE_FAIL, typedevice));
			});
	};
};

export const DeleteTypeDevice = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/typedevice/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_TYPEDEVICE_SUCCESS, res.data));
			})
			.catch((err) => {
				const typedevice = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_TYPEDEVICE_FAIL, typedevice));
			});
	};
};
