# api
> 前端服务成，提供ajax请求数据，统一的数据处理等操作。

提供api层可以有效的隔离前后端数据处理，统一对后端的接口进行端对端测试。
在api层，可以进行数据的结构调整，将其他来源（组要是后端ajax请求返回的数据）进行处理后，统一提供给各个组件使用；
可以提高复用，统一维护数据交互。

## api命名
api命名不必带具体业务的名词，比如，User类下下getUserById可以直接定义为getById，因为调用的时候可以区分出`this.props.api.user.getById`。

## base-api
> 通过base-api 提供一些其他具体api的公共方法。

ajax请求基于restful规范，base-api基于restful提供了一些基础方法。

## 资源释放
> 在组件Unmount的时候，可以对api的资源释放（未完成的ajax请求等），调用api 的 `release`方法

提供了一个高阶组件，来解决自动资源释放问题`api-hoc.jsx`,此高阶组件作用：

1. 将创建各个Api类的实例，统一将api实例以`api`变量名传入组件的props,
各个api以首字母消息驼峰命名，比如：SystemUser(类名)，经过`api-hoc.jsx`处理后，组件中以`this.props.api.systemUser.xxx()`方式进行调用。
1. 组件Unmount时，调用各个api实例的`release`方法进行资源释放。

