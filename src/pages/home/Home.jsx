import React, {Component} from 'react'
import './style.less'

export default class Home extends Component {
    componentWillMount() {
        // home 直接跳转
        this.props.history.replace('/dashboard/analysis');
    }

    render() {
        return (
            <div>Home</div>
        );
    }
}
