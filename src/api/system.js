import BaseApi from './base-api';

export default class System extends BaseApi {
    constructor(...args) {
        super(...args);
        /**
         * 基础url BaseApi会基于此url及restful规范提供基础的一些接口
         * 这些接口需要后端基于restful提供，未必全部有效
         * @type {string}
         */
        this.url = '/v1/system';
    }

    getMenus({userId}, options) {
        return this.ajax.get('/mock/system/menus', {userId}, options);
    }

    login(params, options) {
        return this.ajax.post('/mock/login', params, options);
    }

    logout = () => this.ajax.post('/mock/logout');
}
