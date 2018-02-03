const PAGE_FRAME_LAYOUT = ['top-side-menu', 'top-menu', 'side-menu'];

export default {
    initialState: {
        pageFrameLayout: PAGE_FRAME_LAYOUT[0],
        pageHeadFixed: true,
        pageHeadShow: true,
        sync: true,  // 全部同步
        // sync: { // 部分同步，指定结构
        //     pageHeadShow: true,
        // },
    },

    setPageFrameLayout: (state, {payload}) => ({pageFrameLayout: payload}),
    setPageHeadFixed: (state, {payload}) => ({pageHeadFixed: !!payload}),
    showPageHead: (state, {payload}) => ({pageHeadShow: !!payload, pageHeadFixed: payload ? state.pageHeadFixed : false}),
}
