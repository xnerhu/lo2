import { FastifyInstance } from 'fastify';
import { ApolloServer, gql } from 'apollo-server-fastify';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export default (app: FastifyInstance) => {
  const server = new ApolloServer({ typeDefs, resolvers });

  app.register(server.createHandler());
};
