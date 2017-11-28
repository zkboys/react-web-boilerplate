import React, {Component} from 'react';
import domEvent from 'zk-utils/lib/dom-event-hoc';
import {connect} from "../../models/index";
import './style.less';

@connect(state => ({...state.menu}))
@domEvent()
export default class IFrame extends Component {

    state = {
        height: 800,
    };

    componentDidMount() {
        this.setHeight();
        this.props.addEventListener(window, 'resize', this.setHeight)
    }

    setHeight = () => {
        const otherHeight = 64 + 62;
        const windowHeight = window.document.documentElement.clientHeight;
        this.setState({height: windowHeight - otherHeight});
    };

    render() {
        const {selectedMenu} = this.props;
        const url = selectedMenu && selectedMenu.url;
        const {height} = this.state;
        return (
            <div styleName="iframe" style={{fontSize: 0}}>
                <iframe
                    style={{height}}
                    title={url}
                    src={url}
                />
            </div>
        );
    }
}
