import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducer from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    Reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
