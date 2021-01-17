const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')


const Post = require('./models/Post')
const User = require('./models/User')

const typeDefs = gql`
type Post{
  id: ID!
  body: String!
  createdAt: String!
  username: String!
}
  type Query {
    sayHi: String!
    getPosts: [Post]
  }
`

const resolvers = {
  Query: {
    sayHi: () => 'HEllO WORLD!',
    async getPost(){
      try{
        const posts = await Post.find()
        return posts;

      }catch(err){
        throw new Error(err)
      }
    }
  },
}

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


