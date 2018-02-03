import React, {Component} from 'react';
import {Menu, Dropdown, Avatar, Icon} from 'antd';
import {Link} from 'react-router-dom';
import avatar from './avatar.svg';
import {toLogin, getCurrentLoginUser} from '../../commons';
import './style.less';

const Item = Menu.Item;

export default class HeaderUser extends Component {
    static defaultProps = {
        theme: 'default',
    };
    handleMenuClick = ({key}) => {
        if (key === 'logout') {
            toLogin();
        }
    };

    render() {
        const user = getCurrentLoginUser() || {};
        const name = user.name;

        const {className, theme} = this.props;

        const menu = (
            <Menu styleName="menu" theme={theme} selectedKeys={[]} onClick={this.handleMenuClick}>
                <Item><Icon type="user"/>个人中心</Item>
                <Item><Link to="/settings"><Icon type="setting"/>设置</Link></Item>
                <Menu.Divider/>
                <Item key="logout"><Icon type="logout"/>退出登录</Item>
            </Menu>
        );
        return (
            <div styleName="user-menu" ref={node => this.userMenu = node}>
                <Dropdown overlay={menu} getPopupContainer={() => (this.userMenu || document.body)}>
                  <span styleName="account" className={className}>
                    <Avatar size="small" styleName="avatar" src={avatar}/>
                      {name}
                  </span>
                </Dropdown>

            </div>
        );
    }
}
