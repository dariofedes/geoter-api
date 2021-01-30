const literals = require('../literals')
const {
    registerUser,
    sendVerificationEmail,
    sendAlertRegistrationEmail
} = require('geoter-server-logic')

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
        }
    }
}