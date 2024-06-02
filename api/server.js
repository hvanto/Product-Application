const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const db = require("./src/database/index.js");

const typeDefs = gql`
  type User {
    userId: ID!
    username: String!
    blocked: Boolean!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    blockUnblockUser(userId: ID!, block: Boolean!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await db.User.findAll();
    },
  },
  Mutation: {
    blockUnblockUser: async (_, { userId, block }) => {
      const user = await db.User.findByPk(userId);
      user.blocked = block;
      await user.save();
      return user;
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express();

  app.use(express.json());

  // Enable CORS for all routes
  app.use(cors());

  server.applyMiddleware({ app });

  db.sync();

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
