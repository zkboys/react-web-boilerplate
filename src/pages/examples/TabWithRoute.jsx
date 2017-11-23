import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

export const PAGE_ROUTE = '/example/tab-with-route/tab/:activeKey';

export const INIT_STATE = {
    scope: 'tabWithRoute',
    activeKey: '',
};

export default class TabWithRoute extends Component {
    state = {};

    componentDidMount() {
        const {pageHead} = this.props.$action;

        pageHead.setTitle('自定义title');
        pageHead.hide();
    }

    handleChange = (activeKey) => {
        this.props.history.replace(PAGE_ROUTE.replace(':activeKey', activeKey));
    };

    render() {
        const {activeKey} = this.props;
        return (
            <div>
                <Route path={PAGE_ROUTE} children={({match}) => {
                    if (match) {
                        let key = match.params.activeKey;
                        if (key !== activeKey) {
                            key = key === ':activeKey' ? '1' : key;
                            this.props.$action.setState({activeKey: key})
                        }
                    }
                    return null;
                }}/>
                <Tabs activeKey={activeKey} onChange={this.handleChange}>
                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        ...state.pageState.tabWithRoute,
    };
}
