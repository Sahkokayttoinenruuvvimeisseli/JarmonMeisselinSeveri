
import React from 'react';
var Button = require('react-bootstrap').Button;

class TagChooser extends React.Component {
    //constructor(props) {
    //    super(props);
    //}

    handleClick() {
        this.props.onExpandCLick();
    }

    render() {

        var contentStyles = {
            border: "solid 1px black"
        };
        if (this.props.expanded) {
            contentStyles.height = "500px";
        } else {
            contentStyles.display = "none";
        }
        return (
            <div>
                <Button onClick={this.handleClick.bind(this)}>Nappi</Button>
                <div style={contentStyles} ref="tagItems">
                    <TagItem/>
                </div>
            </div>            
        )
    }
}

class TagItem extends React.Component {
    constructor(props) {
        super(props);



    }

    render() {
        return (
            <div>
                tag: 1000
            </div>
        )
    }
}

module.exports = TagChooser;