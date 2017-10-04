import React, { Component } from 'react';
import ApiStore from './../../store/ApiStore';
import Loading from './../utils/Loading';


class SensorNetList extends Component {

    constructor() {
        super();
        this.state = {
            sensors: [],
            reading: false
        };
    }

    componentDidMount() {
        this.setState({ reading: true });
        ApiStore.get('sensornet/sensors')
            .then(sensors => this.setState({
                sensors,
                reading: false
            }))
            .catch(error => this.setState({
                reading: false
            }));
    }

    render() {
        return (
            <section className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Lista de SensorNet <Loading show={ this.state.reading } /></h2>
                            <div className="clearfix"></div>
                        </div>
                        { this.state.sensors.length > 0 &&
                            <div className="x_content">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Acquisition</th>
                                            <th>Capture</th>
                                            <th>Collector</th>
                                            <th>Network</th>
                                            <th>Storage</th>
                                            <th>State</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.sensors.map(sensor => {
                                                return <tr key={ sensor.id }>
                                                    <td>{ sensor.id }</td>
                                                    <td>{ sensor.acquisitionTimestampInMillis }</td>
                                                    <td>{ sensor.capturePrecisionInNano }</td>
                                                    <td>{ sensor.collectorId }</td>
                                                    <td>{ sensor.networkId }</td>
                                                    <td>{ sensor.storageTimestampInMillis }</td>
                                                    <td>{ sensor.state }</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                        { this.state.sensors.length === 0 && !this.state.reading &&
                            <div className="alert alert-info alert-dismissible fade in" role="alert">
                                <strong>Não existem SensorNet cadastrados no momento</strong>
                            </div> 
                        }
                    </div>
                </div>
            </section>
        )
    }

}

export default SensorNetList;

