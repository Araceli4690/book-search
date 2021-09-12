//import gql
const { gql } = require('apollo-server-express');

//create typeDDefs
const typeDefs = gql`
type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
}

input savedBooks {
    description: String
    title: String
    bookId: String
    image: String
    link: String
    authors: [String]
}

type Query {
me: User
users: [User]
user(username: String!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    deleteBook(bookId: ID!): User
},
type Auth {
    token: ID!
    user: user
}
`
module.exports = typeDefs;