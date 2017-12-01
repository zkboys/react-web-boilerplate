export default {
    initialState: {
        loading: false,
    },
    showLoading: () => ({loading: true}),
    hideLoading: () => ({loading: false}),
}
