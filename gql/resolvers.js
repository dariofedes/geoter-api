require('dotenv').config()
const jwt = require('jsonwebtoken')
const literals = require('../literals')
const {
    registerUser,
    authenticateUser,
    sendVerificationEmail,
    sendAlertRegistrationEmail
} = require('geoter-server-logic')
const { env: { JWT_SECRET, JWT_EXP } } = process

module.exports = {
    Query: {
        test: () => "Server working"
    },

    Mutation: {
        registerUser: async (_, { user: { email, username, password } }) => {
            try {
                const { verificationCode } = await registerUser(email, username, password)

                await sendVerificationEmail(email, verificationCode)

                return {
                    success: true,
                    message: literals.registerSuccess
                }
            } catch(error) {
                if(error.message === 'email already in use') {
                    sendAlertRegistrationEmail(email)

                    return {
                        success: true,
                        message: literals.registerSuccess
                    } 
                } else {
                    throw new Error('INTERNAL_SERVER_ERROR')
                }
            }
        },

        authenticateUser: async(_, { user: { email, password } }) => {
            try {
                const user = await authenticateUser(email, password)

                return {
                    success: true,
                    message: 'User authenticated',
                    verifyed: user.verifyed,
                    token: jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXP }),
                    user,
                }
            } catch(error) {
                if(error.message === 'Wrong credentials') {
                    return {
                        success: false,
                        message: error.message
                    }
                } else {
                    throw new Error('INTERNAL_SERVER_ERROR')
                }
            }
        }
    }
}