import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import Loading from './../utils/Loading';
import { browserHistory, Link } from 'react-router';


class DataTypeList extends Component {

    constructor() {
        super();
        this.state = {
            sensors: [],
            reading: false,
            message: ''
        };
        this._deleteItem = this._deleteItem.bind( this );
        this._editItem = this._editItem.bind( this );
        this._action = '';
    }

    componentDidMount() {
        this._action = this.props.location.search.replace('?action=', '');
        this.setState({ reading: true });
        ApiStore.get('virtualsensornet/datatypes')
            .then(sensors => this.setState({
                sensors,
                reading: false
            }))
            .catch(error => this.setState({
                reading: false
            }));
        this._showMessage();
    }

    _showMessage() {
        let message;
        if ( !this._action ) return;
        switch ( this._action ) {
            case 'insert': message = 'DataType incluído com sucesso'; break;
            case 'edit': message = 'DataType editado com sucesso'; break;
            case 'remove': message = 'DataType removido com sucesso'; break;
        }
        this._action = '';
        this.setState({
            message
        });
    }

    _deleteItem(sensor) {
        if (confirm(`Tem certeza que deseja remover o DataType com id ${ sensor.id } ?`)) {
            ApiStore.delete(`virtualsensornet/datatypes\\${ sensor.id }`)
                .then(() => {
                    this._action = 'remove';
                    this._showMessage();
                    this.componentDidMount()
                });
        }
    }

    _editItem(sensor) {
        browserHistory.push(`datatypeform?id=${ sensor.id }`);
    }

    render() {
        return (
            <section className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Lista de DataType <Loading show={ this.state.reading } /></h2>
                            <div className="clearfix"></div>
                        </div>
                        { 
                        this.state.message && <div className="alert alert-success alert-dismissible fade in" role="alert">
                            <strong>{ this.state.message }</strong>
                        </div>
                        }
                        { this.state.sensors.length > 0 &&
                            <div className="x_content">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Unit</th>
                                            <th>Symbol</th>
                                            <th>Used By</th>
                                            <th>Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.sensors.map(sensor => {
                                                return <tr key={ sensor.id }>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.id }</td>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.name }</td>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.type }</td>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.unit }</td>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.symbol }</td>
                                                    <td onClick={ () => this._editItem( sensor ) }>{ sensor.usedBy }</td>
                                                    <td className="align-center">
                                                        <i className="fa fa-trash-o" onClick={ () => this._deleteItem(sensor) } />
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        { this.state.sensors.length === 0 && !this.state.reading &&
                            <div className="alert alert-info alert-dismissible fade in" role="alert">
                                <strong>Não existem DataTypes cadastrados no momento</strong>
                            </div> 
                        }
                        <Link to="/datatypeform" className="btn btn-primary">Adicionar DataType</Link>
                    </div>
                </div>
            </section>
        )
    }

}

export default DataTypeList;
