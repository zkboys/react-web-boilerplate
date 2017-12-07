import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconClose from './icon-close.png';


export default class index extends Component {
    static propTypes = {
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    state = {
        showCloseIcon: false,
    };


    handleBlur = () => {
        setTimeout(() => {
            this.setState({showCloseIcon: false});
        }, 100);
    };

    handleFocus = () => {
        const {value} = this.props;
        if (value) {
            this.setState({showCloseIcon: true});
        }
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.props.onChange(value);

        this.setState({showCloseIcon: !!value});
    };

    handleCloseIconClick = () => {
        this.props.onChange('');
        this.setState({showCloseIcon: false});
        this.input.focus();
    };

    render() {
        const {value} = this.props;
        const {showCloseIcon} = this.state;
        return (
            <div>
                <input
                    ref={node => this.input = node}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    value={value}
                    onChange={this.handleChange}
                    type="text"
                />
                <img
                    src={IconClose} alt="关闭"
                    style={{display: showCloseIcon ? 'inline-block' : 'none', height: 27, cursor: 'pointer'}}
                    onClick={this.handleCloseIconClick}
                />
            </div>
        );
    }
}
