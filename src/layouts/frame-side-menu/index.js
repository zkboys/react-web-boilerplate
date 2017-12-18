import React, {Component} from 'react';
import {Icon, BackTop, Spin} from 'antd';
import Rnd from 'react-rnd';
import {Helmet} from 'react-helmet';
import {withRouter, Link} from 'react-router-dom';
import {getScrollBarWidth} from 'zk-utils';
import Logo from '../logo';
import SideMenu from '../side-menu';
import HeaderUser from '../header-user';
import PageHead from '../page-head';
import HeaderSearch from '../header-search';
import {connect} from '../../models/index';
import './style.less';

const scrollBarWidth = getScrollBarWidth();

@connect(state => {
    const {menus, openKeys, selectedMenu} = state.menu;
    const {title, breadcrumbs, show} = state.pageHead;
    const {width, collapsed, collapsedWidth} = state.side;
    const {loading} = state.global;
    return {
        menus,
        openKeys,
        selectedMenu,
        showPageHead: show,
        title,
        breadcrumbs,
        sideWidth: width,
        sideCollapsed: collapsed,
        sideCollapsedWidth: collapsedWidth,
        globalLoading: loading,
    };
})
@withRouter
export default class BaseFrame extends Component {
    state = {
        sideWidth: 256,
        transitionDuration: 0,
    };

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

    handleToggle = () => {
        const {sideCollapsed} = this.props;
        this.props.action.side.setCollapsed(!sideCollapsed);
        this.setState({transitionDuration: 300});
    };

    handleMenuOpenChange = (openKeys) => {
        const {sideCollapsed} = this.props;
        if (!sideCollapsed) this.props.action.menu.setOpenKeys(openKeys);
    };

    handleSideResizeStart = () => {
        // 拖动时，各个部分不使用动画，否则拖动不流畅
        const {transitionDuration} = this.state;
        if (transitionDuration !== 0) this.setState({transitionDuration: 0});
    };

    handleSideResize = (e, direction, ref) => {
        this.props.action.side.setWidth(ref.offsetWidth);
    };

    handleSideResizeStop = () => {
        // 恢复各部分动画
        this.setState({transitionDuration: 300});
    };

    render() {
        let {
            menus,          // 所有的菜单数据
            openKeys,       // 当前菜单打开keys
            selectedMenu,   // 当前选中菜单
            showPageHead,
            title,
            breadcrumbs,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            globalLoading,
        } = this.props;

        let {transitionDuration} = this.state;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        const sideInnerWidth = sideWidth + scrollBarWidth;
        const outerOverFlow = sideCollapsed ? 'visible' : 'hidden';
        const innerOverFlow = sideCollapsed ? 'visible' : '';
        transitionDuration = `${transitionDuration}ms`;

        // 左侧菜单数据，与顶部菜单配合显示顶部菜单的子菜单；
        const sideMenus = menus;

        window.document.body.style.paddingLeft = `${sideWidth}px`;

        return (
            <div styleName="base-frame">
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <BackTop/>
                <div styleName="header" style={{left: sideWidth}}>
                    <Icon
                        styleName="trigger"
                        type={sideCollapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.handleToggle}
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

                <div styleName="side" style={{width: sideWidth, transitionDuration}}>
                    <Rnd
                        disableDragging
                        enableResizing={{right: !sideCollapsed}}
                        size={{width: sideWidth}}
                        style={{left: 0, top: 0, right: 0, bottom: 0, transition: `all ${transitionDuration}`}}
                        position={{x: 0, y: 0}}
                        onResizeStart={this.handleSideResizeStart}
                        onResize={this.handleSideResize}
                        onResizeStop={this.handleSideResizeStop}
                    >
                        <div styleName="logo">
                            <Link to="/">
                                <Logo min={sideCollapsed}/>
                            </Link>
                        </div>
                        <div styleName="outer" style={{overflow: outerOverFlow, transitionDuration}}>
                            <div styleName="inner" style={{width: sideInnerWidth, overflow: innerOverFlow, transitionDuration}}>
                                <SideMenu
                                    dataSource={sideMenus}
                                    collapsed={sideCollapsed}
                                    openKeys={openKeys}
                                    selectedKeys={[selectedMenu && selectedMenu.key]}
                                    onOpenChange={this.handleMenuOpenChange}
                                />
                            </div>
                        </div>
                    </Rnd>
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
