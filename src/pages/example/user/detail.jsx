import React, {Component} from 'react';

export const PAGE_ROUTE = '/users/detail/:id';

export default class detail extends Component {
    state = {};

    componentWillMount() {
        console.log(this.props);
        console.log(this.props.match.params);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>init</div>
        );
    }
}
