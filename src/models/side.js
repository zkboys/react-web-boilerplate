const INIT_WIDTH = 256;

export default {
    initialState: {
        show: true,
        width: INIT_WIDTH,  // 左侧宽度
        collapsedWidth: 80, // 收起时宽度
        collapsed: false,   // 是否展开/收起
        dragging: false,    // 是否正在拖动
    },
    syncState: {
        width: true,
        collapsed: true,
    },

    setDragging: (state, {payload}) => ({dragging: payload}),
    hide: () => ({show: false}),
    show: () => ({show: true}),
    setWidth: (state, {payload}) => ({width: payload}),
    initWidth: () => ({width: INIT_WIDTH}),
    setCollapsed: (state, {payload}) => ({collapsed: payload}),
}
