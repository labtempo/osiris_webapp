import React, { Component } from 'react';
import UserOptions from './UserOptions';
import Icon from './../utils/Icon';


class User extends Component {

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="">
                    <a className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        { this.props.user.name } <Icon icon="fa-angle-down" />
                    </a>
                    <UserOptions />
                </li>
            </ul>
        );
    }

}

export default User;