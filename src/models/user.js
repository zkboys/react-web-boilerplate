import {axios} from '../commons/axios';

export const initialState = {
    users: [],
    total: 0,
    loading: false,
};

// action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
export const ar = {
    /**
     * 如果action有额外的数据处理，请使用这种结构
     *
     * key(fetchUser)   action函数名
     * payloadCreator   payload数据创建函数，参数为调用action（fetchUser）时传入的参数，可以是任意多个，其返回值将作为action.payload传递给reducer
     * metaCreator      meta数据创建函数，参数为调用action（fetchUser）时传入的参数，可以是任意多个(与payloadCreator所接到的参数相同)，其返回值将作为action.meta传递给reducer
     */
    fetchUser: {
        // payloadCreator: (params, options) => zkAxios.get('/mock/users', params, options),
        payloadCreator({params, options}) {
            // redux 中 有错误/成功处理，不需要successTip 和 errorTip，使用 axios；
            return axios.get('/mock/users', params, options); // 返回promise
        },
        metaCreator({onResolve}) {
            return {
                onResolve,
                onReject: () => console.log('失败了'),
                successTip: '查询成功！',
                errorTip: '自定义errorTip',
            };
        },
        /*
        * promise异步reducer参数说明
        * 每个函数的参数都是 (state, action)，每个函数的state都是上游函数处理过的最新state
        *
        * always = (state) => ({...state}),     // 每个状态之前都会触发，pending、resolve、reject、complete之前都会触发
        * pending = (state) => ({...state}),    // 请求开始之前
        * resolve = (state) => ({...state}),    // 成功
        * reject = (state) => ({...state}),     // 失败
        * complete = (state) => ({...state}),   // 完成，无论成功失败，都会触发
        *
        * pending -> resolve(reject)->complete
        * */
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
};
