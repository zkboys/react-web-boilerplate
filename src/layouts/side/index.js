import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import {getScrollBarWidth} from 'zk-utils';
import SideMenu from '../side-menu';
import {connect} from '../../models/index';
import './style.less';

const scrollBarWidth = getScrollBarWidth();

@connect(state => {
    const {menus, openKeys, topMenu, selectedMenu} = state.menu;
    const {show: showSide, width, collapsed, collapsedWidth, dragging} = state.side;
    return {
        menus,
        openKeys,
        topMenu,
        selectedMenu,

        showSide,
        sideWidth: width,
        sideCollapsed: collapsed,
        sideCollapsedWidth: collapsedWidth,
        sideDragging: dragging,
    };
})
export default class Side extends Component {
    static propTypes = {
        layout: PropTypes.string,
    };

    static defaultProps = {
        layout: 'top-side-menu', // top-menu side-menu
    };

    handleMenuOpenChange = (openKeys) => {
        const {sideCollapsed} = this.props;
        if (!sideCollapsed) this.props.action.menu.setOpenKeys(openKeys);
    };

    handleSideResizeStart = () => {
        this.props.action.side.setDragging(true);
    };

    handleSideResize = (e, direction, ref) => {
        this.props.action.side.setWidth(ref.offsetWidth);
    };

    handleSideResizeStop = () => {
        this.props.action.side.setDragging(false);
    };

    render() {
        let {
            layout,

            menus,          // 所有的菜单数据
            openKeys,       // 当前菜单打开keys
            topMenu,        // 当前页面选中菜单的顶级菜单
            selectedMenu,   // 当前选中菜单

            showSide,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            sideDragging,
        } = this.props;


        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        const sideInnerWidth = sideWidth + scrollBarWidth;
        const outerOverFlow = sideCollapsed ? 'visible' : 'hidden';
        const innerOverFlow = sideCollapsed ? 'visible' : '';
        let transitionDuration = sideDragging ? '0ms' : `300ms`;

        const isTopSideMenu = layout === 'top-side-menu';
        const isSideMenu = layout === 'side-menu';
        const hasSide = isTopSideMenu || isSideMenu;

        // 左侧菜单数据，与顶部菜单配合显示顶部菜单的子菜单；
        let sideMenus = menus;
        if (isTopSideMenu) {
            sideMenus = topMenu && topMenu.children;
        }
        if (isSideMenu) {
            sideMenus = menus;
        }

        if (hasSide) return (
            <div styleName="side" style={{width: sideWidth, display: showSide ? 'block' : 'none', transitionDuration}}>
                <Rnd
                    disableDragging
                    enableResizing={{right: !sideCollapsed}}
                    size={{width: sideWidth}}
                    style={{
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        transition: `all ${transitionDuration}`
                    }}
                    position={{x: 0, y: 0}}
                    onResizeStart={this.handleSideResizeStart}
                    onResize={this.handleSideResize}
                    onResizeStop={this.handleSideResizeStop}
                >
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
        );
        return null;
    }
}
