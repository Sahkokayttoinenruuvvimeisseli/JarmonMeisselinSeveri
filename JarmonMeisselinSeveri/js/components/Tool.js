import React from 'react';
var Button = require('react-bootstrap').Button;
var NavLayout = require("./NavLayout");

class Tool extends React.Component {
    constructor(props) {
        super(props);
        var that = this;
        this.state = {
            Toolid: this.props.params.toolid
        }
        if (this.state.Toolid) {
            this.loadTool(this.props.params.toolid);
        } else {
            this.createTool();
        }
    }

    loadTool(toolId) {
        var that = this;
        $.post("./api",
            {
                query: '{ \
                    Tools (Toolid: ' + toolId + ') \
                    { Id Name } \
                }'
            }, function (data) {
                if (data.data.Tools) {
                    that.setState({
                        Toolid: data.data.Tools[0].Id,
                        Name: data.data.Tools[0].Name,
                    });
                }
            });
    }

    createTool() {
        var that = this;
        $.post("./api", {
            query: '{ \
                Tool: CreateTool { Id Name } \
            }'
        }, function (data) {
            if (data.data.Tool) {
                that.setState({

                });
                that.props.history.push('/tool/' + data.data.Tool.Id);
                that.setState({
                    Tooldid: data.data.Tool.Id
                });
            }
        });
    }

    editTool(data) {
        console.log(data);
        var that = this;
        var queryParameters = "";
        var sendQuery = false;

        if (data.Toolid) {
            queryParameters += 'Toolid:' + data.Toolid;
        }
        if (data.Name) {
            queryParameters += ' Name:"' + data.Name + '"';
            sendQuery = true;
        }

        if (sendQuery && data.Toolid) {
            $.post("./api", {
                query: '{ \
                    Tool: EditTool (' + queryParameters + ') { Id Name } \
                }'
            }, function (data) {
                if (data.data.Tool) {
                    that.setState({
                        Name: data.data.Tool.Name,
                    });
                }
            });
        }
    }

    changeName(event) {
        console.log("changeName");
        this.setState({
            Name: event.target.value
        });
        this.forceUpdate();
        this.editTool({
            Toolid: this.state.Toolid,
            Name: event.target.value
        });
    }

    handleSave() {
        this.props.history.push("/tools");
    }

    removeTool() {
        var that = this;
        if (this.state.Toolid) {
            $.post("./api", {
                query: '{ \
                    RemoveTool(Toolid: ' + that.state.Toolid + ') }'
            }, function (data) {
                that.props.history.push("/tools");
            });
        }
    }

    render() {
        return (
            <div>
                <NavLayout />
                <input className="form-control" type="text" placeholder="Nimi" value={this.state.Name} onChange={this.changeName.bind(this) } />
                <Button style={{ width: "50%" }} onClick={this.handleSave.bind(this) }>Tallenna</Button>
                <Button style={{ width: "50%" }} onClick={this.removeTool.bind(this) }>Poista</Button>
            </div>
        )
    }
}

module.exports = Tool;