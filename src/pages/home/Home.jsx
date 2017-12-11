import React, {Component} from 'react'
import {connect} from "../../models/index";
import './style.less'

@connect(state => ({menus: state.menu.menus, loginUser: state.global.loginUser}))
export default class Home extends Component {
    componentWillMount() {
        console.log(this.props.loginUser);
        // home 直接跳转 到系统第一个可用菜单页面
        const {menus} = this.props;
        if (menus && menus.length) {
            let path;
            for (let i = 0; i < menus.length; i++) {
                const m = menus[i];
                if (m.path) {
                    path = m.path;
                    break;
                }
            }
            if (path) {
                console.log(path);
                this.props.history.replace(path);
            }
        }
    }

    render() {
        return (
            <div/>
        );
    }
}
