import {axios} from '../commons/axios';

export default {
    initialState: {
        users: [],
        total: 0,
        loading: false,
    },
    /**
     * 如果action有额外的数据处理，请使用这种结构
     *
     * key(fetchUser): action函数名
     * payload: payload数据创建函数或数据，参数为调用action（fetchUser）时传入的参数，可以是任意多个，若是函数其返回值将作为action.payload传递给reducer，若是非函数，直接作为action.payload传递给reducer
     * meta: meta数据创建函数或数据，参数为调用action（fetchUser）时传入的参数，可以是任意多个(与payload所接到的参数相同)，其返回值将作为action.meta传递给reducer，若是非函数，直接作为action.meta传递给reducer
     */
    fetchUser: {
        // redux 中 有错误/成功处理，不需要successTip 和 errorTip，使用 axios；
        payload: ({params, options}) => axios.get('/mock/users', params, options), // 异步action payload 返回promise
        // meta: commonAsyncMeta, // 异步action 默认使用通用异步meta配置commonAsyncMeta，对successTip errorTip onResolve onReject onComplete 进行了合理的默认值处理，需要action以对象形式传参
        // meta: { // 可以是函数，可以是对象
        //     successTip: '查询成功！欧耶~',
        //     errorTip: '自定义errorTip！马丹~',
        // },
        // 基于promise 异步reducer写法；普通reducer直接写函数即可；
        reducer: {
            pending: () => ({loading: true}),
            resolve(state, {payload = {}}) {
                const {total = 0, list = []} = payload;
                return {
                    // ...state, // 每个处理函数中，这个写不写都可以，handleAsyncReducer， 内部做了处理，会把返回数据与原有state进行合并
                    users: list,
                    total,
                }
            },
            complete: () => ({loading: false}),
        }
    },
}
