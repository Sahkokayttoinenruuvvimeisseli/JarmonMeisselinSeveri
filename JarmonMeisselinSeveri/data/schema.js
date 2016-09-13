import {
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList
} from 'graphql';

//import {
//    Person,
//    Tool,
//    ToolUsed
//} from "dbSchema";

var dbSchema = require("./dbSchema");


var Person = new GraphQLObjectType({
    name: 'Person',
    fields: {
        Id: {
            type: GraphQLInt
        },
        Firstname: {
            type: GraphQLString
        },
        Lastname: {
            type: GraphQLString
        },
        Tag: {
            type: GraphQLString
        }
    }
});

var Tool = new GraphQLObjectType({
    name: "Tool",
    fields: {
        Name: {
            type: GraphQLString
        },
        Tag: {
            type: GraphQLString
        }
    }
});

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        CreatePerson: {
            type: Person,
            args: {
                Firstname: {
                    type: GraphQLString
                },
                Lastname: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    dbSchema.Person.create({
                        Firstname: args.Firstname,
                        Lastname: args.Lastname
                    }).then(function (person) {
                        console.log("aas");
                        resolve(person);
                    });
                });
            }

        },
        RemovePerson: {
            type: GraphQLString,
            args: {
                Id: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    dbSchema.Person.destroy({
                        where: {
                            Id: args.Id
                        },
                    }).then(function () {
                        resolve(args.Id);
                    });
                });
            }
        },
        EditPerson: {
            type: Person,
            args: {
                Personid: {
                    type: GraphQLInt 
                },
                Firstname: {
                    type: GraphQLString
                },
                Lastname: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    if (args.Personid) {
                        dbSchema.Person.findById(args.Personid).then(function (person) {
                            if (args.Firstname) person.Firstname = args.Firstname;
                            if (args.Lastname) person.Lastname = args.Lastname;
                            person.save().then(function (person2) {
                                resolve(person2);
                            });
                        });
                    }
                });
            }
        },
        Persons: {
            type: new GraphQLList(Person),
            args: {
                Personid: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    if (args.Personid) {
                        dbSchema.Person.findAll({
                            where: {
                                Id: args.Personid
                            }
                        }).then(function (persons) {
                            resolve(persons);
                        });
                    } else {
                        dbSchema.Person.findAll({

                        }).then(function (persons) {
                            resolve(persons);
                        });
                    }
                });
            }
        }
    })
});


export const schema = new GraphQLSchema({
    query: queryType
});