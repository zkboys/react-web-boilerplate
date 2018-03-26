import React, {Component} from 'react';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/test4';


export default class Analysis extends Component {
    state = {
        name: '123',
        age: 25
    };

    componentWillMount() {
        this.setState({name: 'componentDidMount'});
        this.setState({name: 'componentDidMount0909090'});
        this.setState({age: 22});
    }

    componentDidMount() {

    }


    render() {
        console.log(123, this.state.name);
        return (
            <PageContent>
                <div>{this.state.name}</div>
                <div>{this.state.age}</div>
            </PageContent>
        );
    }
}
