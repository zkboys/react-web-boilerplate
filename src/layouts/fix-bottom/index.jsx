import React, {Component} from 'react';
import {connect} from "../../models/index";
import './style.less';

@connect(state => ({
    sideWidth: state.side.width,
    sideCollapsed: state.side.collapsed,
}))
export default class FixBottom extends Component {
    render() {
        let {sideWidth, sideCollapsed, style = {}, styleName, className, children} = this.props;

        sideWidth = sideCollapsed ? 80 : sideWidth;

        style = {left: sideWidth, ...style};
        styleName = styleName ? `${styleName} fix-bottom` : 'fix-bottom';
        return (
            <div className={className} styleName={styleName} style={style}>
                {children}
            </div>
        );
    }
}
