require('dotenv').config()
const { env: { PORT } } = process
const { ApolloServer } = require('apollo-server')
const { resolvers, typeDefs } = require('./gql');

(async () => {
    const server = new ApolloServer({ typeDefs, resolvers })

    server.listen(PORT, () => {
        console.log(`
            Server up and listening at port ${PORT} 🚀

            GRAPHiQL: http://localhost:${PORT}
        `)
    })
})()
