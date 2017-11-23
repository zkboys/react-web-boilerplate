# 路由
> 本项目使用[react-router](https://reacttraining.com/react-router/)进行前端路由管理，具体使用请移步[官网](https://reacttraining.com/react-router/)

## 简化路由配置
做大型应用时，route比较多，写在一个routes.js文件中，一是routes.js会过于庞大，不好维护，二是团队协作时，很容易产生冲突。
页面路由普遍情况只是一个`path`对应一个`component`，可以通过脚本生成；

比如`User.jsx`文件头部定义`export const PAGE_ROUTE = '/base-information/business/users';`；
`User.jsx`将会作为`component`,`'/base-information/business/users'`将会作为`path`，最终会在 `src/pages/page-routes.js`文件中生成如下结构：
```
{
    path: '/base-information/business/users',
    getComponent: () => import('path/to/User.jsx'),
},
```
相关脚本[scripts/generate-page-route.js](https://github.com/zkboys/react-web-boilerplate/blob/master/scripts/generate-page-route.js)

如果需要其他路由属性，请在`src/pages/routes.js`文件中定义路由，同时页面一定不要写`export const PAGE_ROUTE = ...`，否则路由被定义两遍，会产生意料之外的bug。

## 后端配合
后端所有http的get请求，没有被截获的都渲染`index.html`
```
node后端路由配置（routes.js）：
router.get('*', function (req, res, next) {
    // ajax请求 抛出404,其他请求直接render index.html
    res.render('index.html');
});
```
## 404 页面
前端处理404页面，所有没截获的path，都渲染Error404组件
```jsx
// src/router/Router.jsx
<Route component={Error404}/>
```
## 页面跳转
页面跳转使用`Link`，或者`this.props.history`相关API，否则会跳出单页面应用;
与路由连接的页面，都已经含有`this.props.history`,如果非路由直接页面，可以通过`withRouter`进行包装:

```jsx harmony

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

@withRouter
export default class WorkSpace extends Component {
    state = {};

    componentWillMount() {
        console.log(this.props);
        /* 组件会被传入，如下属性：
        history
        location
        match
        staticContext
        */
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>init</div>
        );
    }
}

```
```jsx harmony
import {Link} from 'react-router';
<Link to="/xxxxx">XXXXX</Link>

this.props.router.push('/user/add');
```

## 注入页面中的属性
页面进行了一些包装，注入了一些常用属性 `service()(ajax()(withRouter(connectComponent(Com))));`;

在页面中，可以调用：

- this.porps.$ajax
- this.props.$service
- this.porps.$action
- this.props.history

注：非路由直接连接页面没有这些属性，需要使用相应的高阶组件进行包装

## 页面离开提示

TODO
