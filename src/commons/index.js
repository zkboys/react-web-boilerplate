import {session} from 'zk-utils/lib/storage';
import {getNodeByPropertyAndValue, convertToTree} from 'zk-utils/lib/tree-utils';
import pathToRegexp from "path-to-regexp/index";

export const isPro = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const isRC = process.env.NODE_ENV === 'rc';

export function isAuthenticated() {
    return !!getCurrentLoginUser();
}

/**
 * 获取当前登录用户
 * @returns {null}
 */
export function getCurrentLoginUser() {
    // 这里由于App.jsx 中要对storage进行初始化，要用到 currentLoginUser.id 作为 keyPrefix
    // 所以不能使用 封装的storage相关方法
    const currentLoginUser = window.sessionStorage.getItem('currentLoginUser');
    return currentLoginUser ? JSON.parse(currentLoginUser) : null;
}

/**
 * 设置当前登录用户
 * @param currentLoginUser
 */
export function setCurrentLoginUser(currentLoginUser) {
    window.sessionStorage.setItem('currentLoginUser', JSON.stringify(currentLoginUser));
}

/**
 * 跳转到登录页面
 * @returns {string}
 */
export function toLogin() {
    session.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem('last-href', window.location.href);
    return window.location.href = '/login';
}

/**
 * 判断当前用户是否拥有code对应的权限
 * @param code
 * @returns {boolean}
 */
export function hasPermission(code) {
    const currentLoginUser = getCurrentLoginUser();
    if (currentLoginUser) {
        const {permissions = []} = currentLoginUser;
        return permissions.indexOf(code) > -1;
    }
    return false;
}

/**
 * 打印封装,便于以后更改打印方式
 * 不需要打印的内容，但是页面需要显示，添加`no-print`class类；
 * 需要打印的内容，但是页面不需要显示，添加`just-print`class类
 */
export function print() {
    window.print()
}

/**
 * 根据path获取对应的菜单
 * @param path
 * @returns {*}
 */
export function getSelectedMenuByPath(path, menuTreeData) {
    let selectedMenu;
    if (menuTreeData) {
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
    }
    return selectedMenu;
}


/**
 * 获取菜单树状结构数据 和 随菜单携带过来的权限
 * @param menus 扁平化菜单数据
 */
export function getMenuTreeDataAndPermissions(menus) {
    // 处理path： 只声明了url，没有声明path，为iframe页面
    menus = menus.map(item => {
        if (item.url && !item.path) {
            item.path = `/frame/(${item.url})`;
        }
        return item;
    });

    // 用户权限code，通过菜单携带过来的
    const permissions = menus.map(item => {
        if (item.type === '0') return item.key;
        if (item.type === '1') return item.code;
        return null;
    });

    // 菜单根据order 排序
    const orderedData = [...menus].sort((a, b) => {
        const aOrder = a.order || 0;
        const bOrder = b.order || 0;

        // 如果order都不存在，根据 text 排序
        if (!aOrder && !bOrder) {
            return a.text > b.text ? 1 : -1;
        }

        return bOrder - aOrder;
    });

    // 设置顶级节点path，有的顶级没有指定path，默认设置为子孙节点的第一个path
    const findPath = (node) => {
        const children = orderedData.filter(item => item.parentKey === node.key);
        let path = '';
        if (children && children.length) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.path) {
                    path = child.path;
                    break;
                }
                path = findPath(child);
            }
        }
        return path;
    };
    orderedData.forEach(item => {
        if (!item.path) {
            item.path = findPath(item);
        }
    });

    const menuTreeData = convertToTree(orderedData);
    return {menuTreeData, permissions}
}
