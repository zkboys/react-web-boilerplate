export default {
    initialState: {
        breadcrumbs: [],    // 面包屑数据
        title: '',          // 页面title
        show: true,         // 是否显示/隐藏页面头部
    },
    // action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
    // action 数据不需要特殊处理，会直接传递给 reducer的action.payload
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
