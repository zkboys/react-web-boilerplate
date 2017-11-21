import React, {Component} from 'react';
import {Menu, Dropdown, Avatar, Icon} from 'antd';
import avatar from './avatar.svg';
import {toLogin} from '../../commons';
import './style.less';

const Item = Menu.Item;
export default class HeaderUser extends Component {
    state = {};

    componentWillMount() {

    }

    componentDidMount() {

    }

    handleMenuClick = ({key}) => {
        if (key === 'logout') {
            // TODO 发请求，后端退出
            toLogin();
        }
    };

    render() {
        const name = 'zkboys';

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
