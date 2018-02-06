export default {
    initialState: {
        breadcrumbs: [],    // 面包屑数据
        title: '',          // 页面title
        show: true,         // 是否显示/隐藏页面头部
    },

    setBreadcrumbs: (state, {payload}) => ({breadcrumbs: payload}),
    appendBreadcrumbs: (state, {payload}) => {
        let {breadcrumbs = []} = state;
        breadcrumbs = breadcrumbs.concat(payload);
        return {breadcrumbs};
    },
    setTitle: (state, {payload}) => ({title: payload}),
    show: () => ({show: true}),
    hide: () => ({show: false}),
}
