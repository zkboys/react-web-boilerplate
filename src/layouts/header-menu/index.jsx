import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {FontIcon} from 'zk-antd';
import {renderNode} from 'zk-utils/lib/tree-utils';
import './style.less';

const SubMenu = Menu.SubMenu;

export default class index extends Component {
    static propTypes = {
        dataSource: PropTypes.array,    // 菜单数据
        theme: PropTypes.string,        // 主题
        selectedKeys: PropTypes.array,  // 选中菜单keys
    };

    static defaultProps = {
        dataSource: [],
        theme: 'default',
        selectedKeys: [],
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
        const {
            theme,
            selectedKeys,
        } = this.props;
        return (
            <div styleName="header-menu">
                <Menu
                    selectedKeys={selectedKeys}
                    mode="horizontal"
                    theme={theme}
                >
                    {this.renderMenus()}
                </Menu>
            </div>
        );
    }
}
