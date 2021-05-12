import React  from 'react';
import './app.css';
import Home from './components/Home';
import Form from './components/Client-Portal/Form.js';
import Dashboard from './components/Admin-Hub/Dashboard';

import {Route} from "react-router-dom";
import Register from './components/Admin-Hub/Register';
import Manage from './components/Admin-Hub/Manage';



function App() {
         
  return (
    <>
    <Route exact path="/" component={Home} />
    <Route exact path="/Form" component={Form} />
    <Route exact path="/Dashboard" component={Dashboard} />
    <Route exact path="/Register" component={Register} />
    <Route exact path="/Manage" component={Manage} />
    </>
  );
}

export default App;
