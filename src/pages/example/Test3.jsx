import React, {Component} from 'react';
import moment from 'moment';
import {TimePicker} from 'antd';

export const PAGE_ROUTE = '/test/3';


class AA extends Component {
    constructor(props) {
        super(props);
        console.log('create AA');
    }

    componentWillMount() {
        console.log('will mount AA');
    }

    componentDidMount() {
        console.log('did mount AA');
    }

    componentWillUnmount() {
        console.log('unMount AA');
    }

    render() {
        console.log('render AA');
        return (
            <span>{this.props.children}</span>
        );
    }
}

export default class Test3 extends Component {
    state = {
        data: ['06:20'],
        users: [{id: 1, name: '张三'}, {id: 2, name: '李四'}, {id: 22, name: "王五"}],
    };

    addTimeItem(index) {
        const {data} = this.state;
        let arr = [...data];
        arr.splice(index + 1, 0, arr.length);
        this.setState({data: [...arr]});
    }


    removeTimeItem(index) {
        console.log(index)
        const {data} = this.state;
        let arr = [...data];
        arr.splice(index, 1)
        console.log(arr);
        this.setState({data: [...arr]});
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {
                    this.state.data.map((el, index) => {
                        return (
                            <div key={index}>
                                <TimePicker defaultValue={el ? moment(el, 'HH:mm') : null} format="HH:mm"/>
                                <span>{el}</span>
                                {/*<AA>{moment().valueOf()}</AA>*/}
                                <a href="javascript:void(0);" onClick={this.addTimeItem.bind(this, index)}>增加</a>
                                <a href="javascript:void(0);" onClick={this.removeTimeItem.bind(this, index)}> 删除</a>
                            </div>
                        );
                    })
                }

                <div>
                    <h3>用户列表</h3>
                    {this.state.users.map(u => <div key={u.id}>{u.id}:{u.name}</div>)}
                </div>
                <AA key={`123`}>这个牛逼</AA>
            </div>
        )
    }
};

