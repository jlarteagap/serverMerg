const { ApolloServer } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const mongoose = require('mongoose')
const { MONGODB } = require('./config')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req, pubsubs })
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('MongoDB Connected')
        return server.listen({port: 5000})
    }).then(res => {
        console.log(`server running at ${res.url}`)
    })