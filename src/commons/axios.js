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
 * ajax工具
 * @type {ZkAxios}
 */
export const zkAxios = new ZkAxios({
    onShowErrorTip: handleError,
    onShowSuccessTip: (response, successTip) => handleSuccess({successTip}),
    isMock,
});

// 默认配置
zkAxios.defaults.baseURL = '/api';
zkAxios.defaults.timeout = 1000 * 5;
zkAxios.mockDefaults.baseURL = '/';

// mockjs使用的axios实例
export const mockInstance = zkAxios.mockInstance;

/**
 * ajax高阶组件
 */
export const ajax = createAjaxHoc(zkAxios);
