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
        Id: {
            type: GraphQLInt
        },
        Name: {
            type: GraphQLString
        }
    }
});

var ToolUse = new GraphQLObjectType({
    name: "ToolUse",
    fields: {
        Person: {
            type: Person,
            resolve: function (obj) {
                return new Promise(function (resolve, reject) {
                    dbSchema.Person.findById(obj.dataValues.Person_id).then(function (person) {
                        resolve(person);
                    });
                });
            }
        },
        Tool: {
            type: Tool,
            resolve: function (obj) {
                return new Promise(function (resolve, reject) {
                    dbSchema.Tool.findById(obj.dataValues.Tool_id).then(function (tool) {
                        resolve(tool);
                    });
                });
            }
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
                },
                Tag: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    if (args.Personid) {
                        dbSchema.Person.findById(args.Personid).then(function (person) {
                            if (args.Firstname) person.Firstname = args.Firstname;
                            if (args.Lastname) person.Lastname = args.Lastname;
                            if (args.Tag) person.Tag = args.Tag
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
        },
        Tools: {
            type: new GraphQLList(Tool),
            args: {
                Toolid: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    if (args.Toolid) {
                        dbSchema.Tool.findAll({
                            where: {
                                Id: args.Toolid
                            }
                        }).then(function (tools) {
                            resolve(tools);
                        });
                    } else {
                        dbSchema.Tool.findAll({
                        }).then(function (tools) {
                            resolve(tools);
                        });
                    }
                });
            }
        },
        CreateTool: {
            type: Tool,
            args: {
                Name: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    dbSchema.Tool.create({
                        Name: ""
                    }).then(function (tool) {
                        resolve(tool);
                    });
                });
            }
        },
        RemoveTool: {
            type: GraphQLString,
            args: {
                Toolid: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                if (args.Toolid) {
                    return new Promise(function (resolve, reject) {
                        dbSchema.Tool.destroy({
                            where: {
                                Id: args.Toolid
                            },
                        }).then(function () {
                            resolve(args.Id);
                        });
                    });
                }
            }
        },
        EditTool: {
            type: Tool,
            args: {
                Toolid: {
                    type: GraphQLInt
                },
                Name: {
                    type: GraphQLString
                },
                Tag: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    if (args.Toolid) {
                        dbSchema.Tool.findById(args.Toolid).then(function (tool) {
                            if (args.Name) tool.Name = args.Name;
                            if (args.Tag) tool.Tag = args.Tag;
                            tool.save().then(function (tool2) {
                                resolve(tool2);
                            });
                        });
                    }
                });
            }
        },
        ToolUses: {
            type: new GraphQLList(ToolUse),
            args: {
                Tooluseid: {
                    type: GraphQLInt
                }
            },
            resolve: function (_, args) {
                return new Promise(function (resolve, reject) {
                    dbSchema.ToolUsed.findAll({
                    }).then(function (toolUses) {
                        resolve(toolUses);
                    });
                });
            }
        },
        InsertToolUse: {
            type: GraphQLString,
            args: {
                toolId: {
                    type: GraphQLInt
                },
                personTag: {
                    type: GraphQLString
                }
            },
            resolve: function (_, args) {
                console.log("");
                return new Promise(function (resolve, reject) {
                    console.log("finding");
                    dbSchema.Tool.findAndCount({
                        where: {
                            Id: args.toolId
                        }
                    }).then(function (data) {
                        if (data.count > 0) {
                            dbSchema.Person.findAndCount({
                                where: {
                                    Tag: args.personTag
                                }
                            }).then(function (data2) {
                                if (data2.count > 0) {
                                    dbSchema.ToolUsed.create({
                                        Person_id:  data2.rows[0].Id,
                                        Tool_id: data.rows[0].Id
                                    }).then(function (tooluse) {
                                        resolve("onnistui");
                                    });
                                } else {
                                    console.log("Person not found");
                                }
                                });
                        } else {
                            console.log("Tool not found");
                        }
                    });
                });
            }
        }
    })
});


export const schema = new GraphQLSchema({
    query: queryType
});