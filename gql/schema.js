const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
    }

    type UserRegistrationFeedback {
        success: Boolean!
        message: String!
    }

    type Query {
        test: String
    }

    input UserInput {
        email: String!
        username: String!
        password: String!
    }

    type Mutation {
        registerUser(user: UserInput!): UserRegistrationFeedback!
    }
`