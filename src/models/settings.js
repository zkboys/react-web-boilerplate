const PAGE_FRAME_LAYOUT = ['top-side-menu', 'top-menu', 'side-menu'];

export default {
    initialState: {
        pageFrameLayout: PAGE_FRAME_LAYOUT[0],
        pageHeadFixed: true,
        pageHeadShow: true,
    },

    syncState: true, // 全部同步到localStorage中

    setPageFrameLayout: (state, {payload}) => ({pageFrameLayout: payload}),
    setPageHeadFixed: (state, {payload}) => ({pageHeadFixed: !!payload}),
    showPageHead: (state, {payload}) => ({pageHeadShow: !!payload, pageHeadFixed: payload ? state.pageHeadFixed : false}),
}
