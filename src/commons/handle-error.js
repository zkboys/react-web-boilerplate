import {notification} from 'antd';
import {toLogin} from './index';

export default function ({error, errorTip}) {
    if (errorTip === false) return;
    let msg = '操作失败';
    if (errorTip) msg = errorTip;
    if (error && error.response) {
        const resData = error.response;
        const {status} = error.response;

        if (resData && resData.message) {
            msg = resData.message;
        }

        if (status === 401) { // 需要登录
            return toLogin();
        }

        if (status === 403) {
            msg = '您无权访问此资源！';
        }

        if (status === 404) {
            msg = '您访问的资源不存在！';
        }

        if (status === 504) {
            msg = '无法访问服务器！';
        }

    } else {
        msg = error && error.message;
    }

    if (error && error.message && error.message.startsWith('timeout of')) {
        msg = '请求超时！';
    }

    notification.error({
        message: '错误！',
        description: msg,
    });
}
