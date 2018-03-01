import React, {Component} from 'react';
import {Table} from 'antd';
import {DragDropContext, DragSource, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import PageContent from '../../layouts/page-content';
import './TableGragColumn.less';

export const PAGE_ROUTE = '/example/table-drag-column';

function dragDirection(dragIndex,
                       hoverIndex,
                       initialClientOffset,
                       clientOffset,
                       sourceClientOffset,) {
    const hoverMiddleX = (initialClientOffset.x - sourceClientOffset.x) / 2;
    const hoverClientX = clientOffset.x - sourceClientOffset.x;
    if (dragIndex < hoverIndex && hoverClientX > hoverMiddleX) {
        return 'rightward';
    }
    if (dragIndex > hoverIndex && hoverClientX < hoverMiddleX) {
        return 'leftward';
    }
}

let Title = (props) => {
    const {
        isOver,
        connectDragSource,
        connectDropTarget,
        onMove, // 虽然没用到，但是为了从restProps中去除onMove
        dragCol,
        clientOffset,
        sourceClientOffset,
        initialClientOffset,
        ...restProps
    } = props;
    const style = {...restProps.style, cursor: 'move'};

    let className = restProps.className;
    if (isOver && initialClientOffset) {
        const direction = dragDirection(
            dragCol.index,
            restProps.index,
            initialClientOffset,
            clientOffset,
            sourceClientOffset
        );
        if (direction === 'rightward') {
            className += ' drop-over-rightward';
        }
        if (direction === 'leftward') {
            className += ' drop-over-leftward';
        }
    }

    return connectDragSource(
        connectDropTarget(
            <th
                {...restProps}
                className={className}
                style={style}
            />
        )
    );
};

const colSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
};

const colTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.onMove(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

Title = DropTarget('col', colTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('col', colSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragCol: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(Title)
);

@DragDropContext(HTML5Backend)
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

    components = {
        header: {
            cell: Title,
        },
    };

    onMove = (dragIndex, hoverIndex) => {
        const {columns} = this.state;
        const dragCol = columns[dragIndex];

        this.setState(update(this.state, {
            columns: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCol]],
            },
        }));
    };

    render() {
        const columns = this.state.columns.map((item, index) => ({
            ...item,
            onHeaderCell: () => ({index, onMove: this.onMove}),
        }));

        return (
            <PageContent styleName="root">
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    components={this.components}
                />
            </PageContent>
        );
    }
}

