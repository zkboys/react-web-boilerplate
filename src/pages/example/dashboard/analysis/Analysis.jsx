import React, {Component} from 'react';
import {Button} from 'antd';
import moment from 'moment';
import PageContent from '../../../../layouts/page-content';
import {connect} from '../../../../models/index';
import girl from './girl.jpeg';
import './style.less';

export const PAGE_ROUTE = '/dashboard/analysis';


@connect(state => ({menu: state.menu}))
export default class Analysis extends Component {
    state = {};

    componentWillMount() {
        const {action} = this.props.history;
        const {from} = this.props.location.state;
        console.log(action, from);
        if (action === 'PUSH') { // POP REPLACE
            if (from === 'menu') {
                // 菜单点击进入的
            }
        }

        if (action === 'POP') { // POP REPLACE
            if (from === 'menu') {
                // 两种情况：1. 刷新页面 2.点击浏览器的前进后退按钮
            }
        }
        this.st = setInterval(() => {
            const time = moment().format('YYYY-MM-DD HH:mm:ss');
            this.setState({time});
        }, 1000);
        // console.log(this.props.service);
        // console.log(this.props.action.setState);
        // console.log(this.props.menu);
        const {action: {pageHead}} = this.props;
        pageHead.appendBreadcrumbs([
            {
                key: 'need a key1',
                text: 'append',
                icon: 'fa-user'
            },
            {
                key: 'need a key',
                text: 'append',
                icon: 'fa-user'
            }
        ]);
        pageHead.setTitle('重新设置Title');
        pageHead.setBreadcrumbs([
            {
                key: 'need a key',
                text: <span style={{color: 'red'}}>理论上可以设置成任何东西</span>,
            }
        ]);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.st) clearInterval(this.st);
    }


    render() {
        const {time} = this.state;

        return (
            <PageContent>
                <div>当前时间：{time}</div>
                <Button
                    onClick={() => {
                        this.props.history.push('/dashboard/analysis', {from: 'current'});
                    }}
                >分析页，测试from</Button>
                <Button
                    onClick={() => {
                        this.props.ajax.get('/test-ajax', null, {successTip: '获取成功！'})
                            .then(res => {
                                console.log(res);
                            });
                    }}
                >发请求 proxy 请求</Button>

                <Button
                    onClick={() => {
                        this.props.ajax.put('/mock/test-ajax/array', null, {successTip: <span>获取<span style={{color: 'red'}}>mock</span>数据成功</span>})
                            .then(res => {
                                console.log(res);
                            });
                    }}
                >发请求 mock 请求</Button>

                <Button
                    onClick={() => {
                        // this.props.action.side.hide();
                        const {action: {global}} = this.props;
                        global.showLoading();
                        setTimeout(() => {
                            global.hideLoading();
                        }, 3000)
                    }}
                >
                    全局loading
                </Button>
                <Button onClick={() => this.props.action.side.hide()}>隐藏左侧菜单</Button>
                <Button onClick={() => this.props.action.side.show()}>显示左侧菜单</Button>
                <br/>
                <br/>
                <div styleName="test-theme">测试一下主题 theme.js</div>
                <img src={girl} alt="girl" style={{width: '100%'}}/>
            </PageContent>
        );
    }
}
