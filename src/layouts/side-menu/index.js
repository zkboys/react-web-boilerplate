import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import {FontIcon} from 'zk-antd';
import {renderNode} from 'zk-utils/tree-utils';
import './style.less';

const SubMenu = Menu.SubMenu;

export default class index extends Component {
    static propTypes = {
        dataSource: PropTypes.array, // 菜单数据
        theme: PropTypes.string, // 主题
        collapsed: PropTypes.bool, // 是否收起
        openKeys: PropTypes.array, // 打开菜单keys
        selectedKeys: PropTypes.array, // 选中菜单keys
        onOpenChange: PropTypes.func, // 菜单打开关闭时触发
    };

    static defaultProps = {
        dataSource: [],
        theme: 'dark',
        collapsed: false,
        openKeys: [],
        selectedKeys: [],
        onOpenChange: () => true,
    };

    handleOpenChange = (openKeys) => {
        this.props.onOpenChange(openKeys);
    };

    renderMenus() {
        const {dataSource} = this.props;

        if (dataSource && dataSource.length) {
            return renderNode(dataSource, (item, children) => {
                const key = item.key;
                const path = item.path;
                const text = item.text;
                const icon = item.icon;

                let title = <span><FontIcon type={icon}/><Icon type="home" style={{display: 'none'}}/><span>{text}</span></span>;

                if (children) {
                    return (
                        <SubMenu key={key} title={title}>
                            {children}
                        </SubMenu>
                    );
                }

                return (
                    <Menu.Item key={key}>
                        <Link to={path}>
                            {title}
                        </Link>
                    </Menu.Item>
                );
            });
        }
        return null;
    }

    render() {
        let {theme, collapsed, openKeys, selectedKeys} = this.props;
        const menuProps = collapsed ? {} : {
            openKeys,
        };

        return (
            <div styleName="side-menu">
                <Menu
                    {...menuProps}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    theme={theme}
                    inlineCollapsed={collapsed}
                    onOpenChange={this.handleOpenChange}
                >
                    {this.renderMenus()}
                </Menu>
            </div>
        );
    }
}
