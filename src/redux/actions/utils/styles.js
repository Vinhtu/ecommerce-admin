import axios from 'axios';
import {
	GET_ALL_STYLE_SUCCESS,
	GET_ALL_STYLE_FAIL,
	GET_STYLE_DETAIL_SUCCESS,
	GET_STYLE_DETAIL_FAIL,
	POST_STYLE_SUCCESS,
	POST_STYLE_FAIL,
	PUT_STYLE_SUCCESS,
	PUT_STYLE_FAIL,
	DELETE_STYLE_SUCCESS,
	DELETE_STYLE_FAIL,
	START_QUERY,
} from '../../constants/utils/styles';
import action from '../action';



export const PostStyle = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/style`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_STYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const style = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_STYLE_FAIL, style));
			});
	};
};

export const GetStyles = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/style`)
			.then((res) => {
				dispatch(action(GET_ALL_STYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const style = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_STYLE_FAIL, style));
			});
	};
};


export const GetStyle = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/style/${id}`)
			.then((res) => {
				dispatch(action(GET_STYLE_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const style = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_STYLE_DETAIL_FAIL, style));
			});
	};
};



export const PutStyle = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/style/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_STYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const style = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_STYLE_FAIL, style));
			});
	};
};

export const DeleteStyle = (id, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/style/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_STYLE_SUCCESS, res.data));
			})
			.catch((err) => {
				const style = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_STYLE_FAIL, style));
			});
	};
};
