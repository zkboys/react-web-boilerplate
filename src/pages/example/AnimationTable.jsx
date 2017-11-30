import React, {Component} from 'react';
import {Button} from 'antd'
import {AnimationTable, ToolBar, Operator} from 'zk-antd';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/example/animation-table';

export default class Index extends Component {
    state = {
        dataSource: [],
        count: 0,
    };

    componentWillMount() {
        const dataSource = [];
        let count = 0;
        for (let i = 0; i < 10; i++) {
            dataSource.push({
                id: `${i}`,
                name: `姓名${i}`,
                gender: `性别${i}`,
                job: `工作${i}`,
            });
            count++;
        }
        this.setState({dataSource, count});
    }

    componentDidMount() {

    }

    columns = [
        {title: '用户名', dataIndex: 'name', key: 'name'},
        {title: '性别', dataIndex: 'gender', key: 'gender'},
        {title: '工作', dataIndex: 'job', key: 'job'},
        {
            title: '操作', dataIndex: 'operator', key: 'operator',
            render: (text, record) => {
                const {id} = record;
                const items = [{
                    label: '删除',
                    color: 'red',
                    onClick: () => {
                        let {dataSource} = this.state;
                        const newDataSource = dataSource.filter(item => item.id !== id);
                        this.setState({dataSource: newDataSource});
                    },
                }];
                return <Operator items={items}/>
            },
        },
    ];

    handleAdd = () => {
        const dataSource = [...this.state.dataSource];
        const {count} = this.state;
        let i = count + 1;
        dataSource.unshift({
            id: `${i}`,
            name: `姓名${i}`,
            gender: `性别${i}`,
            job: `工作${i}`,
        });
        this.setState({dataSource, count: i});
    };

    render() {
        const {dataSource} = this.state;
        return (
            <PageContent>
                <ToolBar>
                    <Button onClick={this.handleAdd} type="primary">添加</Button>
                </ToolBar>
                <AnimationTable
                    columns={this.columns}
                    dataSource={dataSource}
                    pagination={false}
                    uniqueKey="id"
                />
            </PageContent>
        );
    }
}
