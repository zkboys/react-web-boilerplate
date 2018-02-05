import BaseApi from './base-api';

export default class User extends BaseApi {
    constructor(...args) {
        super(...args);
        this.url = '/mock/users';
    }

    async getUsersByPage(params, options) {
        try {
            return await this.ajax.get(this.url, params, options)
                .then(res => {
                    return {
                        total: res.total || 0,
                        list: res.list || [],
                    };
                });
        } catch (e) {
            console.error(e);
        }
    }
}
