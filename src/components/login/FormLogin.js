import React, { Component } from 'react';
import CreateAccount from './CreateAccount';


class FormLogin extends Component {

    constructor() {
        super();
        this._onSubmitForm = this._onSubmitForm.bind(this);
        this._inputs = {};
    }

    _onSubmitForm(event) {
        event.preventDefault();
    }

    _onInputChange(input) {
        this._inputs[ input.name ] = input;
    }

    render() {
        return (
            <form className="login-form" onSubmit={ this._onSubmitForm }>
                <input type="text" name="username" placeholder="Usuário" ref={ input => this._onInputChange(input) } />
                <input type="password" name="password" placeholder="Senha" ref={ input => this._onInputChange(input) } />
                <button>Login</button>
                { this.props.createAccount &&
                    <CreateAccount />
                }
            </form>
        );
    }

}

export default FormLogin;
