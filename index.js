const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')


const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

//settting up the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
const url = 'mongodb+srv://admin:R2yZ4H1kwvPMdDR7@social-test.vrqt0.mongodb.net/merngdb?retryWrites=true&w=majority'
mongoose.connect(url,{
    useNewUrlParser: true 
}).then(()=> {
    return server.listen({ port: 5000 })
}).then((res) => {
    console.log(`Server running at ${res.url}`)
  })


