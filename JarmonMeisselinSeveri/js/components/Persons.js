
import React from 'react';
//import Button from "react-bootstrap";
var Button = require('react-bootstrap').Button;
var Table = require('react-bootstrap').Table;
var Link = require('react-router').Link;
var FormControl = require('react-bootstrap').FormControl;

class Persons extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            Persons: []
        }
        $.post("./api", {
            query: '{ \
            Persons { Id Firstname Lastname Tag } \
            }'
        },
            function (data) {
                if (data.data.Persons) {
                    console.log(data.data.Persons);
                    that.setState({
                        Persons: data.data.Persons
                    });
                }
            });
    }

    findPersons() {
        $.post("./api", {
            query: '{ \
            Persons { Firstname Lastname Tag } \
            }'
        },
        function (data) {
            if (data.data.Persons) {
                console.log("loytyi");
                this.state = {
                    Persons: data.data.Persons
                }
            }
        });
    }

    personSelected(id) {
        console.log(id);
        this.setState({
            selectedPersonId: id
        });
    }

    render() {
        
        var rows = [];
        rows.push(<h1 key={5}>moi</h1>);
        
        return (
            <div>
                <h4>Henkilöt</h4>
                <PersonList selectedPersonId={this.state.selectedPersonId} Persons={this.state.Persons} onPersonSelected={this.personSelected.bind(this)}/>
                <Link to={"/person"}><Button>Luo uusi henkilö</Button></Link>
            </div>
        )
    }
}

class PersonList extends React.Component {
    handlePersonChange() {
        console.log(this);
        this.action(this.person.Id);
    }

    render() {
        var that = this;
        var rows = [];

        var tableStyle = {
            width: "50%",
            maxHeight: "500px",
            owerflow: "auto"
        };

        this.props.Persons.forEach(function (person) {
            var rowStyles = {};
            if (person.Id === that.props.selectedPersonId) {
                rowStyles.backgroundColor = "#dfdfdf";
            } else {
                rowStyles.backgroundColor = "#FFFFFF";
            }

            rows.push(<PersonListItem key={person.Id} Person={person} />);
        });
        console.log(rows);
        return (
            <div>
                {rows}
            </div>
        )
    }
}

class PersonListItem extends React.Component {

    render() {
        var link = "/Person/" + this.props.Person.Id;
        return (
            <Link to={link}>
                <div style={{ border: "solid 1px black" }}>
                    <h4>Etunimi: {this.props.Person.Firstname}</h4>
                    <h4>Sukunimi: {this.props.Person.Lastname}</h4>
                </div>
            </Link>
        )
    }
}


module.exports = Persons;