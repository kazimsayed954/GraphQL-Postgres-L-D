const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require('@apollo/server/express4')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const express = require("express");
const http = require('http');
const resolvers = require("./Resolver/resolver");
const typeDefs = require("./ApolloSchema/typedef");
const PORT = 4000;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

});

// Start the ApolloServer
async function startApolloServer() {
    await server.start();
    app.use('/graphql', express.json(), expressMiddleware(server));
    
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  }
  
  startApolloServer().catch((err) => {
    console.error('Error starting Apollo Server:', err);
  });