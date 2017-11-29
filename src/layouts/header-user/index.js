import React, {Component} from 'react';
import {Menu, Dropdown, Avatar, Icon} from 'antd';
import avatar from './avatar.svg';
import {toLogin, getCurrentLoginUser} from '../../commons';
import './style.less';

const Item = Menu.Item;

export default class HeaderUser extends Component {
    handleMenuClick = ({key}) => {
        if (key === 'logout') {
            toLogin();
        }
    };

    render() {
        const user = getCurrentLoginUser() || {};
        const name = user.name;

        const {className} = this.props;

        const menu = (
            <Menu styleName="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
                <Item><Icon type="user"/>个人中心</Item>
                <Item><Icon type="setting"/>设置</Item>
                <Menu.Divider/>
                <Item key="logout"><Icon type="logout"/>退出登录</Item>
            </Menu>
        );
        return (
            <div styleName="user-menu">
                <Dropdown overlay={menu}>
                  <span styleName="account" className={className}>
                    <Avatar size="small" styleName="avatar" src={avatar}/>
                      {name}
                  </span>
                </Dropdown>

            </div>
        );
    }
}
