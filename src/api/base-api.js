import {zkAxios, axios} from '../commons/axios';

export default class BaseApi {
    constructor({useResource = false, useTip = false} = {}) {

        // 存放api占用的资源，组件卸载的时候会调用资源的cancel release 方法释放资源
        // 一般是ajax、event等
        this.resource = [];

        // 提供this.ajax对象，ajaxToken会自动加入resource
        this.ajax = {};
        const method = ['get', 'post', 'put', 'del', 'patch'];
        const axiosInstance = useTip ? zkAxios : axios;
        method.forEach(item => {
            this.ajax[item] = (...args) => {
                const ajaxToken = axiosInstance[item](...args);
                useResource && this.resource.push(ajaxToken);
                return ajaxToken;
            };
        });
    }

    /**
     * 释放资源，一般组件卸载的时候回调用次方法，详见 api-hoc.jsx 高阶组件
     */
    release() {
        this.resource.forEach(item => {
            if (item.cancel) item.cancel();
            if (item.release) item.release();
        });
    }

    add(params, options) {
        return this.ajax.post(this.url, params, options);
    }

    deleteById(id, options) {
        return this.ajax.del(`${this.url}/${id}`, null, options);
    }

    update(params, options) {
        return this.ajax.put(this.url, params, options);
    }

    getByPage(params, options) {
        return this.ajax.get(this.url, params, options)
            .then(res => {
                return {
                    total: res.total || 0,
                    list: res.list || [],
                };
            });
    }

    getAll(params, options) {
        return this.ajax.get(this.url, params, options);
    }

    getById(id, options) {
        return this.ajax.get(`${this.url}/${id}`, null, options);
    }
}
