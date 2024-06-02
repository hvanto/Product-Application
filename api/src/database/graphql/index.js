
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
            return await db.user.findAll();
        },
    },
    Mutation: {
        blockUnblockUser: async (_, { userId, block }) => {
            const user = await db.user.findByPk(userId);
            user.blocked = block;
            await user.save();
            pubsub.publish("USER_BLOCKED", { userBlocked: user });
            return user;
        },
    },
    Subscription: {
        userBlocked: {
            subscribe: () => pubsub.asyncIterator(["USER_BLOCKED"]),
        },
    },
};