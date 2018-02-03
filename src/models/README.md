# models(redux) 封装

models用于管理数据，要解决的问题：
1. 如何方便的获取数据：connect与组件连接
2. 如何方便的修改数据：action中方法
3. 客户端数据持久化（保存到LocalStorage中）：sync标记
4. 异步数据处理：基于promise异步封装
5. 错误处理：error处理封装，自动提示


为了方便维护，types actions reducers 可以在一个文件中编写，参见`models/side.js` `models/page-head.js`;

## 组件与redux进行连接
提供了两种方式，装饰器方式、函数调用方式；

注：连接路由的组件已经自动connect，非路由直接组件，需要显示connect；

### 装饰器
```jsx harmony
import {connect} from 'path/to/models';

@connect(state => {
    return {
        ...
    }
})
class Demo extends Component{
    ...
}
```

### 函数
```jsx harmony
import {connectComponent} from 'path/to/models';

class Demo extends Component {
   ... 
}
function mapStateToProps(state) {
    return {
        ...
    };
}

export default connectComponent({LayoutComponent: Demo, mapStateToProps});
```

## action reducer 二合一
一个model中，除了initialState actions reducers 等关键字之外的属性，都视为action reducer合并写法
```js

// page-head.js

// action reducer 合并写法，如果一个action 只对应一个reducer，这种写法可以有效减少代码量
export default {
    initialState: {
        title: '',
        show: true,
        ...
    },
    // syncState: true, // 全部同步到localStorage中
    syncState: { // 部分存储到localStorage中
        titel: true,
        user: {
            name: true,
        },
    },
    actions: {
        ...
    },
    reducers: {
        ...
    },
    arDemo: { // 如果action有额外的数据处理，请使用这种结构
        payload() {
        },
        meta() {
        },
        reducer(state, action) {
            // return {...state};
            returtn {};
        },
    },
    // action 数据不需要特殊处理，会直接传递给 reducer的action.payload
    setBreadcrumbs: (state, {payload}) => ({...state, breadcrumbs: payload}),
    setTitle(state, action) {
        const {payload} = action;
        return {
            // ...state,
            title: payload,
        };
    },
    show(state) {
        return {/* ...state,  */ show: true}
    },
    hide(state) {
        return {/* ...state,  */ show: false}
    },
};

```
注：所有的reducer方法，无论是什么写法中的，都可以直接返回新数据，不必关心与元数据合并（...state），封装内部做了合并；

## 关于redux
actions可以被各个页面组件和reducers复用

- 各个页面（组件）如果挂载到路由，将自动与redux进行连接
- 各个页面（组件）如果不是挂载到路由上的，需要显示调用`connect`进行redux的连接；
- 各个页面（组件）如果已经与redux进行连接，通过`const {action} = this.props`获取actions对象，然后调用`action.xxx.xxx()`或`action.xxx()` 触发action；
- `mapStateToProps` 用于指定redux的state中哪部分数据用于当前组件，由于reducer的`combineReducers`方法包装之后，将各个reducer的state存放在对应的key中，key指的是combineReducers包装时指定的key，比如：

    ```javascript
    // zk-axios.js
    export default combineReducers({
        home, // 这个home就是key，es6写法
        utils,
    });

    // src/layout/home.js
    export function mapStateToProps(state) {
        return {
            ...state.home, // 这个home指的就是 combineReducers中的key
            ...state.app // 如果使用 ... home和app中如果有同名属性，app会覆盖home，可以通过调整...state.app，和...state.home得顺序，决定当前页面使用谁的属性。
        };
    }

    ```
- action负责准备数据，数据来源：
    - 调用action方法时传入的参数
    - ajax请求的异步数据
    - storage/cookie中获取数据
- reducer为纯函数，负责处理数据，要对state做deepcopy，返回一个新的数据，不要直接操作state，不会涉及异步，不操作Storage，单纯的获取action的数据之后，做进一步处理。
- store负责将数据以pros形式传递给component，以及通过中间件对数据统一处理。
- 组件，调用触发action，获取store处理过的数据，不发送ajax，不操作storage，单纯的展示数据。
- 适当的区分哪些数据需要redux处理，哪些数据直接使用state，不要为了redux而redux
    - 哪些数据适合使用redux处理？
        - 异步数据（包括ajax，websocket，异步状态loading等）
        - 来自cookie/localStorage等其他存储的数据
        - 多组件公用数据
        - 多组件间通信数据
        - 基础业务数据，其他页面会频繁使用
    - 哪些数据直接使用组件内部state即可？
        - 不涉及组件外数据修改（比如ajax修改后端数据），不被其他任何外部组件使用的数据，比如：点击显示隐藏modal；点击展开收起div等控制内部状态的数据。

