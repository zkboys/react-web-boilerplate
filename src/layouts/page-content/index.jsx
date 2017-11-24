import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import Footer from '../footer';

export default class index extends Component {
    static propTypes = {
        footer: PropTypes.bool,
    };

    static defaultProps = {
        footer: true,
    };

    render() {
        const {footer, children} = this.props;
        const style = {};
        const hasFixBottom = children.find(item => item.type.displayName === 'Connect(FixBottom)');

        if (hasFixBottom) {
            style.marginBottom = '66px';
        }

        const divProps = {...this.props};
        Reflect.deleteProperty(divProps, 'footer');

        divProps.style = {...divProps.style, ...style};
        return (
            <div {...divProps}>
                <div styleName="page-content">
                    {children}
                </div>
                {footer ? <div styleName="footer"><Footer/></div> : null}
            </div>
        );
    }
}
