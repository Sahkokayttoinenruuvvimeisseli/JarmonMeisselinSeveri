import React from 'react';
var NavLayout = require("./NavLayout");
var Link = require('react-router').Link;

class ToolUses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Tooluses: []
        };
        this.findToolUsees();
    }

    findToolUsees() {
        var that = this;
        $.post("./api", {
            query: '{ \
                ToolUses { \
                    Person { Id Firstname Lastname } \
                    Tool { Id Name } \
                 } \
            }' 
        }, function (res) {
            if (res.data.ToolUses) {
                console.log(res.data.ToolUses);
                that.setState({
                    Tooluses: res.data.ToolUses
                });
            }
        });

    }

    render() {
        return (
            <div>
                <h4>Leimaukset</h4>
                <NavLayout />
                <ToolUseList Tooluses={this.state.Tooluses} />
            </div>
        )
    }
}

class ToolUseList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];

        this.props.Tooluses.forEach(function (toolUse) {
            rows.push(<ToolUseListItem Tooluse={toolUse} />);
        });

        return (
            <div>
                {rows}
            </div>
        )
    }
}

class ToolUseListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var link = "/Tooluse/" + this.props.Tooluse.Id;
        return (
            <Link to={link}>
                <div>Etunimi: {this.props.Tooluse.Person.Firstname}</div>
                <div>Sukunimi: {this.props.Tooluse.Person.Lastname}</div>
                <div>Tyokalunnimi: {this.props.Tooluse.Tool.Name}</div>
            </Link>
        )
    }
}

module.exports = ToolUses;