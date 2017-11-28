import {session} from 'zk-utils/lib/storage';

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
        return permissions.includes(code);
    }
    return false;
}
