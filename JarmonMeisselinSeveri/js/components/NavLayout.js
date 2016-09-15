import React from 'react';
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

class NavLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Nav bsStyle="tabs">
                <NavItem href="#/Persons">Henkilöt</NavItem>
                <NavItem href="#/Tools">Työkalut</NavItem>
                <NavItem href="#/ToolUses">Leimaukset</NavItem>
            </Nav>
        )
    }
}

module.exports = NavLayout;


