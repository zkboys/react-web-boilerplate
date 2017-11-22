import React, {Component} from 'react';
import {Button} from 'antd';
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
            <div>
                <Button
                    onClick={() => {
                        this.props.$ajax.get('/test-ajax', null, {successTip: '获取成功！'})
                            .then(res => {
                                console.log(res);
                            });
                    }}
                >发请求</Button>
            </div>
        );
    }
}