### action：
- action 使用的是`redux-actions`模块构建的 `Flux Standard Action`
    ```javascript
    createAction(type, payloadCreator = Identity, ?metaCreator)
    ```
- 各个action文件之间，不允许出现同名方法，`src/actions/index.js`中有检测。

### 回调处理
调用actions方法时，给actions方法传入一个回调参数，这个回调参数，最终是由 `createAction` 的 `metaCreator` 参数处理的，项目中做了封装。`metaCreator` 可以携带业务以外的数据，异步actions会触发两次reducer，第一次触发时`payloadCreator` 传递给reducer的是promise对象，无法携带其他数据了，这时候就可以通过`metaCreator`携带额外的数据。

```javascript
export const testAsync = createAction(
    types.TEXT_ASYNC_DEMO,
    async()=> {
        return await homeService.getMsg(); // 返回promise
    },
    (resolved, rejected)=> {
    	return {
    		resolved,
    		rejected,
    	}
    }
);

/* 解释

(resolved, rejected)=> {
    return {
        resolved,
        rejected,
    }
}
就是 createAction 的第三个参数 metaCreator，是一个函数，这个函数返回的数据，最终存放在action的meta中。
返回数据 resolved 和 rejected 就是调用action方法时传入的回调函数，一个代表成功，一个代表失败，这两个数据最终会被 src/store/asyncActionCallbackMiddleware.js中间件使用
*/
```

### 异步写法
异步是使用`src/store/promise-middleware.js`中间件进行处理的
一本异步action其实是触发了两次reducer，第一次标记异步开始，reducer可以获取相应的标记，第二次异步完成，返回数据。具体可以参考`promise-middleware.js`源码

#### action异步写法
```javascript
import {createAction} from 'redux-actions';
import * as types from '../constants/actionTypes';
import * as profileService from '../services/profile-service';

export const saveUserMessage = createAction(types.SAVE_USER_MESSAGE,
    (userMessage) => profileService.saveUserMessage(userMessage), // 返回一个promise实例
    (userMessage, resolved, rejected) => {
        return {
            userMessage, // 异步action将触发reducer两次，reducer第一次触发获取payload是promise对象，额外的数据就要metaCreator提供了。
            resolved, // 执行异步action成功回调，使页面可以获取异步成功
            rejected, // 执行异步action失败回调，使页面可以处理异步失败
            errorTip: '保存失败', // 系统自动提示错误， 默认 ‘未知系统错误’ 传递false，不使用系统提示
            autoTipSuccess: '个人信息修改成功', // 默认 false，不显示成功提示信息，
        };
    }
);
```

#### reducer 异步写法：
有两种写法，第一种有机会获取所有action的数据，第二种，只能获取自己type的action数据，个人觉得获取所有action数据没有用，反而状态受干扰。推荐第二种写法
```javascript
import * as types from '../constants/actionTypes';

let initialState = {
    isSidebarCollapsed: false,
    fetching: false,
};

export default function (state = initialState, action) {
    const {payload, error, meta={}, type} = action;
    const {sequence = {}} = meta;
    const status = sequence.type === 'start';
    if (status || error) { // 出错，或者正在请求中，注意： 这种写法将捕获所有异步action，自己模块得status要在自己的case中写。
        return {
            ...state,
            fetching: status,
        };
    }
    switch (type) {
    case types.TOGGLE_SIDE_BAR: {
        const isSidebarCollapsed = !state.isSidebarCollapsed;
        return {
            ...state,
            isSidebarCollapsed,
        };
    }
    case types.GET_STATE_TO_STORAGE: {
        return {
            ...state,
            ...(payload.setting || initialState),
        };
    }
    default:
        return state;
    }
}

```
```javascript
import {handleActions} from 'redux-actions';
import * as types from '../constants/actionTypes';

let initialState = {
    loading: false,
    orderState: '',
};

export default handleActions({
    [types.SAVE_USER_MESSAGE](state, action) {
        const {error, meta = {}} = action;
        const {sequence = {}} = meta;
        const loading = sequence.type === 'start';

        // loading 要反应到页面上，
        // error由middleware处理，全局message提示，或者各个页面添加回调处理
        if (loading || error) {
            return {
                ...state,
                loading,
            };
        }

        return {
            ...state,
            orderState: 'success',
            loading,
        };
    },
}, initialState);

```

