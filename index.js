const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const PORT = 4000
=======
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 4000
app.use(cors())
>>>>>>> Stashed changes

const connect = async ()=>{
    try{
        const db = await mongoose.connect('mongodb+srv://graphqldb:graphqldb@cluster0.v2orj.mongodb.net/?retryWrites=true&w=majority')
        db ? console.log('Connection Successful') : console.log('No Connection')
    } catch(err){
        console.log('Something Went Wrong')
    }
    
}
connect()
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

<<<<<<< Updated upstream
=======
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

>>>>>>> Stashed changes
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})