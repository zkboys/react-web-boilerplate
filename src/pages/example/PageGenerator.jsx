import React, {Component} from 'react';
import {Button, Alert} from 'antd';
import PageContent from '../../layouts/page-content';
import {ajax} from '../../commons/axios';

export const PAGE_ROUTE = '/example/page-generator';

@ajax()
export default class PageGenerator extends Component {
    state = {};

    componentDidMount() {

    }

    handleClick = () => {
        this.props.ajax.get('/page-generator/test-get', null, {successTip: '成功', errorTip: '失败'})
            .then(res => {
                console.log(res);
            });
    };

    handleOtherClick = () => {
        this.props.ajax.get('/test-ajax', null, {successTip: '成功', errorTip: '失败'})
            .then(res => {
                console.log(res);
            });
    };

    render() {
        return (
            <PageContent>
                页面生成工具
                <Button onClick={this.handleClick}>发送请求</Button>
                <Button onClick={this.handleOtherClick}>发送另外的请求</Button>

                <Alert
                    type="info"
                    message="功能点"
                    description={
                        <ul>
                            <li>整体功能模块生成：多文件</li>
                            <li>单文件生成：多代码片段</li>
                            <li>局部代码生成：功能点</li>
                        </ul>
                    }
                />
                <Alert
                    style={{marginTop: 16}}
                    type="info"
                    message="实现方式"
                    description="通过web，提供可视化页面；后端由node实现，接收页面请求，调用脚本，基于编辑好的模版，进行文件生成；"
                />
            </PageContent>
        );
    }
}
