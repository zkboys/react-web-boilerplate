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
        bankNumber: '',
    };

    handleChange = (value) => {
        this.setState({value});
    };

    handleChange2 = (value2) => {
        this.setState({value2});
    };


    handleBankNumberChange = (e) => {
        let value = e.target.value;
        // 四个字符加一个空格
        value = value.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        // 优化语句：如果当前位置是空格字符，则自动清除掉
        if (value.charAt(value.length - 1) === ' ') {
            value = value.substring(0, value.length - 1);
        }

        // 获取当前光标位置
        const position = this.bankNumberNode.selectionStart;
        // 原bankNumber的值
        const {bankNumber = ''} = this.state;
        this.setState({bankNumber: value}, () => {

            // 添加时，遇到空格光标向后移动一位；删除时，遇到空格，光标向前移动一位
            const countSpace = (value, position) => {
                if (value.charAt(position - 1) === ' ') {
                    return value.length > bankNumber.length ? 1 : -1;
                }
                return 0;
            };

            //重新定位光标位置，start和end都需要设置，不然就是截取片段了
            this.bankNumberNode.selectionStart = position + countSpace(value, position);
            this.bankNumberNode.selectionEnd = position + countSpace(value, position);

        });
    };


    render() {
        const {value, value2} = this.state;
        return (
            <PageContent>

                银行卡 4位一个空格 保持光标位置
                <input
                    ref={node => this.bankNumberNode = node}
                    type="text"
                    value={this.state.bankNumber}
                    onChange={this.handleBankNumberChange}
                    placeholder="请输入银行卡号"
                />

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
