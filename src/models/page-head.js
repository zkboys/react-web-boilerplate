export const initialState = {
    breadcrumbs: [], // 面包屑数据
    title: '',
    show: true,
};

// action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
export const ar = {
    arDemo: { // 如果action有额外的数据处理，请使用这种结构
        payloadCreator() {
        },
        metaCreator() {
        },
        reducer(state, action) {
            return {...state};
        },
    },
    // action 数据不需要特殊处理，会直接传递给 reducer的action.payload
    setBreadcrumbs: (state, {payload}) => ({...state, breadcrumbs: payload}),
    setTitle(state, action) {
        const {payload} = action;
        return {
            ...state,
            title: payload,
        };
    },
    show(state) {
        return {...state, show: true}
    },
    hide(state) {
        return {...state, show: false}
    },
};
