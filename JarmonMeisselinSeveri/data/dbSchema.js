
var Sequelize = require('sequelize');

var sequelize = new Sequelize('jarmonmeisseli', 'jaska', 'asdf321', {
    host: 'localhost',
    omitNull: true
});

var Person = sequelize.define("Person", {
    Id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Lastname: {
        type: Sequelize.STRING
    },
    Tag: {
        type: Sequelize.STRING
    }
});


var Tool = sequelize.define("Tool", {
    Id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING
    }
});

var ToolUsed = sequelize.define("TooUsed", {
    Id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Person_id: {
        type: Sequelize.BIGINT
    },
    Tool_id: {
        type: Sequelize.BIGINT
    }
});

sequelize.sync({ force: false }).then(function () {
    //return Song.create({});
}).then(function (jane) {

    });

module.exports.Person = Person;
module.exports.Tool = Tool;
module.exports.ToolUsed = ToolUsed;