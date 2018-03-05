import React, {Component} from 'react';
import PropTypes from 'prop-types';
import domEvent from 'zk-utils/lib/dom-event-hoc';
import 'animate.css';

export default function (OriTable) {

    @domEvent()
    class RightClickTable extends Component {
        static propTypes = {
            rightClickContent: PropTypes.func,      // 右键内容
        };

        state = {
            show: false,
            left: 0,
            right: 0,
            content: '',
        };


        componentDidMount() {
            this.props.addEventListener(document, 'click', () => this.state.show && this.setState({show: false}));

            this.props.addEventListener(document, 'scroll', () => this.state.show && this.setState({show: false}));
        }

        handleRightClick = (record, index, e) => {
            e.preventDefault();
            let left = e.clientX;
            let top = e.clientY;
            let position = {left, top};

            const {rightClickContent} = this.props;
            if (!rightClickContent) return;
            const content = rightClickContent(record, index);

            this.setState({content, show: true, ...position}, () => {
                this.setContentPosition();
            });
        };

        setContentPosition = () => {
            if (!this.content) return;
            let {left, top} = this.state;
            const winWidth = document.documentElement.clientWidth || document.body.clientWidth;
            const winHeight = document.documentElement.clientHeight || document.body.clientHeight;
            const contentWidth = this.content.offsetWidth;
            const contentHeight = this.content.offsetHeight;

            if (left >= (winWidth - contentWidth)) {
                left = winWidth - contentWidth;
            }
            if (top > winHeight - contentHeight) {
                top = winHeight - contentHeight;
            }
            this.content.style.left = `${left}px`;
            this.content.style.top = `${top}px`;
        }

        render() {
            const {show, left, top, content} = this.state;
            return (
                <div>
                    <div style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 99999,
                        width: 0,
                        height: 0,
                    }}>
                        <div
                            id="js_right_click_content"
                            ref={node => this.content = node}
                            className="zk-table-content"
                            style={{
                                left,
                                top,
                                position: 'absolute',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            {show ? content : null}
                        </div>
                    </div>

                    <OriTable
                        {...this.props}
                        onRow={(record, index) => {
                            const {onRow} = this.props;
                            let onRowResult = {};
                            if (onRow) {
                                onRowResult = onRow(record, index);
                            }
                            return {
                                onContextMenu: (e) => this.handleRightClick(record, index, e),
                                ...onRowResult,
                            };
                        }}
                    />

                </div>
            );
        }
    }

    return RightClickTable;
}
