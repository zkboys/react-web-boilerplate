import React from 'react';
import {Link} from 'react-router-dom'
import './style.less';

export default () => (
    <div styleName="root">
        <div styleName="header">
            <h1>404</h1>
            <h3>您访问的页面不存在!</h3>
        </div>
        <p styleName="intro">
            您可以返回<Link to="/">首页</Link>或者重新<Link to="/login">登录</Link>
        </p>
    </div>
)
