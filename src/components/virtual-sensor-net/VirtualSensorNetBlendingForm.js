import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import { browserHistory } from 'react-router';


class VirtualSensorNetBlendingForm extends Component {

    constructor() {
        super();
        this.state = {
            sensor: {},
            loading: true,
            datatypes: [],
            functions: []
        };
        this._submitForm = this._submitForm.bind( this );
        this._onChangeInput = this._onChangeInput.bind( this );
        this._goBack = this._goBack.bind( this );
    }

    componentDidMount() {
        this.setState({ loading: true });
        this._getCollections();
        if ( !this.props.location || !this.props.location.search ) {
            this.setState({ title: 'Incluir VirtualSensorNet Blending', loading: false });
            return;
        }
        let id = this.props.location.search.replace('?id=', '');
        if ( !id ) return;
        this.setState({ title: 'Editar VirtualSensorNet Blending' });
        ApiStore.get(`virtualsensornet/blendings/${ id }`).then(sensor => this.setState({
            id: sensor.id,
            callIntervalInMillis: sensor.callIntervalInMillis,
            functionName: this._parserFunction( sensor.functionId ),
            dataTypeId: sensor.fields[ 0 ].dataTypeId,          
            loading: false
        }));
    }

    _parserFunction(fieldId) {
        let f = this.state.functions.find(functionObj => functionObj.id === fieldId);
        return f.name;
    }

    _getCollections() {
        ApiStore.get('virtualsensornet/datatypes')
            .then(datatypes => this.setState({
                datatypes
            }))
            .catch(() => this.setState({
                datatypes: [
                    {
                        "id": 1,
                        "name": "temperature",
                        "type": "NUMBER",
                        "unit": "celsius",
                        "symbol": "ºc",
                        "usedBy": 12
                    },
                    {
                        "id": 2,
                        "name": "Teste 27",
                        "type": "TEXT",
                        "unit": "v2",
                        "symbol": "v",
                        "usedBy": 3
                    },
                    {
                        "id": 4,
                        "name": "luminosity",
                        "type": "NUMBER",
                        "unit": "candela",
                        "symbol": "C",
                        "usedBy": 0
                    }
                ]
            }));
        ApiStore.get('virtualsensornet/functions')
            .then(functions => this.setState({
                functions
            }))
            .catch(() => this.setState({
                 functions: [
                    {
                        "name": "sum.temperature.celsius",
                        "description": "function that calculates the sum of temperature in celsius",
                        "address": "omcp://sum.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "sum",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 1
                    },
                    {
                        "name": "average.temperature.celsius",
                        "description": "function that calculates the average of temperature in celsius",
                        "address": "omcp://average.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "average",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 2
                    },
                    {
                        "name": "min.temperature.celsius",
                        "description": "function that calculates the min of temperature in celsius",
                        "address": "omcp://min.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "min",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 3
                    },
                    {
                        "name": "max.temperature.celsius",
                        "description": "function that calculates the max of temperature in celsius",
                        "address": "omcp://max.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "max",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 4
                    },
                    {
                        "name": "average.temperature.celsius",
                        "description": "function that calculates the average of temperature in celsius",
                        "address": "omcp://average.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "average",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 5
                    },
                    {
                        "name": "average.temperature.celsius",
                        "description": "function that calculates the average of temperature in celsius",
                        "address": "omcp://average.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "average",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 6
                    },
                    {
                        "name": "max.temperature.celsius",
                        "description": "function that calculates the max of temperature in celsius",
                        "address": "omcp://max.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "max",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 7
                    },
                    {
                        "name": "max.temperature.celsius",
                        "description": "function that calculates the max of temperature in celsius",
                        "address": "omcp://max.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "max",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 8
                    },
                    {
                        "name": "average.temperature.celsius",
                        "description": "function that calculates the average of temperature in celsius",
                        "address": "omcp://average.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "average",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 9
                    },
                    {
                        "name": "min.temperature.celsius",
                        "description": "function that calculates the min of temperature in celsius",
                        "address": "omcp://min.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "min",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 10
                    },
                    {
                        "name": "sum.temperature.celsius",
                        "description": "function that calculates the sum of temperature in celsius",
                        "address": "omcp://sum.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "sum",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 11
                    },
                    {
                        "name": "average.temperature.celsius",
                        "description": "function that calculates the average of temperature in celsius",
                        "address": "omcp://average.temperature.celsius.function/",
                        "operations": [
                            "SYNCHRONOUS"
                        ],
                        "requestParams": [
                            {
                                "name": "temperature",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": true
                            }
                        ],
                        "responseParams": [
                            {
                                "name": "average",
                                "type": "NUMBER",
                                "unit": "celsius",
                                "collection": false
                            }
                        ],
                        "id": 12
                    }
                ]
            }));
    }

    _goBack(action) {
        action ? browserHistory.push(`virtualsensornetblending?action=${ action }`) : 
                 browserHistory.push('virtualsensornetblending');
    }

    _submitForm(event) {
        event.preventDefault();
        const body = JSON.stringify({
            callIntervalInMillis: this.state.callIntervalInMillis,
            functionName: this.state.functionName,
            dataTypeId: this.state.dataTypeId
        });
        let promise;
        let action;
        if ( this.state.id ) {
            promise = ApiStore.put(`virtualsensornet/blendings/${ this.state.id }`, body);
            action = 'edit';
        } else {
            promise = ApiStore.post('virtualsensornet/blendings', body);
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
                                
                                { /* functionName */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Function">Function <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select onChange={ input => this._onChangeInput( input ) } name="functionName" value={ this.state.functionName } className="form-control col-md-7 col-xs-12" required>
                                            <option value="">Selecione um Function</option>
                                            {
                                                this.state.functions.map(functionObj => {
                                                    return <option key={ functionObj.id } value={ functionObj.name }>
                                                        { functionObj.id } - { functionObj.name }
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                { /* callIntervalInMillis */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Interval">Interval <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <input value={ this.state.callIntervalInMillis } onChange={ input => this._onChangeInput( input ) } className="form-control col-md-7 col-xs-12" name="callIntervalInMillis" placeholder="callIntervalInMillis" required type="number" />
                                    </div>
                                </div>

                                { /* datatypes */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Datatype">Datatype <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select onChange={ input => this._onChangeInput( input ) } name="dataTypeId" value={ this.state.dataTypeId } className="form-control col-md-7 col-xs-12" required>
                                            <option value="">Selecione um DataType</option>
                                            {
                                                this.state.datatypes.map(datatype => {
                                                    return <option key={ datatype.id } value={ datatype.id }>
                                                        { datatype.id } - { datatype.name }
                                                    </option>
                                                })
                                            }
                                        </select>
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

export default VirtualSensorNetBlendingForm;
