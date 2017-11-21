import React, {Component} from 'react';
import {
    Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {createBrowserHistory, createHashHistory} from 'history'

import {connectComponent} from '../models';
import Bundle from './Bundle'
import pageRoutes from '../pages/page-routes.js'
import routes from '../pages/routes';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Error404 from '../pages/error/Error404';
import PageFrame from '../layouts/base-frame';
import IFrame from '../layouts/iframe'
import AuthRoute from './AuthRoute';

const allRoutes = pageRoutes.concat(routes);

let history = createBrowserHistory();

// 发布到git page 时，使用HashRouter
if (process.env.REACT_APP_BUILD_ENV === 'preview') {
    history = createHashHistory();
}

const renderBundle = (props) => (Com) => {
    if (!Com) {
        NProgress.start();
        return null;
    }
    NProgress.done();
    Com = withRouter(connectComponent(Com));
    return <Com {...props}/>;
};

export default class extends Component {
    render() {

        // 将 PageFrame 与 路由页面 作为兄弟节点，避免PageFrame重新渲染，导致 页面也重新渲染的问题；
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/" render={props => {
                        if (props.location.pathname === '/login') {
                            return null;
                        }
                        return <PageFrame {...props}/>;
                    }}/>
                    <Switch>
                        <AuthRoute exact path="/" component={Home}/>
                        {allRoutes.map(item => (
                            <AuthRoute key={item.path} exact path={item.path} component={(props) => <Bundle load={item.getComponent}>{renderBundle(props)}</Bundle>}/>
                        ))}
                        <Route path="/frame" component={IFrame}/>
                        <Route render={props => {
                            if (props.location.pathname === '/login') {
                                return null;
                            }
                            return <Error404 {...props}/>
                        }}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
