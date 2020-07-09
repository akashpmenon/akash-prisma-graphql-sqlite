const { GraphQLServer, PubSub } = require("graphql-yoga");
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const Subscription = require('./resolvers/Subscription')
const pubsub = new PubSub()  

// 2
const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Subscription,
    Vote
}

const prisma = new PrismaClient()
const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
            pubsub
        }
    }
})

//3
server.start(() => console.log("Server built by me is running on http://localhost:4000"));