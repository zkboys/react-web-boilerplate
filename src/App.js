import React, {Component} from 'react';
import {LocaleProvider, Spin} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {Provider} from 'react-redux';
import moment from 'moment';
import * as storage from 'zk-utils/storage';
import {convertToTree} from 'zk-utils/tree-utils';
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
class App extends Component {
    state = {
        loading: false,
    };

    componentWillMount() {
        // 渲染页面开始之前的一些准备工作
        const userId = currentLoginUser && currentLoginUser.id;
        if (userId) {
            // 根据用户id查询用户菜单权限
            this.setState({loading: true});
            this.props.$service.systemService
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

                    const permissions = menus.map(item => {
                        if (item.type === '0') return item.key;
                        if (item.type === '1') return item.code;
                        return null;
                    });

                    // 根据order 排序
                    const orderedData = [...menus].sort((a, b) => {
                        const aOrder = a.order || 0;
                        const bOrder = b.order || 0;

                        // 如果order都不存在，根据 text 排序
                        if (!aOrder && !bOrder) {
                            return a.text > b.text ? 1 : -1;
                        }

                        return bOrder - aOrder;
                    });

                    // 设置顶级节点path
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
        const {loading} = this.state;
        return (
            <LocaleProvider locale={zhCN}>
                {
                    loading ?
                        (
                            <Spin style={{position: 'absolute', left: '50%', top: '30%'}} tip="Loading..." size={'large'}/>
                        )
                        :
                        (
                            <Provider store={store}>
                                <Router/>
                            </Provider>
                        )
                }
            </LocaleProvider>
        );
    }
}

export default App
