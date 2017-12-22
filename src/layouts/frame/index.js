import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BackTop, Spin} from 'antd';
import {Helmet} from 'react-helmet';
import {withRouter} from 'react-router-dom';
import PageHead from '../page-head';
import Header from '../header';
import Side from '../side';
import {connect} from '../../models/index';
import './style.less';


@withRouter
@connect(state => {
    const {selectedMenu} = state.menu;
    const {title, breadcrumbs, show} = state.pageHead;
    const {show: showSide, width, collapsed, collapsedWidth} = state.side;
    const {loading} = state.global;
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
    };
})
export default class FrameTopSideMenu extends Component {
    static propTypes = {
        layout: PropTypes.string,
    };

    static defaultProps = {
        layout: 'top-side-menu', // top-menu side-menu
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
            layout,
            showPageHead,
            title,
            breadcrumbs,

            showSide,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            globalLoading,
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;

        const isTopSideMenu = layout === 'top-side-menu';
        const isSideMenu = layout === 'side-menu';
        const hasSide = isTopSideMenu || isSideMenu;

        if (!hasSide) {
            window.document.body.style.paddingLeft = '0px';
        } else {
            window.document.body.style.paddingLeft = showSide ? `${sideWidth}px` : 0;
        }

        const theme = (isTopSideMenu || isSideMenu) ? 'default' : 'dark';

        return (
            <div styleName="base-frame" className="no-print">
                <Helmet><title>{title}</title></Helmet>
                <BackTop/>
                <Header theme={theme} layout={layout}/>
                <Side layout={layout}/>
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
