import React, {Component} from 'react';
import {Button, Menu, Table} from 'antd'
import {ToolBar, Operator} from 'zk-antd';
import PageContent from '../../layouts/page-content';
import DragColumn from './table/DragColumn';
import DragRow from './table/DragRow';
import Animation from './table/Animation';
import RightClick from './table/RightClick';

export const PAGE_ROUTE = '/example/zk-table';

let WTable = DragColumn(Animation(DragRow(RightClick(Table))));

const MenuItemGroup = Menu.ItemGroup;

export default class Index extends Component {
    state = {
        columns: [
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
        ],
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
                <WTable
                    columns={this.state.columns}
                    onColumnMoved={columns => this.setState({columns})}

                    dataSource={dataSource}
                    onRowMoved={data => this.setState({dataSource: data})}

                    uniqueKey="id"

                    pagination={false}

                    rightClickContent={(record, index) => {
                        console.log(record, index);
                        return (
                            <Menu
                                onClick={(e) => {
                                    console.log(e);
                                }}
                                style={{width: 256}}
                                mode="vertical"
                            >
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="1">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Iteom 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </Menu>
                        );
                    }}
                />
            </PageContent>
        );
    }
}
