/**
 * 系统级数据 及 操作
 */
export default {
    initialState: {
        loading: false,
        loginUser: null,
        permissions: [],
    },

    setLoginUser: (state, {payload}) => ({loginUser: payload}),
    setPermissions: (state, {payload}) => ({permissions: payload}),
    showLoading: () => ({loading: true}),
    hideLoading: () => ({loading: false}),
}
