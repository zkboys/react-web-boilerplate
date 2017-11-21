import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    middlewareAsyncActionCallback,
    middlewarePromise,
    middlewareSyncReducerToLocalStorage,
    middlewareUtils,
    connect as _connect,
    createConnectHOC,
} from 'zk-redux';

import {actions, reducers} from './actions-reducers';

let middlewares = [
    thunkMiddleware,
    middlewarePromise,
    middlewareAsyncActionCallback,
    middlewareUtils,
    middlewareSyncReducerToLocalStorage,
];

export function configureStore(initialState) {
    return applyMiddleware(
        ...middlewares
    )(createStore)(combineReducers(reducers), initialState);
}

const options = {
    withRef: true,
};

export const connectComponent = _connect({actions, options});

export const connect = createConnectHOC(connectComponent);


