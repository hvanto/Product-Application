const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./src/database/index.js");

// type definitions and resolvers for GraphQL
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
      // Implement database fetching logic
      return await db.User.findAll();
    },
  },
  Mutation: {
    blockUnblockUser: async (_, { userId, block }) => {
      // Implement database update logic
      const user = await db.User.findByPk(userId);
      user.blocked = block;
      await user.save();
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

db.sync();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // CHECK IF THIS IS CORRECT PORT
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

server.start().then(() => {
  server.applyMiddleware({ app });

  require("./src/routes/user.routes.js")(express, app);
  require("./src/routes/product.routes.js")(express, app);
  require("./src/routes/review.routes.js")(express, app);
  require("./src/routes/cart.routes.js")(express, app);
  require("./src/routes/userFollows.routes.js")(express, app);

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
