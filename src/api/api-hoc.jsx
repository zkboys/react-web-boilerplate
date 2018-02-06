import React, {Component} from 'react';
import {firstLowerCase} from 'zk-utils';
import {allApiClass} from './index';

/**
 * api高级组件
 * 将api属性注入到目标组件props中，目标组件可以通过this.props.api(...)方式进行使用;
 * 在componentWillUnmount方法中，进行统一资源（ajax等）清除（打断未完成ajax请求）
 * @example
 * import api from 'path/to/api-hoc';
 * // 装饰器方式：
 * // @api() // 不指定api，将注入所有api
 * // class SomeComponent extends Component {...}
 *
 * // 传递参数，修改注入的props属性
 * // @event({propName = 'api', someApi}) // 组件内调用：this.props.api
 * // class SomeComponent extends Component {...}
 *
 * @example
 * // 直接使用
 * import {api} from 'path/to/api-hoc';
 * const WrappedComponet = api()(SomeComponent);
 *
 * @module 发布订阅高级组件
 */

const api = (options) => (WrappedComponent) => {
    class WithSubscription extends Component {
        constructor(props) {
            super(props);
            const {propName = 'api'} = options || {};
            this.propName = propName;
            this.apis = {};
            // 创建api实例，实例名首字母自动转为小写

            // 没有设置api，默认注入全部api
            if (!options || (Object.keys(options).length === 1 && Object.keys(options)[0] === 'propName')) {
                Object.keys(allApiClass).forEach(item => {
                    if (item !== this.propName) this.apis[firstLowerCase(item)] = new allApiClass[item]({useResource: true, useTip: true});
                });
            } else {
                // 有指定api
                Object.keys(options).forEach(item => {
                    if (item !== this.propName) this.apis[firstLowerCase(item)] = new options[item]();
                });
            }
        }

        static displayName = `WithSubscription(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        componentWillUnmount() {
            // 当前组件卸载，释放各个api占用的资源
            Object.keys(this.apis).forEach(item => {
                const se = this.apis[item];
                if (se.release) {
                    se.release();
                }
            });
        }

        render() {
            const injectProps = {
                [this.propName]: this.apis,
            };
            return <WrappedComponent {...injectProps} {...this.props}/>;
        }
    }

    return WithSubscription;
};

export default api;
