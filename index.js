const express = require('express')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const PORT = 4000

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})