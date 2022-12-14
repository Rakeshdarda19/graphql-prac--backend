const express = require('express')
const cors = require('cors')
const { graphqlHTTP }  = require ('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use(cors())
app.use(express.json());
app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true
}))

app.listen(8080,() => {
    console.log('App is listening on 8080')
})