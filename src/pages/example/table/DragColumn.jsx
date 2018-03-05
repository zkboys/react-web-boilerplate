import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragDropContext, DragSource, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './DragTable.less';

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

    className += ' drag-column-cursor';

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

/**
 * antd Table 表头可拖拽 高阶组件
 *
 * @example
 * import {Table} from 'antd';
 * const WTable = DragColumn(Table);
 *
 * ...
 *  <WTable
 *      columns={this.state.columns}
 *      onColumnMoved={columns => this.setState({columns})}
 *  />
 * ...
 *
 * @param OriTable
 * @returns {DragColumnTable}
 * @constructor
 */
export default function DragColumn(OriTable) {

    @DragDropContext(HTML5Backend)
    class DragColumnTable extends Component {
        constructor(props) {
            super(props);
            const {components} = this.props;
            this.components = {
                header: {
                    cell: Title,
                },
            };

            if (components && components.header) {
                this.components.header = {
                    ...components.header,
                    cell: Title,
                };
            }

            if (components) {
                this.components = {...components, ...this.components};
            }
        }

        static propTypes = {
            onColumnMoved: PropTypes.func.isRequired,
            columns: PropTypes.array.isRequired,
        };

        onMove = (dragIndex, hoverIndex) => {
            const {columns} = this.props;
            const dragCol = columns[dragIndex];
            const {onColumnMoved} = this.props;
            const newColumns = update({columns}, {
                columns: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCol]],
                },
            }).columns;

            if (onColumnMoved) onColumnMoved(newColumns, dragIndex, hoverIndex);
        };

        render() {
            const columns = this.props.columns.map((item, index) => ({
                ...item,
                onHeaderCell: () => ({index, onMove: this.onMove}),
            }));

            return (
                <OriTable
                    styleName='root'
                    {...this.props}
                    columns={columns}
                    components={this.components}
                />
            );
        }
    }

    return DragColumnTable;
}

