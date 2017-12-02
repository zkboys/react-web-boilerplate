import {createAction} from 'redux-actions';
import pathToRegexp from 'path-to-regexp';
import {getNodeByPropertyAndValue, getTopNodeByNode} from 'zk-utils/lib/tree-utils';
import {uniqueArray} from 'zk-utils';
import {actionTypes} from 'zk-redux';
// import uuid from 'uuid/v4';
import {getMenuTreeData} from '../commons';

// types只是做action 与 reducer之间的连接，它的值并没有太多意义；
// 如果其他model用到这个model的types，可以将这个types export 出去；
const types = {
    GET_MENU_STATUS: 'MENU:GET_MENU_STATUS',        // 防止各个模块冲突，最好模块名开头
    // GET_MENU_STATUS: uuid(),        // 使用uuid，编写方便，可以避免冲突，但是redux的Log信息可读性比较差
};

export default {
    initialState: {
        menus: [],          // 菜单数据，树状结构
        openKeys: [],       // 当前展开菜单keys
        selectedMenu: [],   // 当前选中菜单
        topMenu: [],        // 当前选中菜单的顶级菜单
    },
    // action reducer 混合写法
    setOpenKeys: (state, {payload}) => ({openKeys: payload}),
    getMenus: () => ({menus: getMenuTreeData()}),
    // getMenus: {
    //     payload: getMenuTreeData,
    //     reducer: (state, {payload}) => ({menus: payload}),
    // },
    actions: {
        // 获取菜单状态，openKeys selectedMenu topMenu
        getMenuStatus: createAction(types.GET_MENU_STATUS, getMenuTreeData, () => ({sync: 'menu'})), // sync 用于指定是否同步到存储中，menu要对应模块名
    },
    reducers: {
        // 从store中恢复数据
        [actionTypes.GET_STATE_FROM_STORAGE](state, action) {
            const {payload = {}} = action;
            const {menu} = payload; // payload包含了所有同步的数据
            if (menu) {
                const {openKeys = [], selectedMenu, topMenu} = menu;
                return {openKeys, selectedMenu, topMenu};
            }
        },
        [types.GET_MENU_STATUS](state, action) { // 根据url 获取菜单状态 openKeys selectedMenu topMenu
            const menuTreeData = action.payload;
            let selectedMenu = {};
            let topMenu = {};
            let openKeys = [...state.openKeys];

            if (menuTreeData) {
                let path = window.location.pathname;

                if (path.indexOf('/+') > -1) {
                    path = path.substring(0, path.indexOf('/+'));
                }

                // 先精确匹配
                selectedMenu = getNodeByPropertyAndValue(menuTreeData, 'path', path, (itemValue, value, item) => {
                    const isTop = item.children && item.children.length;
                    return itemValue === value && !isTop; // 排除父级节点
                });

                // 正则匹配，路由中有`:id`的情况
                // fixme 容易出问题：a/b/:id,会匹配 a/b/1, a/b/detail，有可能不是期望的结果，注意路由写法
                // fixme: a/b/tab/:id 具体的:id，添加一级，用来表明id是什么
                if (!selectedMenu && path !== '/') {
                    selectedMenu = getNodeByPropertyAndValue(menuTreeData, 'path', path, (itemValue, value, item) => {
                        const isTop = item.children && item.children.length;
                        const re = pathToRegexp(itemValue);
                        return !!re.exec(value) && !isTop; // 排除父级节点
                    });
                }

                // 如果没有匹配到，使用上一次菜单
                if (!selectedMenu && path !== '/') { // 首页除外
                    selectedMenu = state.selectedMenu;
                }

                if (selectedMenu) {
                    topMenu = getTopNodeByNode(menuTreeData, selectedMenu);
                    const parentKeys = selectedMenu.parentKeys || [];
                    // openKeys = openKeys.concat(parentKeys); // 保持其他打开的菜单
                    openKeys = [...parentKeys]; // 关闭其他菜单

                    openKeys = uniqueArray(openKeys);
                }
            }
            return {
                topMenu,
                selectedMenu,
                openKeys,
            };
        }
    }
}

