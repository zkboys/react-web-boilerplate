import React, {Component} from 'react';
import {Button} from 'antd';
import InputWithClose from './input-with-close/InputWithClose.jsx';
import {print} from "../../../../commons";
import PageContent from '../../../../layouts/page-content';
import './style.css';

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
            <PageContent>
                <Button className="no-print" onClick={() => print()}>打印</Button>
                <div styleName="test" className="no-print">123</div>
                <InputWithClose
                    value={value}
                    onChange={this.handleChange}
                />
                <InputWithClose
                    value={value2}
                    onChange={this.handleChange2}
                />
            </PageContent>
        );
    }
}
