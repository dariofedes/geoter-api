require('dotenv').config()
const { env: { PORT, MONGODB_URL } } = process
const { ApolloServer } = require('apollo-server')
const { mongoose } = require('geoter-data')
const { resolvers, typeDefs } = require('./gql');

(async () => {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => console.log('Connected to Database'))

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.listen(PORT, () => {
        console.log(`
            Server up and listening at port ${PORT} 🚀

            GRAPHiQL: http://localhost:${PORT}
        `)
    })
})()
