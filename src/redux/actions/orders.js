import axios from 'axios';
import {
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAIL,
  GET_ALL_ORDER_ADMIN_SUCCESS,
  GET_ALL_ORDER_ADMIN_FAIL,
  GET_ALL_ORDER_ADMIN_ACCOUNT_SUCCESS,
  GET_ALL_ORDER_ADMIN_ACCOUNT_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
  SEARCH_ORDER_SUCCESS,
  SEARCH_ORDER_FAIL,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAIL,
  PUT_ORDER_SUCCESS,
  PUT_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  START_QUERY,
  // END_QUERY,
} from '../constants/orders';
import action from './action';

// localStorage.setItem("customorLogin", JSON.stringify(res.data))
// localStorage.setItem("isCustomorLogin", JSON.stringify(true))

export const PostOrder = (data, token) => {
  return (dispatch) => {
    dispatch(action(START_QUERY, true));
    axios
      .post(`http://localhost:8080/api/order`, data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(action(POST_ORDER_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(POST_ORDER_FAIL, order));
      });
  };
};

export const GetOrders = (token) => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:8080/api/order`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(action(GET_ALL_ORDER_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err,
        };
        dispatch(action(GET_ALL_ORDER_FAIL, order));
      });
  };
};

export const GetAdminOrders = () => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:8080/api/order/admin/all`)
      .then((res) => {
        dispatch(action(GET_ALL_ORDER_ADMIN_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(GET_ALL_ORDER_ADMIN_FAIL, order));
      });
  };
};
export const GetAdminAccountOrders = () => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:8080/api/order/admin/account`)
      .then((res) => {
        dispatch(action(GET_ALL_ORDER_ADMIN_ACCOUNT_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(GET_ALL_ORDER_ADMIN_ACCOUNT_FAIL, order));
      });
  };
};
export const GetOrder = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/api/order/${id}`)
      .then((res) => {
        console.log(res,'res')
        dispatch(action(GET_ORDER_DETAIL_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(GET_ORDER_DETAIL_FAIL, order));
      });
  };
};

export const GetOrderAccount = (id, token) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/api/order/account/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(action(GET_ORDER_DETAIL_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(GET_ORDER_DETAIL_FAIL, order));
      });
  };
};

export const SearchOrder = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/api/order/${id}`)
      .then((res) => {
        dispatch(action(SEARCH_ORDER_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(SEARCH_ORDER_FAIL, order));
      });
  };
};

export const PutOrder = (id, data, token) => {
  return (dispatch) => {
    dispatch(action(START_QUERY, "abc"));
    axios
      .put(`http://localhost:8080/api/order/${id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
      .then((res) => {
        dispatch(action(PUT_ORDER_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(PUT_ORDER_FAIL, order));
      });
  };
};

export const DeleteOrder = (id, token) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8080/api/order/${id}`,  {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
      .then((res) => {
        dispatch(action(DELETE_ORDER_SUCCESS, res.data));
      })
      .catch((err) => {
        const order = {
          open: true,
          severity: 'error',
          message: err.request.responseText,
        };
        dispatch(action(DELETE_ORDER_FAIL, order));
      });
  };
};
