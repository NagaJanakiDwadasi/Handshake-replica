import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import signupReducer from './reducers/signupReducer';
import thunk from 'redux-thunk';
//const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__
export const store = createStore(
    allReducers,
    storeEnhancers(applyMiddleware(thunk))
);