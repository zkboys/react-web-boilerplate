import React, {Component} from 'react';
import {LocaleProvider, Spin} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Provider} from 'react-redux';
import * as storage from 'zk-utils/lib/storage';
import {convertToTree} from 'zk-utils/lib/tree-utils';
import {init as initRedux} from 'zk-redux';
import handleError from './commons/handle-error';
import handleSuccess from './commons/handle-success';
import {configureStore} from './models/index';
import service from './services/service-hoc';
import {
    setCurrentLoginUser,
    getCurrentLoginUser,
    setMenuTreeData,
} from './commons';
import Router from './router/Router';

const initStorage = storage.init;

// moment国际化为中国
moment.locale('zh-cn');

const currentLoginUser = getCurrentLoginUser();

// 初始化存储 设置存储前缀，用于区分不同用户的数据
initStorage({keyPrefix: currentLoginUser && currentLoginUser.id});

// 初始化redux
initRedux({storage, handleError, handleSuccess});

// models store
const store = configureStore();

@service()
export default class App extends Component {
    state = {
        loading: false,
        hasError: false,
    };

    /**
     * 只捕获渲染周期过程中的异常
     *
     * Error boundaries do not catch errors for:
     *
     * 1. Event handlers (learn more) 事件处理函数并不属于react渲染的一部分，所以不捕获
     * 2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
     * 3. Server side rendering
     * 4. Errors thrown in the error boundary itself (rather than its children)
     *
     * @param error
     * @param info
     */
    componentDidCatch(error, info) {
        // 可以基于 hasError 展示出错UI
        this.setState({hasError: true});
        // 可以将错误上报服务器
        // logErrorToMyService(error, info);
    }

    componentWillMount() {
        // 渲染页面开始之前的一些准备工作
        const userId = currentLoginUser && currentLoginUser.id;
        if (userId) {
            // 根据用户id查询用户菜单权限
            this.setState({loading: true});
            this.props.service.systemService
                .getMenus({userId})
                .then(res => {
                    let menus = res || [];
                    if (process.env.NODE_ENV === 'development') {
                        // 这里做个备份，防止数据丢失之后，方便恢复菜单数据。
                        menus && menus.length && window.localStorage.setItem(`${currentLoginUser.name}-menus.bak`, JSON.stringify(menus));
                    }

                    // 处理path： 只声明了url，没有声明path，为iframe页面
                    menus = menus.map(item => {
                        if (item.url && !item.path) {
                            item.path = `/frame/(${item.url})`;
                        }
                        return item;
                    });

                    // 用户权限code，通过菜单携带过来的
                    const permissions = menus.map(item => {
                        if (item.type === '0') return item.key;
                        if (item.type === '1') return item.code;
                        return null;
                    });

                    // 菜单根据order 排序
                    const orderedData = [...menus].sort((a, b) => {
                        const aOrder = a.order || 0;
                        const bOrder = b.order || 0;

                        // 如果order都不存在，根据 text 排序
                        if (!aOrder && !bOrder) {
                            return a.text > b.text ? 1 : -1;
                        }

                        return bOrder - aOrder;
                    });

                    // 设置顶级节点path，有的顶级没有指定path，默认设置为子孙节点的第一个path
                    const findPath = (node) => {
                        const children = orderedData.filter(item => item.parentKey === node.key);
                        let path = '';
                        if (children && children.length) {
                            for (let i = 0; i < children.length; i++) {
                                const child = children[i];
                                if (child.path) {
                                    path = child.path;
                                    break;
                                }
                                path = findPath(child);
                            }
                        }
                        return path;
                    };
                    orderedData.forEach(item => {
                        if (!item.path) {
                            item.path = findPath(item);
                        }
                    });

                    const menuTreeData = convertToTree(orderedData);
                    setMenuTreeData(menuTreeData);

                    currentLoginUser.permissions = permissions;
                    setCurrentLoginUser(currentLoginUser);
                })
                .finally(() => {
                    this.setState({loading: false});
                });
        }
    }

    render() {
        const {loading, hasError} = this.state;
        // TODO 完善崩溃页面
        if (hasError) {
            return '页面崩溃了。。。（崩溃信息需要完善）';
        }
        return (
            <LocaleProvider locale={zhCN}>
                {
                    loading ?
                        <Spin style={{position: 'absolute', left: '50%', top: '30%'}} tip="Loading..." size={'large'}/>
                        :
                        <Provider store={store}><Router/></Provider>
                }
            </LocaleProvider>
        );
    }
}
