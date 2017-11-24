import BaseService from './base-service';
import {zkAxios} from '../commons/axios';

export default class UserService extends BaseService {
    constructor(...args) {
        super(...args);
        this.url = '/mock/users';
    }

    async getUsersByPage(params, options) {
        try {
            const ajaxToken = zkAxios.get(this.url, params, options);
            this.resource.push(ajaxToken); // 存入资源集合中，调用组件被卸载会调用release方法会统一释放
            return await ajaxToken.then(res => {
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
