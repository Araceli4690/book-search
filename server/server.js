const express = require('express');
//import apolloserver
const { ApolloServer } = require('apollo-server-express');
//import middleware
const { authMiddleware } = require('./utils/auth');

const path = require('path');
const db = require('./config/connection');

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
//creare new apollo server and pass in schema data

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//integrate our apollo server with express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () =>
    console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use Graphql at http://localhost:${PORT}${server.graphqlPath}`);
});

