import React from 'react';
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tools: []
        }
        this.findTools();
    }

    findTools() {
        $.post("./api", {
            query: '{ \
                Tools { Id Name Tag } \
            }'
        }, function (data) {
            if (data.data.Tools) {
                that.setState({
                    Tools: data.data.Tools
                });
            }
        });
    }

    render() {

        return (
            <div>
                <ToolList Tools={this.state.Tools} />
                <Link to={"/Tool"}>
                    <Button>Luo uusi työkalu</Button>
                </Link>
            </div>
        )
    }
}

class ToolList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];

        this.props.Tools.forEach(function (person) {
            rows.push(<ToolsListItem Person={person} />);
        });
        return (
            <div>
                {rows}
            </div>
        )
    }
}

class ToolListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var link = "/Tools/" + this.props.Tool.Id;
        return (
            <Link to={link} >
                <div>
                    Nimi: {this.props.Tool.Name}
                </div>
            </Link>
        )
    }
}

module.exports = Tools;