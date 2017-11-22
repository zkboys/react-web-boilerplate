import React, {Component} from 'react';
import {Button} from 'antd';
import PageContent from '../../../../layouts/page-content';
import {ajax} from '../../../../commons/axios';

export const PAGE_ROUTE = '/dashboard/analysis';

@ajax()
export default class index extends Component {
    state = {};

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                <Button
                    onClick={() => {
                        this.props.$ajax.get('/test-ajax', null, {successTip: '获取成功！'})
                            .then(res => {
                                console.log(res);
                            });
                    }}
                >发请求 proxy 请求</Button>

                <Button
                    onClick={() => {
                        this.props.$ajax.put('/mock/test-ajax/array', null, {successTip: '获取成功！'})
                            .then(res => {
                                console.log(res);
                            });
                    }}
                >发请求 mock 请求</Button>
            </PageContent>
        );
    }
}
