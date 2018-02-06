import BaseApi from './base-api';

export default class User extends BaseApi {
    constructor(...args) {
        super(...args);
        this.url = '/mock/users';
    }

    getUsersByPage(params, options) {
        return this.ajax
            .get(this.url, params, options)
            .then(res => {
                if (params.throwError) {
                    throw new Error('查询用户出错了!!')
                }
                return {
                    total: res.total || 0,
                    list: res.list || [],
                };
            });
    }
}
