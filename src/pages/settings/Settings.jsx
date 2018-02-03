import React, {Component} from 'react';
import {Radio, Card, Row, Col, Checkbox} from 'antd';
import {connect} from '../../models/index';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/settings';

@connect(state => {
    const {pageFrameLayout, pageHeadFixed, pageHeadShow} = state.settings;
    return {
        pageFrameLayout,
        pageHeadFixed,
        pageHeadShow,
    };
})
export default class Settings extends Component {

    componentWillMount() {
        const {pageHead} = this.props.action;
        pageHead.setTitle('设置');
        pageHead.setBreadcrumbs([
            {
                key: '1',
                path: '/',
                text: '首页',
            },
            {
                key: '2',
                path: '/settings',
                text: '设置',
            },
        ]);
    }

    handlePageFrameLayoutChange = (e) => {
        const {value} = e.target;
        const {action} = this.props;
        if (value === 'top-menu') {
            action.side.initWidth();
            action.side.setCollapsed(false);
        }
        action.settings.setPageFrameLayout(value);
    };

    handlePageHeadFixedChange = (e) => {
        const {checked} = e.target;
        this.props.action.settings.setPageHeadFixed(checked);
    };

    handlePageHeadShowChange = (e) => {
        const {checked} = e.target;
        const {action} = this.props;
        action.settings.showPageHead(checked);
        checked ? action.pageHead.show() : action.pageHead.hide();
    };

    render() {
        const {
            pageFrameLayout,
            pageHeadFixed,
            pageHeadShow,
        } = this.props;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const colStyle = {
            padding: '16px',
        };

        return (
            <PageContent>
                <Row>
                    <Col span={12} style={colStyle}>
                        <Card
                            title="导航布局"
                        >
                            <Radio.Group onChange={this.handlePageFrameLayoutChange} value={pageFrameLayout}>
                                <Radio style={radioStyle} value="top-side-menu">顶部+左侧导航</Radio>
                                <Radio style={radioStyle} value="top-menu">顶部导航</Radio>
                                <Radio style={radioStyle} value="side-menu">左侧导航</Radio>
                            </Radio.Group>
                        </Card>
                    </Col>
                    <Col span={12} style={colStyle}>
                        <Card
                            title="页面头部"
                        >

                            <Checkbox
                                onChange={this.handlePageHeadShowChange}
                                checked={pageHeadShow}
                            >显示头部</Checkbox>

                            {pageHeadShow ? (
                                <Checkbox
                                    onChange={this.handlePageHeadFixedChange}
                                    checked={pageHeadFixed}
                                >头部固定</Checkbox>
                            ) : null}
                        </Card>
                    </Col>
                </Row>
            </PageContent>
        );
    }
}
