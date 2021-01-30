require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { mongoose } = require('geoter-data')
const { isVerifyedUser } = require('geoter-server-logic')
const { resolvers, typeDefs } = require('./gql')
const { env: { PORT, MONGODB_URL, JWT_SECRET } } = process;

(async () => {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log('Connected to Database'))

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
                const token = req.headers?.authorization?.split(' ')[1]

                if(!token) return { res }

                const { sub: loggedUserId } = jwt.verify(token, JWT_SECRET)
                
                const verifyed = await isVerifyedUser(loggedUserId)

                return { loggedUserId, verifyed, res }
        },
    })

    server.listen(PORT, () => {
        console.log(`
            Server up and listening at port ${PORT} 🚀

            GRAPHiQL: http://localhost:${PORT}
        `)
    })
})()
