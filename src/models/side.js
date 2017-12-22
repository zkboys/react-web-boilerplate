import {createAction} from 'redux-actions';
import {actionTypes} from 'zk-redux';
import {identity} from 'lodash/util';

const types = {
    SET_COLLAPSED: 'MENU_SET_COLLAPSED',
};

export default {
    initialState: {
        show: true,
        width: 256,         // 左侧宽度
        collapsedWidth: 80, // 收起时宽度
        collapsed: false,   // 是否展开/收起
        dragging: false,    // 是否正在拖动
    },
    setDragging: (state, {payload}) => ({dragging: payload}),
    hide() {
        return {show: false};
    },
    show() {
        return {show: true};
    },
    setWidth: { // 合并写法
        meta: {sync: 'side'},
        reducer: (state, {payload}) => ({width: payload}),
    },
    actions: {
        setCollapsed: createAction(types.SET_COLLAPSED, identity, () => ({sync: 'side'})),
    },
    reducers: {
        [actionTypes.GET_STATE_FROM_STORAGE](state, action) {
            const {payload = {}} = action;
            const {side} = payload;
            if (side) {
                const {width = 256, collapsed = false} = side;
                return {width, collapsed};
            }
        },
        [types.SET_COLLAPSED]: (state, {payload}) => ({collapsed: payload}),
    }
}
