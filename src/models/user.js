import {axios} from '../commons/axios';
import api from '../api';

export default {
    initialState: {
        users: [],
        total: 0,
        loading: false,
    },

    fetchUser: {
        // redux 中 有错误/成功处理，不需要successTip 和 errorTip，使用 axios；
        payload: ({params, options}) => axios.get('/mock/users', params, options), // 异步action payload 返回promise
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                const {total = 0, list = []} = payload;
                return {
                    users: list,
                    total,
                }
            },
            complete: () => ({loading: false}),
        }
    },

    getUsersByPage: {
        payload: ({params, options}) => api.user.getUsersByPage(params, options),
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                const {total = 0, list = []} = payload;
                return {
                    users: list,
                    total,
                }
            },
            complete: () => ({loading: false}),
        }
    }
}
