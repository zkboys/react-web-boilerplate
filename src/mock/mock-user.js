import {getUsersByPageSize} from './mockdata/user';

export default {
    'get /mock/users': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, {
                    pageNum,
                    pageSize,
                    total: 888,
                    list: getUsersByPageSize(pageSize),
                }]);
            }, 1000);
        });
    },

    'post /mock/login': (config) => {
        const {
            userName,
            password,
        } = JSON.parse(config.data);
        return new Promise((resolve, reject) => {
            if (userName !== 'test' || password !== '111') {
                setTimeout(() => {
                    reject({
                        code: 1001,
                        message: '用户名或密码错误',
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    resolve([200, {
                        id: '1234567890abcde',
                        name: 'MOCK 用户',
                        loginName: 'MOCK 登录名',
                    }]);
                }, 1000);
            }
        });
    },
    'post /mock/logout': {},
}
