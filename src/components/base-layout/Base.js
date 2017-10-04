import React, { Component } from 'react';
import Navbar from './../navbar/Navbar';
import Header from './../header/Header';
import Footer from './../footer/Footer';
import './../../css/style.css';


class Base extends Component {

    constructor() {
        super();
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        this.setState({
            user: {
                name: 'Felippe Maurício'                
            }
        })
    }

    render() {
        return (
            <section className="nav-md">
                <div className="container body">
                    <div className="main_container">
                        <Navbar />
                        <Header user={ this.state.user } />
                        <div className="right_col">
                            { this.props.children }
                            {/* <Footer /> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default Base;
