export default {
    initialState: {
        loading: false,
    },
    ar: { // action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
        showLoading(state) {
            return {...state, loading: true}
        },
        hideLoading(state) {
            return {...state, loading: false}
        },
    }
}
