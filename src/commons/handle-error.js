import {notification} from 'antd';
import {toLogin} from './index';

/**
 * 尝试获取错误信息 errorTio > resData.message > error.message > '未知系统错误'
 *
 * @param error
 * @param errorTip
 * @returns {*}
 */
function getErrorTip({error, errorTip}) {
    if (errorTip) return errorTip;

    if (error && error.response) {
        const {status, message} = error.response;

        // 后端自定义信息
        if (message) return message;

        if (status === 401) { // 需要登录
            return toLogin();
        }

        if (status === 403) {
            return '您无权访问此资源！';
        }

        if (status === 404) {
            return '您访问的资源不存在！';
        }

        if (status === 504) {
            return '无法访问服务器！';
        }

    }

    if (error && error.message && error.message.startsWith('timeout of')) return '请求超时！';

    if (error) return error.message;

    return '未知系统错误';
}

export default function ({error, errorTip}) {
    if (errorTip === false) return;

    const description = getErrorTip({error, errorTip});

    notification.error({
        message: '错误！',
        description,
    });
}
