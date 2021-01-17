const gql = require('graphql-tag')

module.exports = gql`
type Post{
  id: ID!
  body: String!
  createdAt: String!
  username: String!
}
type User{
    id: ID!,
    email: String!,
    token: String!,◊f
    username: String!,
    createdAt: String!
}
input RegisterInput {
    username: String!,
    password: String!,
    confirmPassword: String!,
    email: String!
}

type Query {
    sayHi: String!
    getPosts: [Post]
    getPosts:(postId:ID!):Post
}

type Mutation{
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!) User!
      createPost(body: String!):Post!
      deletePost(postId:ID!):String!
}
`
module.exports
