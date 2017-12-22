import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';
import Logo from '../logo';
import HeaderUser from '../header-user';
import HeaderSearch from '../header-search';
import HeaderMenu from '../header-menu';
import {connect} from '../../models/index';
import './style.less';

@connect(state => {
    const {menus, topMenu} = state.menu;
    const {show: showSide, width, collapsed, collapsedWidth, dragging} = state.side;
    return {
        menus,
        topMenu,

        showSide,
        sideWidth: width,
        sideCollapsed: collapsed,
        sideCollapsedWidth: collapsedWidth,
        sideDragging: dragging,
    };
})
export default class Header extends Component {
    static propTypes = {
        layout: PropTypes.string,
        theme: PropTypes.string,
    };

    static defaultProps = {
        layout: 'top-side-menu',    // top-side-menu top-menu side-menu
        theme: 'default',           // default dark
    };

    handleToggle = () => {
        const {sideCollapsed} = this.props;
        this.props.action.side.setCollapsed(!sideCollapsed);
    };

    render() {
        let {
            layout,
            theme,
            menus,          // 所有的菜单数据
            topMenu,        // 当前页面选中菜单的顶级菜单
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            sideDragging,
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;

        const isTopSideMenu = layout === 'top-side-menu';
        const isTopMenu = layout === 'top-menu';
        const isSideMenu = layout === 'side-menu';
        const showToggle = isTopSideMenu || isSideMenu;
        const showMenu = isTopSideMenu || isTopMenu;

        let topMenus = menus;
        if (isTopSideMenu) {
            topMenus = menus && menus.map(item => ({key: item.key, text: item.text, path: item.path, icon: item.icon}));
        }
        if (isTopMenu) {
            topMenus = menus;
        }

        let transitionDuration = sideDragging ? '0ms' : '300ms';
        return (
            <div styleName="header" data-theme={theme}>
                <div styleName="logo" style={{width: sideWidth, transitionDuration}}>
                    <Link to="/">
                        <Logo min={sideCollapsed}/>
                    </Link>
                </div>
                {
                    showToggle ? (
                        <Icon
                            styleName="trigger"
                            type={sideCollapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.handleToggle}
                        />
                    ) : null
                }
                {
                    showMenu ? (
                        <HeaderMenu
                            theme={theme}
                            dataSource={topMenus}
                            selectedKeys={[topMenu && topMenu.key]}
                        />
                    ) : null
                }
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
        );
    }
}
