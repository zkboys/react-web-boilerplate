import React from 'react'
import PropTypes from 'prop-types';

class Bundle extends React.Component {
    static propTypes = {
        load: PropTypes.func.isRequired,
    };
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    };

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load().then((mod) => {
            this.setState({mod});
        });
    }

    render() {
        return this.props.children(this.state.mod)
    }
}

export default Bundle
