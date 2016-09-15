import React from 'react';
var NavLayout = require("./NavLayout");

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
                ToolUses {  } \
            }' 
        }, function (data) {

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

            </Link>
        )
    }
}

module.exports = ToolUses;