import {actionTypes} from 'zk-redux';

const PAGE_FRAME_LAYOUT = ['top-side-menu', 'top-menu', 'side-menu'];

export default {
    initialState: {
        pageFrameLayout: PAGE_FRAME_LAYOUT[0],
        pageHeadFixed: true,
        pageHeadShow: true,
    },


    setPageFrameLayout: {
        meta: {sync: 'settings'},
        reducer: (state, {payload}) => ({pageFrameLayout: payload}),
    },
    setPageHeadFixed: {
        meta: {sync: 'settings'},
        reducer: (state, {payload}) => ({pageHeadFixed: !!payload}),
    },
    showPageHead: {
        meta: {sync: 'settings'},
        reducer: (state, {payload}) => ({pageHeadShow: !!payload, pageHeadFixed: payload ? state.pageHeadFixed : false}),
    },
    reducers: {
        // 从store中恢复数据
        [actionTypes.GET_STATE_FROM_STORAGE](state, action) {
            const {payload = {}} = action;
            const {settings = {}} = payload; // payload包含了所有同步的数据
            return {...settings};
        },
    },
}
