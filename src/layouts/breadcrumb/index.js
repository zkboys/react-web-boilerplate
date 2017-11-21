import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import {FontIcon} from 'zk-antd';
import './style.less';

const Item = Breadcrumb.Item;

export default class index extends Component {
    static propTypes = {
        dataSource: PropTypes.array, // 数据源
    };

    static defaultProps = {
        dataSource: [],
    };

    renderItems() {
        const {dataSource} = this.props;
        if (dataSource && dataSource.length) {
            return dataSource.map(({key, icon, text, path}) => {
                if (path) {
                    return (
                        <Item key={key}>
                            <Link to={path}>
                                {icon ? <FontIcon type={icon}/> : null}
                                {text}
                            </Link>
                        </Item>
                    );
                }
                return (
                    <Item key={key}>
                        {icon ? <FontIcon type={icon}/> : null}
                        {text}
                    </Item>
                );
            })
        }
        return null;
    }

    render() {
        return (
            <div styleName="breadcrumb">
                <Breadcrumb>
                    {this.renderItems()}
                </Breadcrumb>
            </div>
        );
    }
}
