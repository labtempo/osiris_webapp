import React, { Component } from 'react';
import User from './../user/User';


class Header extends Component {

    render() {
        return (
            <section className="top_nav">
                <nav className="nav_menu">
                    <User user={ this.props.user } />
                </nav>
            </section>
        );
    }

}

export default Header;