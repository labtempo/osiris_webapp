import React, { Component } from 'react';


class Icon extends Component {

    constructor(props) {
        super(props);
        this.state = { icon: `fa ${props.icon} ${props.height}` };
    }

    render() {
        return <i className={ this.state.icon } onClick={ this.props.onClick }></i>;
    }

}

export default Icon;