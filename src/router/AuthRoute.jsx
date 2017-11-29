import React from 'react';
import {Route} from 'react-router-dom';

import {isAuthenticated, toLogin} from '../commons';

/**
 * 验证登录，如果未登录，跳转到登录页面
 * @param Component
 * @param rest
 */
export default ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        if (isAuthenticated()) return <Component {...props}/>;
        return toLogin();
    }}/>
)
