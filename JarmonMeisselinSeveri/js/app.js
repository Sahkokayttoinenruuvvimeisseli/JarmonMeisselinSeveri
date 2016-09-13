
var React = require('react');
//var ReactDOM = require('react-dom');

import ReactDOM from 'react-dom';
var App = require('./components/app.js');
var Persons = require("./components/Persons.js");
var Person = require("./components/Person.js");
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
    </Router>,
    document.getElementById('root')
);

