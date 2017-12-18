import React, {Component} from 'react';
import {BackTop, Spin} from 'antd';
import {Helmet} from 'react-helmet';
import {withRouter, Link} from 'react-router-dom';
import Logo from '../logo';
import HeaderUser from '../header-user';
import PageHead from '../page-head';
import HeaderSearch from '../header-search';
import HeaderMenu from '../header-menu';
import {connect} from '../../models/index';
import './style.less';

@connect(state => {
    const {menus, topMenu, selectedMenu} = state.menu;
    const {title, breadcrumbs, show} = state.pageHead;
    const {loading} = state.global;
    return {
        menus,
        topMenu,
        selectedMenu,
        showPageHead: show,
        title,
        breadcrumbs,
        globalLoading: loading,
    };
})
@withRouter
export default class BaseFrame extends Component {
    state = {};

    componentWillMount() {
        const {action, action: {menu}} = this.props;
        action.getStateFromStorage();
        menu.getMenus();
        menu.getMenuStatus();
        this.setBreadcrumbs();
        this.props.history.listen(() => {
            menu.getMenuStatus();
            this.setBreadcrumbs();
        });
    }

    setBreadcrumbs() {
        const {action: {pageHead}} = this.props;
        setTimeout(() => {
            const {selectedMenu} = this.props;
            let breadcrumbs = [];
            let title = '';
            if (selectedMenu) {
                title = selectedMenu.text;
                if (selectedMenu.parentNodes) {
                    breadcrumbs = selectedMenu.parentNodes.map(item => {
                        return {
                            key: item.key,
                            icon: item.icon,
                            text: item.text,
                            path: item.path,
                        }
                    });
                }

                if (selectedMenu.path !== '/') {
                    breadcrumbs.unshift({
                        key: 'index',
                        icon: 'home',
                        text: '首页',
                        path: '/',
                    });
                }

                breadcrumbs.push({
                    key: selectedMenu.key,
                    icon: selectedMenu.icon,
                    text: selectedMenu.text,
                });
            }

            pageHead.setBreadcrumbs(breadcrumbs);
            pageHead.setTitle(title);
            pageHead.show();
        })
    }

    render() {
        let {
            menus,          // 所有的菜单数据
            topMenu,        // 当前页面选中菜单的顶级菜单
            showPageHead,
            title,
            breadcrumbs,
            sideCollapsed,
            globalLoading,
        } = this.props;

        window.document.body.style.paddingLeft = 0;

        return (
            <div styleName="base-frame">
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <BackTop/>
                <div styleName="header">
                    <div styleName="logo">
                        <Link to="/">
                            <Logo min={sideCollapsed}/>
                        </Link>
                    </div>

                    <HeaderMenu
                        dataSource={menus}
                        selectedKeys={[topMenu && topMenu.key]}
                    />
                    <div styleName="right">
                        <HeaderSearch
                            styleName="action"
                            placeholder="站内搜索"
                            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                            onSearch={(value) => {
                                console.log('input', value); // eslint-disable-line
                            }}
                            onPressEnter={(value) => {
                                console.log('enter', value); // eslint-disable-line
                            }}
                        />
                        <HeaderUser styleName="action"/>
                    </div>
                </div>
                <div styleName="content">
                    {
                        showPageHead ? (
                            <PageHead
                                title={title}
                                breadcrumbs={breadcrumbs}
                            />
                        ) : null
                    }
                </div>

                <div styleName="global-loading" style={{display: globalLoading ? 'block' : 'none'}}>
                    <Spin spinning size="large"/>
                </div>
            </div>
        );
    }
}
