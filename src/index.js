import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Login from './components/login/Login';
import Base from './components/base-layout/Base';
import MainMenu from './components/main-menu/MainMenu';
import DataTypeList from './components/datatype/DataTypeList';
import DataTypeForm from './components/datatype/DataTypeForm';
import SensorNetList from './components/sensor-net/SensorNetList';
import VirtualSensorNetLinkList from './components/virtual-sensor-net/VirtualSensorNetLinkList';
import VirtualSensorNetLinkForm from './components/virtual-sensor-net/VirtualSensorNetLinkForm';
import VirtualSensorNetCompositeList from './components/virtual-sensor-net/VirtualSensorNetCompositeList';
import VirtualSensorNetCompositeForm from './components/virtual-sensor-net/VirtualSensorNetCompositeForm';
import VirtualSensorNetBlendingList from './components/virtual-sensor-net/VirtualSensorNetBlendingList';
import VirtualSensorNetBlendingForm from './components/virtual-sensor-net/VirtualSensorNetBlendingForm';


const REACT_START_DIV = 'osiris';


ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/login" component={ Login } />
        <Route path="/" component={ Base }>
            <IndexRoute component={ MainMenu } />
            <Route path="/sensornet" component={ SensorNetList } />
            <Route path="/datatype" component={ DataTypeList } />
            <Route path="/datatypeform" component={ DataTypeForm } />
            <Route path="/virtualsensornetlink" component={ VirtualSensorNetLinkList } />
            <Route path="/virtualsensornetlinkform" component={ VirtualSensorNetLinkForm } />
            <Route path="/virtualsensornetcomposite" component={ VirtualSensorNetCompositeList } />
            <Route path="/virtualsensornetcompositeform" component={ VirtualSensorNetCompositeForm } />
            <Route path="/virtualsensornetblending" component={ VirtualSensorNetBlendingList } />
            <Route path="/virtualsensornetblendingform" component={ VirtualSensorNetBlendingForm } />
        </Route>
    </Router>,
    document.getElementById(REACT_START_DIV)
);
