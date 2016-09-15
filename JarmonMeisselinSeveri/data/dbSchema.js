
var Sequelize = require('sequelize');

var config = require('../config');

var sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPasswd, {
    host: config.dbHost,
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

ToolUsed.hasOne(Person, {
    foreignKey: 'Person_id',
    constraints: false
});

ToolUsed.hasOne(Tool, {
    foreignKey: 'Tool_id',
    constraints: false
});
    

sequelize.sync({ force: false }).then(function () {
    //return Song.create({});
}).then(function (jane) {

    });

module.exports.Person = Person;
module.exports.Tool = Tool;
module.exports.ToolUsed = ToolUsed;