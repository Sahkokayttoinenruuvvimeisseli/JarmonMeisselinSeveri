import React from 'react';
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var NavLayout = require("./NavLayout");

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tools: []
        }
        this.findTools();
    }

    findTools() {
        var that = this;
        $.post("./api", {
            query: '{ \
                Tools { Id Name } \
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
                <h4>Työkalu</h4>
                <NavLayout />
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

        this.props.Tools.forEach(function (tool) {
            rows.push(<ToolListItem Tool={tool} />);
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
        var link = "/Tool/" + this.props.Tool.Id;
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