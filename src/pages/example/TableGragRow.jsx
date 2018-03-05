import React, {Component} from 'react';
import {Table} from 'antd';
import PageContent from '../../layouts/page-content';
import DragRow from './table/DragRow';

export const PAGE_ROUTE = '/example/table-drag-row';

const DragRowTable = DragRow(Table);


export default class DragSortingTable extends Component {
    state = {
        data: [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }],
    };

    columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }];

    render() {
        return (
            <PageContent>
                <DragRowTable
                    columns={this.columns}
                    dataSource={this.state.data}
                    onRowMoved={dataSource => this.setState({data: dataSource})}
                />
            </PageContent>
        );
    }
}

