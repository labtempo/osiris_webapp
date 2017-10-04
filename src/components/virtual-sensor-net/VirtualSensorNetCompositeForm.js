import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import { browserHistory } from 'react-router';


class VirtualSensorNetCompositeForm extends Component {

    constructor() {
        super();
        this.state = {
            sensor: {},
            loading: true,
            links: []
        };
        this._submitForm = this._submitForm.bind( this );
        this._goBack = this._goBack.bind( this );
        this._selectOptionOnMultiSelect = this._selectOptionOnMultiSelect.bind( this );
    }

    componentDidMount() {
        this.setState({ loading: true });
        this._getCollections();
        if ( !this.props.location || !this.props.location.search ) {
            this.setState({ title: 'Incluir VirtualSensorNet Composite', loading: false });
            return;
        }
        let id = this.props.location.search.replace('?id=', '');
        if ( !id ) return;
        this.setState({ title: 'Editar VirtualSensorNet Composite' });
        ApiStore.get(`virtualsensornet/composites/${ id }`).then(sensor => this.setState({
            id: sensor.id,
            fields: this._parserFields( sensor.fields ),
            loading: false
        }));
    }

    _parserFields(fields) {
        let fieldsArray = fields.map(field => field.id);
        return this.state.links.filter(dt => {
            return fieldsArray.includes( dt.id );
        });
    }

    _getCollections() {
        ApiStore.get('virtualsensornet/links').then(links => {
            let newFields = [];
            links.forEach(link => {
                link.fields.forEach(field => {
                    newFields.push({
                        id: field.id,
                        name: field.name,
                        label: link.label
                    })
                })
            })
            this.setState({
                links: newFields
            });
        });
    }

    _goBack(action) {
        action ? browserHistory.push(`virtualsensornetcomposite?action=${ action }`) : 
                 browserHistory.push('virtualsensornetcomposite');
    }

    _submitForm(event) {
        event.preventDefault();
        let fieldIds = this.state.fields.map(field => field.id);
        const body = JSON.stringify({
            fieldIds
        });
        let promise;
        let action;
        if ( this.state.id ) {
            promise = ApiStore.put(`virtualsensornet/composites/${ this.state.id }`, body);
            action = 'edit';
        } else {
            promise = ApiStore.post('virtualsensornet/composites', body);
            action = 'insert';
        }
        promise
            .then( () => this._goBack( action ) )
            .catch( () => this._goBack( action ) );
    }

    _onChangeMultiSelect(input) {
        let options = [];
        for (let i = 0; i < input.target.options.length; i++) {
            if (!input.target.options[ i ].selected) continue;
            options.push(this.state.links.find(option => option.id === Number(input.target.options[ i ].value )));
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

                                { /* DataTypes Links */ }
                                <div className="item form-group">
                                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Sensors">Sensors <span className="required">*</span></label>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <select name="fields" onChange={ input => this._onChangeMultiSelect(input) } className="form-control col-md-7 col-xs-12" required multiple>
                                            {
                                                this.state.links.map(link => {
                                                    return <option key={ link.id } value={ link.id } selected={ this._selectOptionOnMultiSelect( link ) }>
                                                        { link.id } - { link.label } - { link.name }
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

export default VirtualSensorNetCompositeForm;




















// import React, { Component } from 'react';
// import Form from './../form/Form';
// import MultiSelect from './../form/MultiSelect';
// // import ApiStore from './../../store/ApiStore';


// class VirtualSensorNetCompositeForm extends Component {

//     constructor() {
//         super();
//         this._inputs = {};
//         this.onSubmitForm = this.onSubmitForm.bind(this);
//     }

//     onSubmitForm() {
//         // const body = JSON.stringify({
//         //     name: this._inputs.name,
//         //     type: this._inputs.type.id,
//         //     unit: this._inputs.unit,
//         //     symbol: this._inputs.symbol
//         // });
//         // ApiStore.post('virtualsensornet/datatypes', body);
//     }

//     render() {
//         return (
//             <Form title="Incluir VirtualSensorNet Composite" onSubmit={ this.onSubmitForm }>
//                 <MultiSelect name="datatypesids" title="Composição de" value={ this._inputs } listEndpoint="virtualsensornet/links" showValue={ this.showValue } />
//             </Form>
//         );
//     }

// }

// export default VirtualSensorNetCompositeForm;
