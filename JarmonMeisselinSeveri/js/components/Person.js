
import React from 'react';
var Button = require('react-bootstrap').Button;
var TagChooser = require('./TagChooser.js');

class Person extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            Personid: this.props.params.personid,
            Firstname: "",
            Lastname: "",
            tagChooserExpanded: false
        }
        if (this.state.Personid) {
            this.loadPerson(this.props.params.personid);

        } else {
            this.createNewPerson();
        }
    }
    handleSave() {
        this.props.history.push('/persons');
    }

    loadPerson(personId) {
        var that = this;
        $.post("./api",
            {
                query: '{ \
                    Person:Persons (Personid: ' + personId + ') { Firstname Lastname Tag } \
                }'
            }, function (data) {
                if (data.data.Person) {
                    that.setState({
                        Firstname: data.data.Person[0].Firstname,
                        Lastname: data.data.Person[0].Lastname
                    });
                }
            });
    }

    editPerson(Personid, Firstname, Lastname) {
        var that = this;
        var queryParameterns = "";
        var sendQuery = false;

        if (Personid) {
            queryParameterns += 'Personid:' + Personid;
            sendQuery = true;
        }
        if (Firstname) {
            queryParameterns += 'Firstname:"' + Firstname + '"';
            sendQuery = true;
        }
        if (Lastname) {
            queryParameterns += ' Lastname:"' + Lastname + '"';
            sendQuery = true;
        }


        if (sendQuery && Personid) {
            $.post("./api",
                {
                    query: '{ \
                    Person: EditPerson (' + queryParameterns + ') { Firstname Lastname } \
                }'
                }, function (data) {
                    if (data.data.Person) {
                        that.setState({
                            Firstname: data.data.Person.Firstname,
                            Lastname: data.data.Person.Lastname
                        });
                    }
                });
        }
    }

    createNewPerson() {
        var that = this;
        console.log(this);
        $.post("./api", {
            query: '{ \
            Person: CreatePerson { Id Firstname Lastname Tag } \
        }'
        },
            function (data) {
                if (data.data.Person) {
                    that.setState({
                        Personid: data.data.Person.Id
                    });
                    this.props.history.push('/person/' + data.data.Person.Id);
                }
            });
    }

    changeFirstName(event) {
        this.setState({
            Firstname: event.target.value
        });
        this.forceUpdate();
        this.editPerson(this.state.Personid, event.target.value, this.state.Lastname);
    }

    changeLastName(event) {
        this.setState({
            Lastname: event.target.value
        });
        this.forceUpdate();
        this.editPerson(this.state.Personid, this.state.Firstname, event.target.value);
    }

    removePerson() {
        var that = this;

        if (this.state.Personid) {
            $.post("./api", {
                query: '{ \
            RemovePerson(Id: ' + this.state.Personid + ') }'
            }, function (data) {
                
                });
            this.props.history.push('/persons');
        }
    }

    handleExpandClick() {
        if (this.state.tagChooserExpanded) {
            this.setState({
                tagChooserExpanded: false
            });
        } else {
            this.setState({
                tagChooserExpanded: true
            });
        }
    }

    render() {

        return (
            <div style={{width: "50%"}} >
                <input className="form-control" type="text" placeholder="Etunimi" value={this.state.Firstname} onChange={this.changeFirstName.bind(this) } /><br/>
                <input className="form-control" type="text" placeholder="Sukunimi" value={this.state.Lastname} onChange={this.changeLastName.bind(this) } /><br/>
                <TagChooser expanded={this.state.tagChooserExpanded} onExpandCLick={this.handleExpandClick.bind(this)}/>
                <Button style={{ width: "50%" }} onClick={this.handleSave.bind(this) }>Tallenna</Button>
                <Button style={{ width: "50%" }} onClick={this.removePerson.bind(this) }>Poista</Button>
            </div>
        )
    }
}

module.exports = Person;