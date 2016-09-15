import React from 'react';

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
        $.post("./api",
            {
                query: '{ \
                    Tools (Toolid: ' + toolId + ') \
                    { Id Name } \
                }'
            }, function (data) {
                if (data.data.Tools) {
                    that.setState({
                        Name: data.data.Tools[0].Name,
                        Tag: data.data.Tools[0].Tag
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
                this.props.history.push('/tool/' + data.data.Tool.Id);
            }
        });
    }

    editTool(data) {
        var that = this;
        var queryParameters = "";
        var sendQuery = false;

        if (data.Toolid) {
            queryParameters += 'Toolid:' + data.Toolid;
        }
        if (data.Name) {
            queryParameters += 'Name:' + data.Name;
            sendQuery = true;
        }

        if (sendQuery && data.Toolid) {
            $.post("./api", {
                query: '{ \
                    Tool: EditTool (' + queryParameters + ') \
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
        this.setState({
            Name: event.target.value
        });
        this.forceUpdate();
        this.editTool({
            Personid: this.state.Toolid,
            Name: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input className="form-control" type="text" placeholder="Nimi" value={this.state.Name} onChange={this.changeName.bind(this) } />
            </div>
        )
    }
}

module.exports = Tool;