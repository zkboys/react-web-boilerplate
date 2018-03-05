import React, {Component} from 'react';
import {Table} from 'antd';
import DragColumn from './table/DragColumn';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/example/table-drag-column';

const DragColumnTable = DragColumn(Table);

export default class DragSortingTable extends Component {
    state = {
        columns: [
            {title: 'Name', dataIndex: 'name', key: 'name',},
            {title: 'Age', dataIndex: 'age', key: 'age',},
            {title: 'Address', dataIndex: 'address', key: 'address',},
            {title: 'Job', dataIndex: 'job', key: 'job',},
        ],

        data: [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            job: 'IT',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            job: 'CTO',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            job: 'CEO',
        }],
    };

    render() {
        return (
            <PageContent>
                <DragColumnTable
                    columns={this.state.columns}
                    onColumnMoved={columns => this.setState({columns})}
                    dataSource={this.state.data}
                />
            </PageContent>
        );
    }
}

