import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './src/data/schema';
import cors from 'cors';

// Expose a GraphQL endpoint
const graphQLServer = express();
const GRAPHQL_PORT = '8000';
graphQLServer.use(cors());
graphQLServer.use('/', graphQLHTTP({schema, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
  ));
