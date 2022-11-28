const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphqlID, GraphQLNonNull ,GraphQLList, GraphQLSchema } = graphql
const { Client } = require('pg')
const { CREATE_USER }  = require('../Mutations/employee')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Rakesh',
    port: 5432,
  })
  client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });



const EmployeeType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      location: { type: GraphQLString },
    }),
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        employee: {
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args) {
                const res = await client.query('SELECT * FROM employee')
                // console.log(res.rows)
                return (res.rows)
            }
        }
    }
})
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        
        addEmployee: {
            type: EmployeeType,
            args: {
                firstname: { type: GraphQLString },
                lastname: { type: GraphQLString },
                location: { type: GraphQLString }
            },
            async resolve(parent, args) {
                await client.query(`INSERT INTO employee(firstname,lastname,location) VALUES (${args.firstname},'${args.lastname}','${args.location}')`)
                return (res.rows)
            }
        }
    }
});
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  })