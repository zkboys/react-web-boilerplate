import React, {Component} from 'react';
import {Button} from 'antd';
import {PageContent} from 'zk-antd';
import './style.less';

export const PAGE_ROUTE = '/example/actions';
export const INIT_STATE = {
    scope: 'actionsSetState',
    sync: true,
    a: {
        b: {
            c: ['ccc111'],
            c2: 'c2',
        },
        b1: [],
        b2: 'b2',
    },
    d: 'd',
    e: 'e',
};

export class LayoutComponent extends Component {
    state = {};
    render() {
        return (
            <PageContent className="$action-set-state">
                <Button onClick={() => this.props.$action.showFullPageLoading()}>showFullPageLoading</Button>
                <p>
                    <Button onClick={() => {
                        this.props.$action.setState({
                            e: 'eeeeeee',
                        });
                    }}>$action.setState</Button>
                    <br/>
                    <span>{this.props.e}</span>
                </p>
                <p>
                    <Button onClick={() => {
                        this.props.$action.arrAppend('a.b.c', '11');
                    }}>$action.arrAppend 11</Button>
                    <Button onClick={() => {
                        this.props.$action.arrAppend('a.b.c', ['11', '22']);
                    }}>$action.arrAppend ['11', '22']</Button>
                    <Button onClick={() => {
                        this.props.$action.arrRemove('a.b.c', '11');
                    }}>$action.arrRemove 11</Button>
                    <Button onClick={() => {
                        this.props.$action.arrRemoveAll('a.b.c', '22');
                    }}>$action.arrRemoveAll 22</Button>
                    <br/>
                    <span>{this.props.a.b.c.join(',')}</span>
                </p>
                <p>
                    <Button onClick={() => {
                        this.props.$action.objSet('a.b.c2', '11');
                    }}>$action.objSet a.b.c2 = 11</Button>
                    <Button onClick={() => {
                        this.props.$action.objRemove('a.b.c2', '11');
                    }}>$action.objRemove a.b.c2</Button>
                    <br/>
                    <span>{this.props.a.b.c2}</span>
                </p>
                <p>
                    <Button onClick={() => {
                        this.props.$action.demo('我是demo');
                    }}>
                        测试共享操作action
                    </Button>
                    <br/>
                    <span>{this.props.demo.message}</span>
                </p>
            </PageContent>
        );
    }
}

export function mapStateToProps(state) {
    return {
        ...state.pageState.actionsSetState,
        demo: state.demo,
    };
}
