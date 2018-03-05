import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'animate.css';

/**
 * 动画表格高阶组件
 *
 * @example
 * import {Table} from 'antd';
 * const WTable = Animation(Table);
 *
 * ...
 *  <WTable
 *      ...
 *  />
 * ...
 *
 * @param OriTable
 * @returns {AnimationTable}
 */
export default function (OriTable) {

    class AnimationTable extends Component {
        constructor(props) {
            super(props);
            this.state.dataSource = props.dataSource;
        }

        static propTypes = {
            uniqueKey: PropTypes.string,            // 数据的唯一key值
            animationDuring: PropTypes.number,      // 动画持续时间
            inAnimationClass: PropTypes.string,     // 插入动画 class
            outAnimationClass: PropTypes.string,    // 移除动画 class
        };

        static defaultProps = {
            uniqueKey: 'id',
            animationDuring: 500,
            inAnimationClass: 'animated fadeInLeft',
            outAnimationClass: 'animated zoomOutRight',
        };

        state = {
            dataSource: [],
        };

        componentWillReceiveProps(nextProps) {
            let {uniqueKey, animationDuring, rowKey} = this.props;
            const nextDataSource = nextProps.dataSource || [];
            const dataSource = this.props.dataSource || [];

            if (!uniqueKey && typeof rowKey === 'string') {
                uniqueKey = rowKey;
            }

            // 筛选原dataSource中有哪些数据新的dataSource中已经删除
            let hasDeletedRecord = false;
            dataSource.forEach(item => {
                const exist = nextDataSource.find(it => it[uniqueKey] === item[uniqueKey]);
                if (!exist) {
                    hasDeletedRecord = true;
                    item.__isDeleted__ = true;
                }
            });

            nextDataSource.forEach(item => {
                const exist = dataSource.find(it => it[uniqueKey] === item[uniqueKey]);
                if (!exist) {
                    item.__isNewAdd__ = true;
                }
            });

            if (hasDeletedRecord) {
                this.setState({dataSource});

                setTimeout(() => {
                    this.setState({dataSource: nextDataSource});
                }, animationDuring);
            } else {
                this.setState({dataSource: nextDataSource});
            }
        }


        render() {
            const {
                rowKey,
                rowClassName,
                uniqueKey,
                inAnimationClass,
                outAnimationClass,
            } = this.props;
            const {dataSource} = this.state;

            return (
                <OriTable
                    {...this.props}
                    dataSource={dataSource}
                    rowKey={(record, index) => {
                        if (rowKey) {
                            if (typeof rowKey === 'string') {
                                return record[rowKey];
                            }

                            return rowKey(record, index);
                        }
                        return record[uniqueKey];
                    }}
                    rowClassName={(record, index) => {
                        let cn = '';
                        if (rowClassName) {
                            cn = rowClassName(record, index);
                        }

                        if (record.__isDeleted__) return `${outAnimationClass} ${cn}`;
                        if (record.__isNewAdd__) return `${inAnimationClass} ${cn}`;
                    }}
                />
            );
        }
    }

    return AnimationTable;
}

