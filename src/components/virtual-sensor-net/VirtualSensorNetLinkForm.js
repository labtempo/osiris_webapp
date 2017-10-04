import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import { browserHistory } from 'react-router';


class VirtualSensorNetLinkForm extends Component {

    constructor() {
        super();
        this.state = {
            sensor: {},
            loading: true,
            datatypes: [],
            sensornets: []
        };
        this._submitForm = this._submitForm.bind( this );
        this._onChangeInput = this._onChangeInput.bind( this );
        this._goBack = this._goBack.bind( this );
        this._selectOptionOnMultiSelect = this._selectOptionOnMultiSelect.bind( this );
    }

    componentDidMount() {
        this.setState({ loading: true });
        this._getCollections();
        if ( !this.props.location || !this.props.location.search ) {
            this.setState({ title: 'Incluir VirtualSensorNet Link', loading: false });
            return;
        }
        let id = this.props.location.search.replace('?id=', '');
        if ( !id ) return;
        this.setState({ title: 'Editar VirtualSensorNet Link' });
        ApiStore.get(`virtualsensornet/links/${ id }`).then(sensor => this.setState({
            id: sensor.id,
            label: sensor.label,
            sensorId: sensor.sensorId,
            fields: this._parserFields( sensor.fields ),          
            loading: false
        }));
    }

    _parserFields(fields) {
        let fieldsArray = fields.map(field => field.dataTypeId);
        return this.state.datatypes.filter(dt => {
            return fieldsArray.includes( dt.id );
        });
    }

    _getCollections() {
        ApiStore.get('virtualsensornet/datatypes').then(datatypes => this.setState({
            datatypes
        }));
        ApiStore.get('sensornet/sensors').then(sensornets => this.setState({
            sensornets
        }));
    }

    _goBack(action) {
        action ? browserHistory.push(`virtualsensornetlink?action=${ action }`) : 
                 browserHistory.push('virtualsensornetlink');
    }

    _submitForm(event) {
        event.preventDefault();
        let sensorSelected = this.state.sensornets.find(sensor => sensor.id === this.state.sensorId);
        let fields = this.state.fields.reduce((obj, dt) => {
            obj[dt.name] = dt.id;
            return obj;
        }, {});
        const body = JSON.stringify({
            label: this.state.label,
            sensorId: this.state.sensorId,
            collectorId: sensorSelected.collectorId,
            networkId: sensorSelected.networkId,
            fields
        });
        let promise;
        let action;
        if ( this.state.id ) {
            promise = ApiStore.put(`virtualsensornet/links/${ this.state.id }`, body);
            action = 'edit';
        } else {
            promise = ApiStore.post('virtualsensornet/links', body);
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

    _onChangeMultiSelect(input) {
        let options = [];
        for (let i = 0; i < input.target.options.length; i++) {
            if (!input.target.options[ i ].selected) continue;
            options.push(this.state.datatypes.find(option => option.id === Number(input.target.options[ i ].value )));
        }
        this.setState({
            [ input.target.name ]: options
        });
    }

    _selectOptionOnMultiSelect(option) {
        if ( !this.state.fields ) return false;
        let aux = this.state.fields.find(field => {
            return option.id === field.id
        });
        return !!aux;
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
                                
                                { /* Label */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Label">Label <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <input value={ this.state.label } onChange={ input => this._onChangeInput( input ) } className="form-control col-md-7 col-xs-12" name="label" placeholder="Label" required type="text" />
                                    </div>
                                </div>

                                { /* SensorNet */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="SensorNet">SensorNet <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select onChange={ input => this._onChangeInput( input ) } name="sensorId" value={ this.state.sensorId } className="form-control col-md-7 col-xs-12" required>
                                            <option value="">Selecione um SensorNet</option>
                                            {
                                                this.state.sensornets.map(sensornet => {
                                                    return <option key={ sensornet.id } value={ sensornet.id }>
                                                        { sensornet.id }
                                                    </option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                { /* DataTypes */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="DataTypes">DataTypes <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select name="fields" onChange={ input => this._onChangeMultiSelect(input) } className="form-control col-md-7 col-xs-12" required multiple>
                                            {
                                                this.state.datatypes.map(datatype => {
                                                    return <option key={ datatype.id } value={ datatype.id } selected={ this._selectOptionOnMultiSelect( datatype ) }>
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

export default VirtualSensorNetLinkForm;
