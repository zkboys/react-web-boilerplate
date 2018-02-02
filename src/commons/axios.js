import ZkAxios, {createAjaxHoc} from 'zk-axios';
import mockUrls from '../mock/url-config';
import handleError from './handle-error';
import handleSuccess from './handle-success';

/**
 * 判断请求是否是mock
 * @param url
 * @returns {boolean|*}
 */
export function isMock(url /* url, data, method, options */) {
    return mockUrls.indexOf(url) > -1 || url.startsWith('/mock');
}

/**
 * ajax工具，含有errorTip 和 successTip
 * @type {ZkAxios}
 */
export const zkAxios = new ZkAxios({
    onShowErrorTip: (error, errorTip) => handleError({error, errorTip}),
    onShowSuccessTip: (response, successTip) => handleSuccess({successTip}),
    isMock,
});

// 默认配置
zkAxios.defaults.baseURL = '/api';
zkAxios.defaults.timeout = 1000 * 60;
zkAxios.mockDefaults.baseURL = '/';

// ajax高阶组件
export const ajax = createAjaxHoc(zkAxios);

/**
 * ajax工具，不含有 errorTip和successTip
 * @type {ZkAxios}
 */
export const axios = new ZkAxios({
    isMock,
});

// 默认配置
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 1000 * 5;

// mockjs使用的axios实例
export const mockInstance = axios.mockInstance = zkAxios.mockInstance;

