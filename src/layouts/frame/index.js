import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BackTop, Spin} from 'antd';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import PageHead from '../page-head';
import Header from '../header';
import Side from '../side';
import {connect} from '../../models/index';
import {getSelectedMenuByPath} from '../../commons';
import './style.less';


@withRouter
@connect(state => {
    const {selectedMenu} = state.menu;
    const {title, breadcrumbs, show} = state.pageHead;
    const {show: showSide, width, collapsed, collapsedWidth, dragging} = state.side;
    const {loading} = state.global;
    const {pageFrameLayout, pageHeadFixed, pageHeadShow} = state.settings;
    return {
        selectedMenu,
        showPageHead: show,
        title,
        breadcrumbs,

        showSide,
        sideWidth: width,
        sideCollapsed: collapsed,
        sideCollapsedWidth: collapsedWidth,
        globalLoading: loading,
        sideDragging: dragging,
        layout: pageFrameLayout,
        pageHeadFixed,
        pageHeadShow, // 设置中统一控制的头部是否显示
    };
})
export default class FrameTopSideMenu extends Component {
    static propTypes = {
        layout: PropTypes.string,
    };

    static defaultProps = {
        layout: 'top-side-menu',    // top-menu side-menu
        pageHeadFixed: true,        // 页面头部是否固定
    };

    componentWillMount() {
        const {action, action: {menu, side}} = this.props;
        action.getStateFromStorage();
        menu.getMenus();
        menu.getMenuStatus();
        side.show();
        this.setBreadcrumbs();
        this.props.history.listen(() => {
            menu.getMenuStatus();
            side.show();
            this.setBreadcrumbs();
        });
    }

    setBreadcrumbs() {
        const {action: {pageHead}, pageHeadShow} = this.props;

        const selectedMenu = getSelectedMenuByPath(window.location.pathname);
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
        pageHeadShow ? pageHead.show() : pageHead.hide();
    }

    render() {
        let {
            layout,
            pageHeadFixed,
            showPageHead,
            title,
            breadcrumbs,

            showSide,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            globalLoading,
            sideDragging,
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        sideWidth = showSide ? sideWidth : 0;

        let transitionDuration = sideDragging ? '0ms' : `300ms`;

        const isTopSideMenu = layout === 'top-side-menu';
        const isSideMenu = layout === 'side-menu';
        const hasSide = isTopSideMenu || isSideMenu;

        if (!hasSide) {
            window.document.body.style.paddingLeft = '0px';
        } else {
            window.document.body.style.paddingLeft = `${sideWidth}px`;
        }

        const theme = (isTopSideMenu || isSideMenu) ? 'dark' : 'default';

        let pageHead = null;
        if (showPageHead) {
            pageHead = (
                <PageHead
                    title={title}
                    breadcrumbs={breadcrumbs}
                />
            );

            if (pageHeadFixed) {
                pageHead = (
                    <div styleName="page-head-fixed" style={{left: hasSide ? sideWidth : 0, transitionDuration}}>
                        {pageHead}
                    </div>
                );
            }
        }

        return (
            <div styleName="base-frame" className="no-print">
                <Helmet><title>{title}</title></Helmet>
                <BackTop/>
                <Header theme={(isTopSideMenu || isSideMenu) ? 'default' : 'dark'} layout={layout}/>
                <Side layout={layout} theme={theme}/>
                <div styleName={`content-top-space ${pageHeadFixed ? 'with-fixed-page-head' : ''}`}/>
                {pageHead}
                <div styleName="global-loading" style={{display: globalLoading ? 'block' : 'none'}}>
                    <Spin spinning size="large"/>
                </div>
            </div>
        );
    }
}
