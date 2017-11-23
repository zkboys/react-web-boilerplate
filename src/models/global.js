export const initialState = {
    loading: false, // 全局loading
};

// action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
export const ar = {
    showLoading(state) {
        return {...state, loading: true}
    },
    hideLoading(state) {
        return {...state, loading: false}
    },
};
