import React, { Component } from 'react';

class Loading extends Component {

    render() {
        return this.props.show && <small>Lendo os dados...</small>;
    }

}

export default Loading;