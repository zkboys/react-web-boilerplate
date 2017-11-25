import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import FixBottom from '../../../layouts/fix-bottom';
import PageContent from '../../../layouts/page-content';
import {connect} from '../../../models';

import {
    ListPage,
    Operator,
} from 'zk-antd';
import './style.less';

export const PAGE_ROUTE = '/users';

@connect(state => ({
    users: state.user.users,
    total: state.user.total,
    loading: state.user.loading,
}))
export default class UserList extends Component {

    state = {
        params: {pageNum: 1},
    };

    queryItems = [
        [
            {type: 'input', field: 'name', label: '姓名', collapsedShow: true}, // collapsedShow 收起时显示
            {type: 'input', field: 'mobile', label: '电话', collapsedShow: true},
            {type: 'input', field: 'email', label: '邮箱', collapsedShow: true},
            {type: 'input', field: 'position', label: '职位'},
            {type: 'input', field: 'gender', label: '性别'},

            {type: 'input', field: 'gender1', label: '性别'},
            {type: 'input', field: 'gender2', label: '性别'},
            {type: 'input', field: 'gender3', label: '性别'},
            {type: 'input', field: 'gender4', label: '性别'},
            {type: 'input', field: 'gender5', label: '性别'},
            {type: 'input', field: 'gender6', label: '性别'},
        ]
    ];

    toolItems = [
        {
            type: 'primary', text: '添加', icon: 'plus-circle-o',
            onClick: () => {
                this.props.action.pageHead.setTitle('查询');
            },
        },
    ];

    columns = [
        {title: '姓名', dataIndex: 'name'},
        {title: '性别', dataIndex: 'gender'},
        {title: '电话', dataIndex: 'mobile'},
        {title: '邮箱', dataIndex: 'email'},
        {title: '备注', dataIndex: 'remark'},
        {
            title: '操作',
            key: 'operator',
            width: 300,
            render: (text, record) => {
                const {id} = record;
                const {promptVisible = {}} = this.state;
                const items = [
                    {
                        label: <Link to={`/users/detail/${id}`}>详情</Link>,
                        // isMore: true,
                    },
                    {
                        label: '修改',
                        disabled: true,
                        visible: true,
                        onClick: () => this.props.router.push(`/example/users/+add/${record.id}?tabName=修改用户`),
                    },
                    {
                        label: '删除',
                        color: 'red',
                        isMore: true,
                        // disabled: true,
                        confirm: {
                            title: `您确定要删除“${record.loginName}”？`,
                            onConfirm: () => {
                                console.log('删除', record);
                                const dataSource = this.state.dataSource.filter(item => item.id !== record.id);
                                this.setState({
                                    dataSource,
                                });
                            },
                        },
                    },
                    {
                        label: '驳回',
                        loading: false,
                        color: 'green',
                        prompt: { // 这个加入更多，弹出之后，输入，输入框会出现无法定位bug，prompt尽量不要加入更多，或者改为弹框等其他形式。
                            title: '驳回原因',
                            okText: '确定',
                            cancelText: '取消',
                            onCancel: () => console.log('cancel'),
                            onConfirm: value => console.log(value),
                            inputProps: {
                                style: {width: 200},
                                placeholder: '请输入驳回原因',
                            },
                            decorator: {
                                rules: [
                                    {required: true, message: '请输入驳回原因'},
                                ],
                            },
                        },
                    },
                    {
                        label: '驳回2',
                        loading: false,
                        color: 'green',
                        prompt: { // 这个加入更多，弹出之后，输入，输入框会出现无法定位bug，prompt尽量不要加入更多，或者改为弹框等其他形式。
                            visible: promptVisible[id],
                            title: '驳回原因',
                            okText: '确定',
                            cancelText: '取消',
                            onClickLabel: () => {
                                Object.keys(promptVisible).forEach(item => promptVisible[item] = false);
                                promptVisible[id] = true;
                                this.setState({promptVisible});
                            },
                            onCancel: () => {
                                promptVisible[id] = false;
                                this.setState({promptVisible});
                            },
                            onConfirm: values => {
                                console.log(values);
                                promptVisible[id] = false;
                                this.setState({promptVisible});
                            },
                            items: [
                                {
                                    type: 'date',
                                    field: 'comeDate',
                                    label: '入住',
                                    labelSpaceCount: 2,
                                    decorator: {
                                        rules: [
                                            {required: true, message: '请输入入住日期'},
                                        ],
                                    },
                                },
                                {
                                    type: 'date',
                                    field: 'leaveDate',
                                    label: '离店',
                                    labelSpaceCount: 2,
                                    decorator: {
                                        rules: [
                                            {required: true, message: '请输入离店日期'},
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        label: <a href="https://www.baidu.com">百度</a>,
                        isMore: true,
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    componentWillMount() {

    }

    componentDidMount() {
        console.log(this.props);
    }

    handleSearch = (params = {}) => {
        params = {...this.state.params, ...params};
        this.setState({params});

        this.props.action.user.fetchUser({params, onResolve: () => console.log('成功')});
    };

    render() {
        const {
            loading,
            total,
            users,
        } = this.props;
        const {pageNum} = this.state.params;

        return (
            <PageContent>
                <ListPage
                    loading={loading}
                    toolItems={this.toolItems}
                    queryItems={this.queryItems}
                    showCollapsed={true}
                    total={total}
                    pageNum={pageNum}
                    defaultPageSize={10}
                    tableProps={{
                        columns: this.columns,
                        dataSource: users,
                    }}
                    onSearch={this.handleSearch}
                    onPageNumChange={pn => this.handleSearch({pageNum: pn})}
                />
                <FixBottom
                    style={{textAlign: 'right'}}
                >
                    <Button type="danger" style={{marginRight: 8}}>批量删除</Button>
                    <Button type="primary">导出</Button>
                </FixBottom>
            </PageContent>
        );
    }
}
