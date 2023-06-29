import axios from 'axios';
import {
	GET_ALL_GENDER_SUCCESS,
	GET_ALL_GENDER_FAIL,
	GET_GENDER_DETAIL_SUCCESS,
	GET_GENDER_DETAIL_FAIL,
	POST_GENDER_SUCCESS,
	POST_GENDER_FAIL,
	PUT_GENDER_SUCCESS,
	PUT_GENDER_FAIL,
	DELETE_GENDER_SUCCESS,
	DELETE_GENDER_FAIL,
	START_QUERY,
} from '../../constants/utils/genders';
import action from '../action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostGender = (data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.post(`http://localhost:8080/api/gender`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(POST_GENDER_SUCCESS, res.data));
			})
			.catch((err) => {
				const gender = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				console.log('err register');
				dispatch(action(POST_GENDER_FAIL, gender));
			});
	};
};

export const GetGenders = () => {
	return async (dispatch) => {
		dispatch(action(START_QUERY, true));

		await axios
			.get(`http://localhost:8080/api/gender`)
			.then((res) => {
				dispatch(action(GET_ALL_GENDER_SUCCESS, res.data));
			})
			.catch((err) => {
				const gender = {
					open: true,
					severity: 'error',
					message: err,
				};
				dispatch(action(GET_ALL_GENDER_FAIL, gender));
			});
	};
};

export const GetGender = (id) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.get(`http://localhost:8080/api/gender/${id}`)
			.then((res) => {
				dispatch(action(GET_GENDER_DETAIL_SUCCESS, res.data));
			})
			.catch((err) => {
				const gender = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(GET_GENDER_DETAIL_FAIL, gender));
			});
	};
};

export const PutGender = (id, data, token) => {
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.put(`http://localhost:8080/api/gender/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(PUT_GENDER_SUCCESS, res.data));
			})
			.catch((err) => {
				const gender = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(PUT_GENDER_FAIL, gender));
			});
	};
};

export const DeleteGender = (id, token) => {
	console.log(id, 'id');
	return (dispatch) => {
		dispatch(action(START_QUERY, true));

		axios
			.delete(`http://localhost:8080/api/gender/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				dispatch(action(DELETE_GENDER_SUCCESS, res.data));
			})
			.catch((err) => {
				const gender = {
					open: true,
					severity: 'error',
					message: err.request.responseText,
				};
				dispatch(action(DELETE_GENDER_FAIL, gender));
			});
	};
};
