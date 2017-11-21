import React, {Component} from 'react';
import logo from './logo.svg';
import './style.less';

export default class index extends Component {
    static defaultProps = {
        logo: logo,
        title: 'React Web',
        min: false,
    };

    render() {
        const {min, title} = this.props;
        return (
            <div styleName="logo">
                <img src={logo} alt="logo"/>
                {
                    min ? null : <h1>{title}</h1>
                }
            </div>
        );
    }
}
