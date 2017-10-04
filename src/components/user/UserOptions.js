import React, { Component } from 'react';
import Icon from './../utils/Icon';

class UserOptions extends Component {

    render() {
        return (
            <ul className="dropdown-menu dropdown-usermenu pull-right">
                <li>
                    <a href="login.html">
                        <Icon icon="fa-sign-out pull-right" />
                        Log Out
                    </a>
                </li>
            </ul>
        );
    }

}

export default UserOptions;