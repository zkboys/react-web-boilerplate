import {createAction} from 'redux-actions';
import {getTopNodeByNode} from 'zk-utils/lib/tree-utils';
import {uniqueArray} from 'zk-utils';
// import uuid from 'uuid/v4';
import {getSelectedMenuByPath} from '../commons';

// types只是做action 与 reducer之间的连接，它的值并没有太多意义；
// 如果其他model用到这个model的types，可以将这个types export 出去；
const types = {
    GET_MENU_STATUS: 'MENU:GET_MENU_STATUS',        // 防止各个模块冲突，最好模块名开头
    // GET_MENU_STATUS: uuid(),        // 使用uuid，编写方便，可以避免冲突，但是redux的Log信息可读性比较差
};

export default {
    initialState: {
        loading: false,     // 请求菜单loading
        menus: [],          // 菜单数据，树状结构
        openKeys: [],       // 当前展开菜单keys
        selectedMenu: [],   // 当前选中菜单
        topMenu: [],        // 当前选中菜单的顶级菜单
    },
    syncState: {
        openKeys: true,
        selectedMenu: true,
        topMenu: true,
    },
    // action reducer 混合写法
    setOpenKeys: (state, {payload}) => ({openKeys: payload}),
    setMenus: (state, {payload}) => ({menus: payload}),
    actions: {
        // 获取菜单状态，openKeys selectedMenu topMenu
        getMenuStatus: createAction(types.GET_MENU_STATUS),
    },
    reducers: {
        [types.GET_MENU_STATUS](state) { // 根据url 获取菜单状态 openKeys selectedMenu topMenu
            let path = window.location.pathname;
            let selectedMenu = getSelectedMenuByPath(path, state.menus);
            let topMenu = {};
            let openKeys = [...state.openKeys];

            // 如果没有匹配到，使用上一次菜单
            if (!selectedMenu && path !== '/') { // 首页除外
                selectedMenu = state.selectedMenu;
            }

            if (selectedMenu) {
                topMenu = getTopNodeByNode(state.menus, selectedMenu);
                const parentKeys = selectedMenu.parentKeys || [];
                // openKeys = openKeys.concat(parentKeys); // 保持其他打开的菜单
                openKeys = [...parentKeys]; // 关闭其他菜单

                openKeys = uniqueArray(openKeys);
            }
            return {
                topMenu,
                selectedMenu,
                openKeys,
            };
        }
    }
}

