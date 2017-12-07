import React, {Component} from 'react';
import InputWithClose from './input-with-close/InputWithClose.jsx';

export const PAGE_ROUTE = '/dashboard/workplace';

export default class index extends Component {
    state = {
        value: '',
        value2: '',
    };

    handleChange = (value) => {
        this.setState({value});
    };

    handleChange2 = (value2) => {
        this.setState({value2});
    };


    render() {
        const {value, value2} = this.state;
        return (
            <div>
                <InputWithClose
                    value={value}
                    onChange={this.handleChange}
                />
                <InputWithClose
                    value={value2}
                    onChange={this.handleChange2}
                />
            </div>
        );
    }
}
