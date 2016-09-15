
var React = require('react');
//var ReactDOM = require('react-dom');

import ReactDOM from 'react-dom';
var App = require('./components/app.js');
var Tools = require("./components/Tools.js");
var Tool = require("./components/Tool.js");
var Persons = require("./components/Persons.js");
var Person = require("./components/Person.js");
var ToolUses = require("./components/ToolUses.js");
//import App from "./components/app.js";

//import Router from "react-router";
//import Route from "react-router";
//import hashHistory from "react-router";

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;

var abb = React.createClass({
    render() {
        return (
            <h1>makkaraa</h1>
        )
    }
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/Persons" component={Persons}/>
        <Route path="/Person" history={hashHistory} component={Person}/>
        <Route path="/Person/:personid" history={hashHistory} component={Person}/>
        <Route path="/Tooluses" history={hashHistory} component={ToolUses} />
        <Route path="/Tools" component={Tools} />
        <Route path="/Tool" component={Tool}/>
        <Route path="/Tool/:toolid" component={Tool} />
    </Router>,
    document.getElementById('root')
);

