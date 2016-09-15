
import React from 'react';
var NavLayout = require("./NavLayout");

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Etusivu</h1>
                <NavLayout />
            </div>
        )
    }
}


module.exports = App;