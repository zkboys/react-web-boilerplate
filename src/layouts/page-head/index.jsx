import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../breadcrumb';
import './style.less';

export default class index extends Component {
    static propTypes = {
        title: PropTypes.string,
        breadcrumbs: PropTypes.array,
    };
    static defaultProps = {
        title: '',
        breadcrumbs: [],
    };

    render() {
        const {title, breadcrumbs} = this.props;
        return (
            <div styleName="page-header">
                <h1>{title}</h1>

                <div styleName="breadcrumb">
                    <Breadcrumb
                        dataSource={breadcrumbs}
                    />
                </div>
            </div>
        );
    }
}
