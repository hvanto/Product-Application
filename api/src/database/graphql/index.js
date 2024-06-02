const { gql } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const db = require("../database");

const pubsub = new PubSub();

const typeDefs = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    blocked: Boolean!
  }
  
  type Query {
    users: [User]
  }
  
  type Mutation {
    blockUnblockUser(userId: ID!, block: Boolean!): User
  }
  
  type Subscription {
    userBlocked(userId: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await db.user.findAll();
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
  },
  Mutation: {
    blockUnblockUser: async (_, { userId, block }) => {
      try {
        const user = await db.user.findByPk(userId);
        if (!user) {
          throw new Error("User not found");
        }
        user.blocked = block;
        await user.save();
        pubsub.publish("USER_BLOCKED", { userBlocked: user });
        return user;
      } catch (error) {
        console.error("Error blocking/unblocking user:", error);
        throw error;
      }
    },
  },
  Subscription: {
    userBlocked: {
      subscribe: (_, { userId }) => pubsub.asyncIterator(["USER_BLOCKED"]),
    },
  },
};

module.exports = { typeDefs, resolvers };
