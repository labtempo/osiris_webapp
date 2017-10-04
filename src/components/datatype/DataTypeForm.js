import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import { browserHistory } from 'react-router';


class DataTypeForm extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            loading: false,
        };
        this._submitForm = this._submitForm.bind( this );
        this._getOptions = this._getOptions.bind( this );
        this._onChangeInput = this._onChangeInput.bind( this );
        this._goBack = this._goBack.bind( this );
        this._inputs = {};
    }

    componentDidMount() {
        if ( !this.props.location || !this.props.location.search ) {
            this.setState({ title: 'Incluir DataType' });
            return;
        }
        let id = this.props.location.search.replace('?id=', '');
        if ( !id ) return;
        this.setState({ 
            loading: true,
            title: 'Editar DataType',
        });
        ApiStore.get(`virtualsensornet/datatypes/${ id }`).then(sensor => this.setState({
            id: sensor.id,
            name: sensor.name,
            type: sensor.type,
            unit: sensor.unit,
            symbol: sensor.symbol,            
            loading: false
        }));
    }

    _goBack(action) {
        action ? browserHistory.push(`datatype?action=${ action }`) : 
                 browserHistory.push('datatype');
    }

    _getOptions() {
        return [
            { id: 'NUMBER' },
            { id: 'TEXT' },
            { id: 'LOGIC' },
        ];
    }

    _submitForm(event) {
        event.preventDefault();
        const body = JSON.stringify({
            name: this.state.name,
            type: this.state.type,
            unit: this.state.unit,
            symbol: this.state.symbol
        });
        let promise;
        let action;
        if ( this.state.id ) {
            promise = ApiStore.put(`virtualsensornet/datatypes/${ this.state.id }`, body);
            action = 'edit';
        } else {
            promise = ApiStore.post('virtualsensornet/datatypes', body);
            action = 'insert';
        }
        promise
            .then( () => this._goBack( action ) )
            .catch( () => this._goBack( action ) );
    }

    _onChangeInput(input) {
        this.setState({
            [ input.target.name ]: input.target.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>{ this.state.title }</h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <form className="form-horizontal form-label-left" onSubmit={ this._submitForm }>
                                
                                { /* Name */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Name">Name <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <input value={ this.state.name } onChange={ input => this._onChangeInput( input ) } className="form-control col-md-7 col-xs-12" name="name" placeholder="Name" required type="text" />
                                    </div>
                                </div>

                                { /* Type */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Type">Type <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select onChange={ input => this._onChangeInput( input ) } name="type" value={ this.state.type } className="form-control col-md-7 col-xs-12" required>
                                            <option value="">Selecione um Type</option>
                                            {
                                                this._getOptions().map(option => {
                                                    return <option key={ option.id } value={ option.id }>
                                                        { option.id }
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                { /* Unit */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Unit">Unit <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <input value={ this.state.unit } onChange={ input => this._onChangeInput( input ) } className="form-control col-md-7 col-xs-12" name="unit" placeholder="Unit" required type="text" />
                                    </div>
                                </div>

                                { /* Symbol */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Symbol">Symbol <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <input value={ this.state.symbol } onChange={ input => this._onChangeInput( input ) } className="form-control col-md-7 col-xs-12" name="symbol" placeholder="Symbol" required type="text" />
                                    </div>
                                </div>

                                <div className="ln_solid"></div>
                                <div className="form-group">
                                    <div className="col-md-6 col-md-offset-3">
                                        <a className="btn btn-primary" onClick={ () => this._goBack() }>Cancelar</a>
                                        <button className="btn btn-success">Salvar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default DataTypeForm;
