import {applyMiddleware, compose} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
    rootReducer, 
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
    )
);

export default store;