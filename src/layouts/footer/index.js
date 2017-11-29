import React from 'react';
import {Icon} from 'antd';
import './style.less';

export default function (props) {
    return (
        <div styleName="footer" {...props}>
            Copyright <Icon type="copyright"/> 2017 zkboys 个人做品
        </div>
    );
}
