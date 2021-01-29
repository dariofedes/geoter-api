const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
    }

    type Query {
        test: String
    }
`