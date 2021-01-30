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

    type UserAuthenticateFeedback {
        success: Boolean!
        verifyed: Boolean
        token: String
        user: User
        message: String
    }

    type UserVerificationFeedback {
        success: Boolean!
        user: User
    }

    type Query {
        testVerification: String
    }

    input UserRegisterInput {
        email: String!
        username: String!
        password: String!
    }

    input UserAuthenticateInput {
        email: String!
        password: String!
    }

    type Mutation {
        registerUser(user: UserRegisterInput!): UserRegistrationFeedback!
        authenticateUser(user: UserAuthenticateInput!): UserAuthenticateFeedback!
        verifyUser(verificationCode: String!): UserVerificationFeedback!
    }
`