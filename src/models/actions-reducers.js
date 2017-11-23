import {createAction, handleActions} from 'redux-actions';
import {identity} from 'lodash/util';
import uuid from 'uuid/v4';
import {checkAction, actionUtils, actionPage, reducerPage} from 'zk-redux';
import pageInitState from '../pages/page-init-state';
import initialState from '../pages/page-init-state';

// models key 即对应 $action中的key
const models = {
    menu: require('./menu'), // this.props.$action.menu
    pageHead: require('./page-head'),
    side: require('./side'),
    global: require('./global'),
};

// 需要同步的数据，对应meta中的sync字段，对应的是reducers中的数据
const syncKeys = [
    'settings',
    'side',
    'menu',
];

const utils = actionUtils({pageInitState, syncKeys});
const pageState = reducerPage(initialState);
let _actions = checkAction({actionPage, utils});
const _reducers = {pageState};


Object.keys(models).forEach(key => {
    const model = models[key];
    const initialState = model.initialState;
    let actions = model.actions || {};
    let reducers = model.reducers || {};
    const ar = model.ar;

    if (ar) { // 处理action reducer 合并写法
        const arActions = {};
        const arReducers = {};
        Object.keys(ar).forEach(actionName => {
            const type = uuid();
            const arValue = ar[actionName];
            if (typeof arValue === 'function') {
                arActions[actionName] = createAction(type);
                arReducers[type] = ar[actionName];
            } else {
                const {payloadCreator = identity, metaCreator = identity, reducer = (state) => ({...state})} = arValue;
                arActions[actionName] = createAction(type, payloadCreator, metaCreator);
                arReducers[type] = reducer;
            }

        });
        reducers = {...reducers, ...arReducers};
        actions = {...actions, ...arActions};
    }

    let r = handleActions(reducers, initialState);
    _actions[key] = actions;
    _reducers[key] = r;
});

export const actions = _actions;
export const reducers = _reducers;
