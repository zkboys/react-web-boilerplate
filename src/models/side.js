import {createAction} from 'redux-actions';

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
    syncState: {
        width: true,
        collapsed: true,
    },
    setDragging: (state, {payload}) => ({dragging: payload}),
    hide() {
        return {show: false};
    },
    show() {
        return {show: true};
    },
    setWidth: (state, {payload}) => ({width: payload}),
    actions: {
        setCollapsed: createAction(types.SET_COLLAPSED),
    },
    reducers: {
        [types.SET_COLLAPSED]: (state, {payload}) => ({collapsed: payload}),
    }
}
