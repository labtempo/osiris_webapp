import React, { Component } from 'react';
import Icon from './../utils/Icon';
import { Link } from 'react-router';


class NavbarOption extends Component {

    render() {
        return (
            <li>
                <Link to={ this.props.option.to }>
                    <Icon icon={ this.props.option.icon } />
                    { this.props.option.name }
                </Link>
            </li>
        );
    }

}

export default NavbarOption;