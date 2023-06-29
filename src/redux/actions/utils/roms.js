import axios from 'axios';
import {
	GET_ALL_ROM_SUCCESS,
	GET_ALL_ROM_FAIL,
	GET_ROM_DETAIL_SUCCESS,
	GET_ROM_DETAIL_FAIL,
	POST_ROM_SUCCESS,
	POST_ROM_FAIL,
	PUT_ROM_SUCCESS,
	PUT_ROM_FAIL,
	DELETE_ROM_SUCCESS,
	DELETE_ROM_FAIL,
	START_QUERY,
} from '../../constants/utils/roms';
import action from '../action';



export const PostRom = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/rom`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_ROM_SUCCESS, res.data));
			})
			.catch((err) => {
				const rom = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_ROM_FAIL, rom));
			});
	};
};

export const GetRoms = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/rom`)
			.then((res) => {
				dispatch(action(GET_ALL_ROM_SUCCESS, res.data));
			})
			.catch((err) => {
				const rom = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_ROM_FAIL, rom));
			});
	};
};


export const GetRom = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/rom/${id}`)
			.then((res) => {
				dispatch(action(GET_ROM_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const rom = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_ROM_DETAIL_FAIL, rom));
			});
	};
};



export const PutRom = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/rom/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_ROM_SUCCESS, res.data));
			})
			.catch((err) => {
				const rom = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_ROM_FAIL, rom));
			});
	};
};

export const DeleteRom = (id, token) => {
	console.log(id,'id')
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/rom/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_ROM_SUCCESS, res.data));
			})
			.catch((err) => {
				const rom = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_ROM_FAIL, rom));
			});
	};
};
