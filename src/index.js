const {ApolloServer} = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutations')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')
const resolvers = {
    Vote,
    Query,
    Mutation,
    User,
    Link
}
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
    .listen()
    .then(({url}) => {
        console.log(`Server is running on ${url}`)
    });