### redux中的异常处理
- 基于`flux-standard-action` 规范，异常action返回结构为：`{..., payload: error, error: true, ...}`
- `utils-middleware.js`会统一截获处理异常（无论异步还是同步）， 会根据 `meta.errorTip`来确定是否全局提示处理异常信息
- `async-action-callback-middleware.js` 会调用actions的回调函数，给具体页面处理异常的机会


#### 异步异常
异步操作统一使用的是promise，异常捕获在`src/store/promise-middleware.js`中间件中，一旦异步操作出现异常，action将传递给相应的reducer`{..., payload: error, error: true, ...}`

#### 同步异常
如果`action`返回的`payload`是一个`Error`对象，`redux-actions`，将自动设置`action.error`为`true`
自己可以在action中，使用`try-catch`处理？？？

### 将数据存储到localStorage中

model 中 通过 `syncState` 标记那些state需要同步到localStorage中，如果 syncState === true，将同步当前model中所有state；
models/xxx.js
```
export default {
    initialState: {
        user: {
            name: '张三',
            age: 20,
        },
        org: {
            id: 1,
            name: '架构部',
        },
    },
    // syncState: true, // 全部同步
    syncState: { // 指定数据
        user: true,
        org: {
            name: true,
        }
    }
}
```

### 撤销&重做

通过 [redux-undo](https://github.com/omnidan/redux-undo) 可以实现撤销&重做功能

通过undoable 对reducer进行包装，就可以实现撤销&重做功能
```
import undoable, {includeAction} from 'redux-undo';

...

export default undoable(organization, {
    filter: includeAction([types.SET_ORGANIZATION_TREE_DATA]),
    limit: 10,
    undoType: types.UNDO_ORGANIZATION,
    redoType: types.REDO_ORGANIZATION,
});

```

### 页面级别Redux写法
上述action，不仅仅将数据共享，action也进行了共享，对于页面来说如果仅仅需要共享数据，并不需要共享action，可以使用如下写法：
```
// 在具体的jsx页面中定义如下常量：
export const INIT_STATE = {
    scope: 'someUniqueString',
    sync: true,
    a: 3,
    b: 4,
};

```
说明：

1. 如果要使用 actions.setState方法，INIT_STATE，必须定义， 必须定义，必须定义
1. INIT_STATE：初始化state，这个会被脚本抓取，最终生成src/page-init-state.js，两个作用：
    1. 初始化放入store中的state
    1. 可以很明确看出当前页面用到的state结构
    1. scope：用来限制存放在store中的本页面state的作用于，防止页面过多，产生冲突，命名约定：各个级别模块名+文件名，驼峰命名
    1. sync: true 属性，标记当前页面state与localStorage同步，当前页面state变化将自动保存到localStorage中，页面启动时，会把localStorage中数据自动同步到redux中。
1. 使用`this.props.actions.setState(scope, payload)`方法将数据存于store
1. 如果修改当前页面数据，可以直接使用`this.props.actions.setState(payload)`，不必指定scope
1. 修改其他页面数据，则要指定scope，
    ```js
    // 比如UserAdd.jsx页面要修改UserList.jsx页面所用到的state
    this.props.actions.setState('userListPageScope', payload);
    ```
1. store中的state注入本组件：
    ```js
    export function mapStateToProps(state) {
        return {
            ...state.pageState.someUniqueString, // someUniqueString 为当前页面scope
        };
    }
    // 通过this.props获取：
    this.props.    a;
    this.props.b

    // 注入多个页面state时，防止冲突，可以用如下写法
    export function mapStateToProps(state) {
        return {
            page1: state.pageState.page1Scope,
            page2: state.pageState.page2Scope,
        };
    }
    // 通过this.props获取：
    this.page1.a;
    this.page2.a;
    ```
