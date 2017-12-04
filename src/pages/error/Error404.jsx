import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import './style.less';

@withRouter
export default class Error404 extends Component {
    handleGoBack = () => {
        this.props.history.goBack();
    };

    render() {
        return (
            <div styleName="root">
                <div styleName="header">
                    <h1>404</h1>
                    <h3>您访问的页面不存在!</h3>
                </div>
                <p styleName="intro">
                    您可以返回<a onClick={this.handleGoBack}>上一步</a>或者跳转到<Link to="/">首页</Link>
                </p>
            </div>
        );
    }
}
