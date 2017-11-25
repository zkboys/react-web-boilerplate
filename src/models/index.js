import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    middlewareUtils,
    createConnectHOC,
    middlewarePromise,
    connect as _connect,
    getActionsAndReducers,
    middlewareAsyncActionCallback,
    middlewareSyncReducerToLocalStorage,
} from 'zk-redux';
import pageInitState from '../pages/page-init-state';

// models key 即对应 action中的key
const models = {
    menu: require('./menu'), // this.props.action.menu
    pageHead: require('./page-head'),
    side: require('./side'),
    global: require('./global'),
    user: require('./user'),
};

// 这里需要指定同步数据的key，对应meta中的sync字段，对应的是reducers中的数据
const syncKeys = [
    'settings',
    'side',
    'menu',
];


const {actions, reducers} = getActionsAndReducers({models, syncKeys, pageInitState});
let middlewares = [
    thunkMiddleware,
    middlewarePromise,
    middlewareAsyncActionCallback,
    middlewareUtils,
    middlewareSyncReducerToLocalStorage,
];

export function configureStore(initialState) {
    return applyMiddleware(...middlewares)(createStore)(combineReducers(reducers), initialState);
}

const options = {withRef: true};
// 与redux进行连接 函数
export const connectComponent = _connect({actions, options});

// 与redux进行连接 装饰器
export const connect = createConnectHOC(connectComponent);


