import React, { Component } from 'react';
import Settings from './../../settings/Settings';


class Footer extends Component {

    render() {
        return (
            <footer className="main-footer">
                <div className="pull-right">
                    { Settings.NAME_SYSTEM } - Projeto final desenvolvido por { Settings.DEVELOPERS.map((developer, index) => (Settings.DEVELOPERS.length !== index + 1) ? developer + ' e ' : developer)}
                </div>
                <div className="clearfix"></div>
            </footer>
        );
    }

}

export default Footer;