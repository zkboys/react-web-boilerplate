import {createAction} from 'redux-actions';
import {actionTypes} from 'zk-redux';
import uuid from 'uuid/v4';
import {identity} from 'lodash/util';

const types = {
    SET_WIDTH: uuid(),
    SET_COLLAPSED: uuid(),
};

export default {
    initialState: {
        width: 256,         // 左侧宽度
        collapsedWidth: 80, // 收起时宽度
        collapsed: false,
    },
    actions: {
        setWidth: createAction(types.SET_WIDTH, identity, () => ({sync: 'side'})),
        setCollapsed: createAction(types.SET_COLLAPSED, identity, () => ({sync: 'side'})),
    },
    reducers: {
        [actionTypes.GET_STATE_FROM_STORAGE](state, action) {
            const {payload = {}} = action;
            const {side} = payload;
            if (side) {
                const {width = 256, collapsed = false} = side;
                return {...state, width, collapsed};
            }
            return {...state};
        },
        [types.SET_WIDTH](state, action) {
            const {payload} = action;
            return {
                ...state,
                width: payload,
            };
        },
        [types.SET_COLLAPSED](state, action) {
            const {payload} = action;
            return {
                ...state,
                collapsed: payload,
            };
        },
    }
}
