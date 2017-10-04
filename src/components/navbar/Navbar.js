import React, { Component } from 'react';
import Settings from './../../settings/Settings';
import NavbarOption from './NavbarOption';
import { Link } from 'react-router';


class Navbar extends Component {

    constructor() {
        super();
        this.state = { 
            options: this._getOptionsMenu() 
        };
    }

    _getOptionsMenu() {
        return [
            {
                name: 'SensorNet',
                icon: 'fa-thermometer-empty',
                to: '/sensornet'
            },
            {
                name: 'DataType',
                icon: 'fa-jsfiddle',
                to: '/datatype'
            }, 
            {
                name: 'Virtual SensorNet Link',
                icon: 'fa-jsfiddle',
                to: '/virtualsensornetlink'
            },
            {
                name: 'Virtual SensorNet Composite',
                icon: 'fa-jsfiddle',
                to: '/virtualsensornetcomposite'
            },
            {
                name: 'Virtual SensorNet Blending',
                icon: 'fa-jsfiddle',
                to: '/virtualsensornetblending'
            },
        ]
    }

    render() {
        return (
            <section className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title">
                        <Link to="/" className="site_title">
                            <span> { Settings.NAME_SYSTEM }</span>
                        </Link>
                    </div>
                    <br />
                    <div className="clearfix"></div>
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <h3>Opções do Sistema</h3>
                            <ul className="nav side-menu">
                                { this.state.options.map(option => 
                                    <NavbarOption key={ option.name } option={ option } />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default Navbar;