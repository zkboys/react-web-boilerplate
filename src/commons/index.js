import {session} from 'zk-utils/lib/storage';
import {getNodeByPropertyAndValue} from 'zk-utils/lib/tree-utils';
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
 * 从sessionStorage中获取菜单的树形结构数据
 * @returns {*}
 */
export function getMenuTreeData() {
    return session.getItem('menuTreeData');
}

/**
 * 保存菜单的树形结构到sessionStorage中
 * @param menuTreeData
 */
export function setMenuTreeData(menuTreeData) {
    session.setItem('menuTreeData', menuTreeData);
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
export function getSelectedMenuByPath(path) {
    const menuTreeData = getMenuTreeData();
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
