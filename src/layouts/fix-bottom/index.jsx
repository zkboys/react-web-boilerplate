import React, {Component} from 'react';
import {connect} from "../../models/index";
import './style.less';

/**
 * 固定底部容器
 */
@connect(state => ({
    sideWidth: state.side.width,
    sideCollapsed: state.side.collapsed,
    sideCollapsedWidth: state.side.collapsedWidth,
}))
export default class FixBottom extends Component {
    static __FIX_BOTTOM = true;

    render() {
        let {
            sideWidth, sideCollapsedWidth, sideCollapsed, style = {}, styleName, children, ...others
        } = this.props;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;

        style = {left: sideWidth, ...style};
        styleName = styleName ? `${styleName} fix-bottom` : 'fix-bottom';
        return (
            <div
                {...others}
                styleName={styleName}
                style={style}
            >
                {children}
            </div>
        );
    }
}
